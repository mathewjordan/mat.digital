import * as RadixThemes from "@radix-ui/themes";

import Balancer from "react-wrap-balancer";
import UIProject from "@/components/UI/Project";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import mdxComponents from "@/components/mdx-components";

export async function getMarkdown(path: string) {
  try {
    const source = fs.readFileSync(path, {}).toString();
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
    console.error(`${path} not found.`);
    return;
  }
}
