import { styled } from "../stitches";
import Link from "next/link";
import Signature from "./Signature";
import ThemeMode from "./ThemeMode";

const Header = ({}) => {
  return (
    <HeaderStyed>
      <Link href="/">
        <a>
          <Signature />
        </a>
      </Link>
      <ThemeMode />
    </HeaderStyed>
  );
};

export const HeaderStyed = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default Header;
