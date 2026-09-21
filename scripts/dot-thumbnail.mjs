#!/usr/bin/env node
// Builds a post thumbnail: a square grid of solid circles that reproduces an image.
//
//   node scripts/dot-thumbnail.mjs <input image> <output.svg> [--size 500] [--dot 10] [--gap 6] [--bg <color>]
//   node scripts/dot-thumbnail.mjs <existing.svg>            # refresh that thumbnail's social card
//
// Defaults are the house style: a 31x31 grid of 10px dots with 6px gaps, tonally
// stretched and saturated so a dark photograph still reads as a thumbnail.
// Pass --autolevel 0 --saturate 1 for the raw sampled colours.
//
// Also writes <output>-og.png, because no social platform renders an SVG as a
// preview image. That one is matted on an opaque background at the 1.91:1 card
// size every platform crops toward. Pass --og 0 to skip it. Handing the script
// an SVG it made earlier re-reads those circles and rewrites only the card, so
// the source photograph is not needed again.
//
// Resizing uses macOS `sips`, so the grid cell colours are the averaged image.
// Decoding only handles what sips emits: 8-bit RGB, non-interlaced PNG.

import { execFileSync } from "node:child_process";
import { crc32, deflateSync, inflateSync } from "node:zlib";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function parseArgs(argv) {
  const [input, given, ...rest] = argv;
  // Refreshing a card needs only the SVG, which is also where it is written back.
  const output = given ?? (/\.svg$/i.test(input ?? "") ? input : undefined);
  if (!input || !output) {
    throw new Error("usage: dot-thumbnail.mjs <input image> <output.svg> [--size n] [--dot n] [--gap n] [--bg color]");
  }
  const opts = {
    size: 500, dot: 10, gap: 6, bg: "none", autolevel: 1, saturate: 1.5,
    og: 1, ogWidth: 1200, ogHeight: 630, ogPad: 35, ogBg: "#202020",
  };
  const strings = new Set(["bg", "ogBg"]);
  for (let i = 0; i < rest.length; i += 2) {
    const key = rest[i].replace(/^--/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (!(key in opts)) throw new Error(`unknown option: ${rest[i]}`);
    opts[key] = strings.has(key) ? rest[i + 1] : Number(rest[i + 1]);
  }
  return { input, output, ...opts };
}

// Only the subset of PNG that sips produces: colour type 2, 8-bit, no interlacing.
function decodePng(buffer) {
  if (buffer.readUInt32BE(0) !== 0x89504e47) throw new Error("not a PNG");
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  const [depth, colorType, , , interlace] = [buffer[24], buffer[25], buffer[26], buffer[27], buffer[28]];
  if (depth !== 8 || colorType !== 2 || interlace !== 0) {
    throw new Error(`unsupported PNG (depth ${depth}, colour type ${colorType}, interlace ${interlace})`);
  }

  const chunks = [];
  let at = 8;
  while (at < buffer.length) {
    const length = buffer.readUInt32BE(at);
    const type = buffer.toString("ascii", at + 4, at + 8);
    if (type === "IDAT") chunks.push(buffer.subarray(at + 8, at + 8 + length));
    if (type === "IEND") break;
    at += 12 + length;
  }

  const raw = inflateSync(Buffer.concat(chunks));
  const bpp = 3;
  const stride = width * bpp;
  const pixels = Buffer.alloc(height * stride);

  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    const row = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    for (let x = 0; x < stride; x += 1) {
      const a = x >= bpp ? pixels[y * stride + x - bpp] : 0;
      const b = y > 0 ? pixels[(y - 1) * stride + x] : 0;
      const c = x >= bpp && y > 0 ? pixels[(y - 1) * stride + x - bpp] : 0;
      let value = row[x];
      if (filter === 1) value += a;
      else if (filter === 2) value += b;
      else if (filter === 3) value += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        value += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      } else if (filter !== 0) throw new Error(`unknown PNG filter ${filter}`);
      pixels[y * stride + x] = value & 0xff;
    }
  }
  return { width, height, pixels };
}

// Minimal truecolour PNG writer: no filtering, so every row is a literal scanline.
function encodePng(width, height, rgb) {
  const stride = width * 3;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y += 1) {
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const chunk = (type, data) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const check = Buffer.alloc(4);
    check.writeUInt32BE(crc32(body) >>> 0);
    return Buffer.concat([length, body, check]);
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // bit depth
  header[9] = 2; // colour type: truecolour
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// Draws the same circles onto an opaque canvas, centred and scaled to the pad.
function rasterize({ width, height, pad, background, artSize, circles }) {
  const scale = (height - 2 * pad) / artSize;
  const originX = (width - artSize * scale) / 2;
  const originY = (height - artSize * scale) / 2;
  const base = [1, 3, 5].map((at) => parseInt(background.slice(at, at + 2), 16));
  const canvas = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height; i += 1) {
    canvas[i * 3] = base[0];
    canvas[i * 3 + 1] = base[1];
    canvas[i * 3 + 2] = base[2];
  }

  for (const { cx, cy, r, rgb } of circles) {
    const centreX = originX + cx * scale;
    const centreY = originY + cy * scale;
    const scaled = r * scale;
    const fromX = Math.max(0, Math.floor(centreX - scaled - 1));
    const toX = Math.min(width - 1, Math.ceil(centreX + scaled + 1));
    const fromY = Math.max(0, Math.floor(centreY - scaled - 1));
    const toY = Math.min(height - 1, Math.ceil(centreY + scaled + 1));
    for (let y = fromY; y <= toY; y += 1) {
      for (let x = fromX; x <= toX; x += 1) {
        // Analytic edge coverage: opaque inside, feathered over the last pixel.
        const distance = Math.hypot(x + 0.5 - centreX, y + 0.5 - centreY);
        const alpha = Math.min(1, Math.max(0, scaled + 0.5 - distance));
        if (alpha <= 0) continue;
        const at = (y * width + x) * 3;
        for (let c = 0; c < 3; c += 1) {
          canvas[at + c] = Math.round(canvas[at + c] * (1 - alpha) + rgb[c] * alpha);
        }
      }
    }
  }
  return canvas;
}

