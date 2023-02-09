import { styled } from "../../stitches";
import Link from "next/link";
import Signature from "./Signature";
import ThemeMode from "./ThemeMode";
import Navigation from "../Navigation/Navigation";
import GithubCode from "./Code";

interface HeaderProps {
  navigation?: boolean;
  isSignatureHeading?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  navigation = true,
  isSignatureHeading = true,
}) => {
  return (
    <HeaderStyled>
      <HeaderSignatureWrapper as={isSignatureHeading ? "h1" : "span"}>
        <Link href="/">
          <a>
            <Signature />
          </a>
        </Link>
      </HeaderSignatureWrapper>
      {navigation && (
        <HeaderContent>
          <Navigation>
            <Navigation.Link
              href="https://github.com/mathewjordan"
              target="_blank"
            >
              <GithubCode />
            </Navigation.Link>
          </Navigation>
          <ThemeMode />
        </HeaderContent>
      )}
    </HeaderStyled>
  );
};

export const HeaderStyled = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const HeaderSignatureWrapper = styled("span", {
  margin: "0",
  padding: "0",
});

export const HeaderContent = styled("header", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export default Header;
