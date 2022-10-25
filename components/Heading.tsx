import { styled } from "../stitches";

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "span";
  children: React.ReactNode;
  isBold?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ as = "h2", children, isBold }) => {
  return (
    <HeadingStyled as={as} isBold={isBold}>
      {children}
    </HeadingStyled>
  );
};

export const HeadingStyled = styled("h2", {
  fontFamily: "$serif",
  fontStyle: "italic",
  fontSize: "$gr5",
  fontWeight: "400",
  letterSpacing: "0.015em",
  transition: "$all",

  "@md": {
    fontSize: "$gr4",
  },

  variants: {
    isBold: {
      true: {
        fontWeight: "600",
      },
    },
  },
});

export default Heading;
