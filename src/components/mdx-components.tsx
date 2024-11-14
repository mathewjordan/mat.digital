// @ts-nocheck

import { Blockquote, Heading, Text } from "@radix-ui/themes";

import { MDXRemoteProps } from "next-mdx-remote";
import UILink from "@/components/UI/Link";

const mdxComponents: MDXRemoteProps["components"] = {
  a: (props) => <UILink {...props} />,
  p: (props) => <Text as="p" my="3" {...props} />,
  h1: (props) => <Heading as="h1" size="8" {...props} />,
  h2: (props) => <Heading as="h2" size="6" {...props} />,
  blockquote: (props) => <Blockquote {...props} />,
};

export default mdxComponents;
