import NextLink from "next/link";

import { Link as RadixThemesLink } from "@radix-ui/themes";

type UILinkProps = React.ComponentPropsWithoutRef<typeof NextLink>;

const UILink: React.FC<UILinkProps> = (props) => {
  return (
    <RadixThemesLink underline="always" asChild>
      <NextLink {...props} />
    </RadixThemesLink>
  );
};

export default UILink;
