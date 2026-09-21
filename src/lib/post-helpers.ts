import fs from "fs";
import path from "path";
import { VFile } from "vfile";
import { matter } from "vfile-matter";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date?: string;
  draft: boolean;
  thumbnail?: string;
  ogImage?: { url: string; width?: number; height?: number };
  readingMinutes: number;
  filePath: string;
}

// No social platform renders an SVG as a link preview, so a vector thumbnail
// points at the raster card `scripts/dot-thumbnail.mjs` writes beside it. A
// thumbnail that is already raster can serve as its own card.
function findOgImage(thumbnail?: string): Post["ogImage"] {
  if (!thumbnail) return undefined;
  if (!/\.svg$/i.test(thumbnail)) return { url: thumbnail };

  const url = `${thumbnail.replace(/\.svg$/i, "")}-og.png`;
  const file = path.join(process.cwd(), "public", url);
  if (!fs.existsSync(file)) return undefined;

  // Dimensions let a platform lay the card out before it finishes downloading.
  // They live in the PNG header, at a fixed offset.
  const head = Buffer.alloc(24);
  const handle = fs.openSync(file, "r");
  try {
    fs.readSync(handle, head, 0, 24, 0);
  } finally {
    fs.closeSync(handle);
  }
  return { url, width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
}

// Every post on disk, drafts included. Routing uses this so a draft still
// exports to its own URL and can be shared by direct link.
export function getAllPosts(postsDirectory = "content/posts"): Post[] {
  const directoryPath = path.resolve(postsDirectory);
  let files: fs.Dirent[];
  try {
    files = fs.readdirSync(directoryPath, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const slugs = new Set<string>();
  return files
    .filter((file) => file.isFile() && /\.mdx?$/.test(file.name))
    .filter((file) => !/^readme\.mdx?$/i.test(file.name) && !file.name.startsWith("_"))
    .map((file): Post => {
      const slug = file.name.replace(/\.mdx?$/, "");
      const filePath = path.join(directoryPath, file.name);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(`${filePath}: use a lowercase, hyphen-separated filename.`);
      }
      if (slugs.has(slug)) throw new Error(`${filePath}: duplicate post slug "${slug}".`);
      slugs.add(slug);

      const source = new VFile({ path: filePath, value: fs.readFileSync(filePath, "utf8") });
      matter(source, { strip: true });
      const { title, description, date, draft = false, thumbnail } = source.data.matter as Record<string, unknown>;
      for (const [field, value] of Object.entries({ title, description })) {
        if (typeof value !== "string" || !value.trim()) {
          throw new Error(`${filePath}: frontmatter "${field}" must be a nonempty string.`);
        }
      }
      if (typeof draft !== "boolean") {
        throw new Error(`${filePath}: frontmatter "draft" must be true or false.`);
      }
      if (date !== undefined && (
        typeof date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(Date.parse(date)) ||
        new Date(date).toISOString().slice(0, 10) !== date
      )) {
        throw new Error(`${filePath}: frontmatter "date" must be a real date in YYYY-MM-DD format.`);
      }

      if (thumbnail !== undefined && (typeof thumbnail !== "string" || !thumbnail.startsWith("/"))) {
        throw new Error(`${filePath}: frontmatter "thumbnail" must be a site-root path such as /thumbnails/${slug}.svg.`);
      }

      const wordCount = String(source).trim().split(/\s+/).filter(Boolean).length;
      return {
        slug,
        title: (title as string).trim(),
        description: (description as string).trim(),
        date: date as string | undefined,
        draft,
        thumbnail: thumbnail as string | undefined,
        ogImage: findOgImage(thumbnail as string | undefined),
        readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
        filePath,
      };
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.slug.localeCompare(b.slug));
}

// The posts we advertise: listings and the sitemap. A draft is unlisted in
// production, so it has a URL but nothing links to it and nothing indexes it.
export function getPosts(postsDirectory = "content/posts"): Post[] {
  return getAllPosts(postsDirectory).filter(
    (post) => !post.draft || process.env.NODE_ENV === "development"
  );
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getDraftSlugs(postsDirectory = "content/posts"): string[] {
  return getAllPosts(postsDirectory).filter((post) => post.draft).map((post) => post.slug);
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
