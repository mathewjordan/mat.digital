import { styled } from "../stitches";
import { width } from "../styles/media";

interface ContainerProps {
  isFlex?: boolean;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  containerType?: "default" | "wide";
  maxWidth?: number;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  containerType = "default",
  isFlex = false,
  maxWidth,
}) => {
  const manualWidth = maxWidth ? { maxWidth: maxWidth } : {};

  return (
    <ContainerStyled
      className={className}
      containerType={containerType}
      css={manualWidth}
      isFlex={isFlex}
    >
      {children}
    </ContainerStyled>
  );
};

export const ContainerStyled = styled("div", {
  margin: "0 auto",
  variants: {
    containerType: {
      default: {
        maxWidth: `${width.sm}px`,
      },
      wide: {
        maxWidth: `${width.md}px`,
      },
    },
    isFlex: {
      false: {},
      true: {
        display: "flex",
      },
    },
  },
  width: "100%",
  padding: "$gr7 $gr4",
  transition: "$all",

  "@md": {
    padding: "$gr4",
  },

  "@sm": {
    padding: "0 $gr4",
  },
});

export default Container;
