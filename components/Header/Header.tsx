import { styled } from "../../stitches";
import Link from "next/link";
import Signature from "./Signature";
import ThemeMode from "./ThemeMode";
import Navigation from "../Navigation/Navigation";

const Header = ({}) => {
  return (
    <HeaderStyled>
      <Link href="/">
        <a>
          <Signature />
        </a>
      </Link>
      <HeaderContent>
        <Navigation>
          <Navigation.Link
            href="https://github.com/mathewjordan"
            target="_blank"
          >
            Github
          </Navigation.Link>
        </Navigation>
        <ThemeMode />
      </HeaderContent>
    </HeaderStyled>
  );
};

export const HeaderStyled = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const HeaderContent = styled("header", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export default Header;
