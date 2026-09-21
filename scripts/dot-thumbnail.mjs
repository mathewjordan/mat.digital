#!/usr/bin/env node
// Builds a post thumbnail: a square grid of solid circles that reproduces an image.
//
//   node scripts/dot-thumbnail.mjs <input image> <output.svg> [--size 500] [--dot 10] [--gap 6] [--bg <color>]
//
// Defaults are the house style: a 31x31 grid of 10px dots with 6px gaps, tonally
// stretched and saturated so a dark photograph still reads as a thumbnail.
// Pass --autolevel 0 --saturate 1 for the raw sampled colours.
//
// Resizing uses macOS `sips`, so the grid cell colours are the averaged image.
// Decoding only handles what sips emits: 8-bit RGB, non-interlaced PNG.

import { execFileSync } from "node:child_process";
import { inflateSync } from "node:zlib";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function parseArgs(argv) {
  const [input, output, ...rest] = argv;
  if (!input || !output) {
    throw new Error("usage: dot-thumbnail.mjs <input image> <output.svg> [--size n] [--dot n] [--gap n] [--bg color]");
  }
  const opts = { size: 500, dot: 10, gap: 6, bg: "none", autolevel: 1, saturate: 1.5 };
  for (let i = 0; i < rest.length; i += 2) {
    const key = rest[i].replace(/^--/, "");
    if (!(key in opts)) throw new Error(`unknown option: ${rest[i]}`);
    opts[key] = key === "bg" ? rest[i + 1] : Number(rest[i + 1]);
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

const { input, output, size, dot, gap, bg, autolevel, saturate } = parseArgs(process.argv.slice(2));

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
  // Classify from the colours as sampled: tonal stretching shifts hues around.
  const sampled = cells.map((cell) => cell.slice());
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

  const circles = [];
  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      const hex = cells[row * count + col]
        .map((v) => v.toString(16).padStart(2, "0"))
        .join("");
      const cx = margin + radius + col * pitch;
      const cy = margin + radius + row * pitch;
      circles.push(`<circle cx="${cx}" cy="${cy}" r="${radius}" fill="#${hex}"/>`);
    }
  }

  const background = bg === "none" ? "" : `<rect width="${size}" height="${size}" fill="${bg}"/>`;
  writeFileSync(
    output,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img">` +
      background +
      circles.join("") +
      `</svg>\n`
  );
  console.log(`${output}: ${count}x${count} circles (${circles.length}), ${dot}px dots, ${gap}px gaps`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
