import { styled } from "../stitches";
import Heading from "./Heading";

interface SectionProps {
  children: React.ReactNode | React.ReactNode[];
  heading?: string;
}

const Section: React.FC<SectionProps> = ({ children, heading }) => {
  return (
    <SectionStyled>
      {heading && (
        <header>
          <Heading isBold>{heading}</Heading>
        </header>
      )}
      <div>{children}</div>
    </SectionStyled>
  );
};

export const SectionStyled = styled("section", {
  fontSize: "$gr4",
  transition: "$all",

  "@md": {
    fontSize: "$gr3",
  },
});

export default Section;
