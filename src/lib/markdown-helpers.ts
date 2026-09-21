import {
  Badge, Box, Callout, Card, Code, Em, Flex, Grid, Heading,
  Link, Section, Separator, Strong, Table, Tabs, Text,
} from "@radix-ui/themes";

import UIProject from "@/components/UI/Project";
import RecentPosts from "@/components/Posts/Recent";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import mdxComponents from "@/components/mdx-components";
import path from "path";
import remarkGfm from "remark-gfm";
import type { MDXComponents } from "mdx/types";

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

function headingText(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(headingText).join("");
}

// Deliberately ASCII: unicode property escapes need an ES6+ tsconfig target,
// which this project does not set. Headings that reduce to nothing fall back to
// a numbered "section" id, so every heading stays uniquely linkable.
function slugify(text: string) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug || "section";
}

// Assigns heading ids and collects the table of contents in the same pass, so a
// contents link can never point at an id the article does not render.
function collectHeadings(headings: TocEntry[]) {
  return () => (tree: HastNode) => {
    const used = new Map<string, number>();
    const walk = (node: HastNode) => {
      // GFM's footnotes section carries its own screen-reader heading, which is
      // not a section of the article.
      const className = node.properties?.className;
      const isFootnotes =
        node.properties?.dataFootnotes !== undefined ||
        (Array.isArray(className) && className.includes("footnotes"));
      if (isFootnotes) return;
      if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
        const text = headingText(node).trim();
        if (text) {
          const base = slugify(text);
          const seen = used.get(base) ?? 0;
          used.set(base, seen + 1);
          const id = seen ? `${base}-${seen + 1}` : base;
          node.properties = { ...node.properties, id };
          headings.push({ id, text, level: node.tagName === "h2" ? 2 : 3 });
        }
      }
      (node.children ?? []).forEach(walk);
    };
    walk(tree);
  };
}

function resolvePath(filePath: string) {
  return path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
}

export async function getMarkdown(filePath: string) {
  try {
    const resolvedPath = resolvePath(filePath);
    const source = fs.readFileSync(resolvedPath, {
      encoding: "utf-8",
    });
    const headings: TocEntry[] = [];
    const compiled = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [collectHeadings(headings)],
        },
      },
      // Callout, Table and Tabs are namespaces used as <Callout.Root> and so on.
      // The MDX component type does not model that, hence the assertion.
      components: {
        UIProject,
        RecentPosts,
        ...mdxComponents,
        Badge, Box, Callout, Card, Code, Em, Flex, Grid, Heading,
        Link, Section, Separator, Strong, Table, Tabs, Text,
      } as unknown as MDXComponents,
    });
    return { ...compiled, headings };
  } catch (err) {
    throw new Error(
      `Failed to read ${filePath} (${resolvePath(filePath)}): ${(
        err as Error
      ).message}`
    );
  }
}