// Reads back a thumbnail this script wrote, so a card can be rebuilt without
// the original photograph.
function parseDotSvg(source) {
  const box = source.match(/viewBox="0 0 ([\d.]+) /);
  const circles = [...source.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)" fill="#([0-9a-f]{6})"\/>/g)].map(
    ([, cx, cy, r, hex]) => ({
      cx: Number(cx),
      cy: Number(cy),
      r: Number(r),
      rgb: [0, 2, 4].map((at) => parseInt(hex.slice(at, at + 2), 16)),
    })
  );
  if (!box || !circles.length) throw new Error(`${input}: not a dot thumbnail this script wrote`);
  return { artSize: Number(box[1]), circles };
}

const { input, output, size, dot, gap, bg, autolevel, saturate, og, ogWidth, ogHeight, ogPad, ogBg } =
  parseArgs(process.argv.slice(2));

const fromSvg = /\.svg$/i.test(input);
let artSize = size;
let circles;

if (fromSvg) {
  ({ artSize, circles } = parseDotSvg(readFileSync(input, "utf8")));
  console.log(`${input}: reusing ${circles.length} circles from the existing thumbnail`);
} else {
  const pitch = dot + gap;
  const count = Math.floor((size + gap) / pitch);
  const span = count * pitch - gap;
  const margin = (size - span) / 2;
  const radius = dot / 2;

  const work = mkdtempSync(join(tmpdir(), "dot-thumb-"));
  const resized = join(work, "grid.png");
  try {
    // Crop to a centred square first: `sips -z` does not preserve aspect ratio,
    // so resizing a landscape source straight to the grid would squash it.
    const probe = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", input], { encoding: "utf8" });
    const srcWidth = Number(probe.match(/pixelWidth:\s*(\d+)/)?.[1]);
    const srcHeight = Number(probe.match(/pixelHeight:\s*(\d+)/)?.[1]);
    if (!srcWidth || !srcHeight) throw new Error(`could not read dimensions of ${input}`);
    const side = Math.min(srcWidth, srcHeight);

    const square = join(work, "square.png");
    execFileSync("sips", ["-c", String(side), String(side), "-s", "format", "png", input, "--out", square], {
      stdio: "ignore",
    });
    execFileSync("sips", ["-z", String(count), String(count), square, "--out", resized], { stdio: "ignore" });
    const { pixels } = decodePng(readFileSync(resized));

    // Photographs with a dark surround sample to a muddy grid, so optionally
    // stretch the tonal range and push saturation before drawing.
    const cells = [];
    for (let i = 0; i < count * count; i += 1) {
      cells.push([pixels[i * 3], pixels[i * 3 + 1], pixels[i * 3 + 2]]);
    }
    const luma = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (autolevel) {
      const values = cells.map(luma);
      const low = Math.min(...values);
      const high = Math.max(...values);
      if (high > low) {
        for (const cell of cells) {
          const l = luma(cell);
          const scale = l > 0 ? (((l - low) / (high - low)) * 255) / l : 0;
          for (let c = 0; c < 3; c += 1) cell[c] = Math.min(255, Math.round(cell[c] * scale));
        }
      }
    }
    if (saturate !== 1) {
      for (const cell of cells) {
        const grey = luma(cell);
        for (let c = 0; c < 3; c += 1) {
          cell[c] = Math.max(0, Math.min(255, Math.round(grey + (cell[c] - grey) * saturate)));
        }
      }
    }

    circles = [];
    for (let row = 0; row < count; row += 1) {
      for (let col = 0; col < count; col += 1) {
        circles.push({
          cx: margin + radius + col * pitch,
          cy: margin + radius + row * pitch,
          r: radius,
          rgb: cells[row * count + col],
        });
      }
    }

    const background = bg === "none" ? "" : `<rect width="${size}" height="${size}" fill="${bg}"/>`;
    const shapes = circles.map(({ cx, cy, r, rgb }) => {
      const hex = rgb.map((v) => v.toString(16).padStart(2, "0")).join("");
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#${hex}"/>`;
    });
    writeFileSync(
      output,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img">` +
        background +
        shapes.join("") +
        `</svg>\n`
    );
    console.log(`${output}: ${count}x${count} circles (${circles.length}), ${dot}px dots, ${gap}px gaps`);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

if (og) {
  const card = output.replace(/\.svg$/i, "") + "-og.png";
  const canvas = rasterize({
    width: ogWidth,
    height: ogHeight,
    pad: ogPad,
    background: ogBg,
    artSize,
    circles,
  });
  writeFileSync(card, encodePng(ogWidth, ogHeight, canvas));
  console.log(`${card}: ${ogWidth}x${ogHeight} social card on ${ogBg}`);
}
