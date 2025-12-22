import * as RadixThemes from "@radix-ui/themes";

import Balancer from "react-wrap-balancer";
import UIProject from "@/components/UI/Project";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import mdxComponents from "@/components/mdx-components";
import path from "path";

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
    return await compileMDX({
      source,
      options: { parseFrontmatter: true },
      // @ts-ignore
      components: {
        Balancer,
        UIProject,
        ...mdxComponents,
        ...RadixThemes,
      },
    });
  } catch (err) {
    console.error(
      `Failed to read ${filePath} (${resolvePath(filePath)}): ${(
        err as Error
      ).message}`
    );
    return;
  }
}
