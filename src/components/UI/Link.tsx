import NextLink, { LinkProps } from "next/link";

import { Link as RadixThemesLink } from "@radix-ui/themes";

interface UILinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLAnchorElement>;
  style?: React.CSSProperties;
}

const UILink: React.FC<UILinkProps> = (props) => {
  return (
    <RadixThemesLink underline="hover" asChild>
      <NextLink {...props} />
    </RadixThemesLink>
  );
};

export default UILink;
