import Link, { LinkProps } from "next/link";
import { styled } from "../../stitches";

export interface NavigationLinkProps extends LinkProps {
  children: React.ReactNode | React.ReactNode[];
  target?: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  children,
  href,
  target,
}) => {
  return (
    <NavigationLinkStyled>
      <Link href={href}>
        <a target={target}>{children}</a>
      </Link>
    </NavigationLinkStyled>
  );
};

export const NavigationLinkStyled = styled("span", {
  a: {
    fontSize: "$gr4",
    fontFamily: "$serif",
    fontWeight: "600",
    textDecoration: "none",

    "@md": {
      fontSize: "$gr3",
    },
  },
});

export default NavigationLink;
