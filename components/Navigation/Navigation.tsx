import { styled } from "../../stitches";
import NavigationLink, { NavigationLinkProps } from "./Link";

interface NavigationProps {
  children: React.ReactNode | React.ReactNode[];
}

interface NavigationComposition {
  Link: React.FC<NavigationLinkProps>;
}

const Navigation: React.FC<NavigationProps> & NavigationComposition = ({
  children,
}) => {
  return <NavigationStyled>{children}</NavigationStyled>;
};

export const NavigationStyled = styled("nav", {
  padding: "$gr2 $gr4 $gr1",
  transition: "$all",

  "@md": {
    padding: "$gr2 $gr3 $gr1",
  },
});

Navigation.Link = NavigationLink;

export default Navigation;
