import { Blockquote, Heading, Text } from "@radix-ui/themes";

import type { MDXComponents } from "mdx/types";
import { isValidElement, type ComponentProps } from "react";
import Mermaid from "@/components/UI/Mermaid";
import UILink from "@/components/UI/Link";

const mdxComponents: MDXComponents = {
  a: ({ href = "", ...props }) => <UILink href={href} {...props} />,
  p: (props) => <Text asChild my="3"><p {...props} /></Text>,
  h1: (props) => <Heading asChild size="8"><h1 {...props} /></Heading>,
  h2: (props) => <Heading asChild size="6"><h2 {...props} /></Heading>,
  h3: (props) => <Heading asChild size="5" weight="regular"><h3 {...props} /></Heading>,
  h4: (props) => <Heading asChild size="4"><h4 {...props} /></Heading>,
  h5: (props) => <Heading asChild size="3"><h5 {...props} /></Heading>,
  h6: (props) => <Heading asChild size="2"><h6 {...props} /></Heading>,
  blockquote: (props) => <Blockquote asChild><blockquote {...props} /></Blockquote>,
  pre: ({ children, ...props }) => {
    if (
      isValidElement<ComponentProps<"code">>(children) &&
      children.props.className?.split(/\s+/).includes("language-mermaid") &&
      typeof children.props.children === "string"
    ) {
      return <Mermaid chart={children.props.children.trim()} />;
    }
    return <pre tabIndex={0} role="region" aria-label="Code example" {...props}>{children}</pre>;
  },
  table: (props) => (
    <div className="table-scroll" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  ),
};

export default mdxComponents;
