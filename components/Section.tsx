import { styled } from "../stitches";

interface SectionProps {
  children: React.ReactNode | React.ReactNode[];
  title: string;
}

const Section: React.FC<SectionProps> = ({ children, title }) => {
  return (
    <SectionStyled>
      <header>{title && <h2>{title}</h2>}</header>
      <div>{children}</div>
    </SectionStyled>
  );
};

export const SectionStyled = styled("section", {});

export default Section;
