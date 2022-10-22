import { styled } from "../stitches";

const Underlay = ({}) => {
  return <UnderlayStyled />;
};

export const UnderlayStyled = styled("div", {
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: "0",
  top: "0",
  left: "0",
  background: `linear-gradient(173deg, $indigo1 38.2%, $indigo3 100%);`,
});

export default Underlay;
