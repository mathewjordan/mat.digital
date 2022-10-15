import { globalCss } from "@stitches/react";

const defaults = {
  [`*`]: {
    boxSizing: "border-box",
  },

  a: {
    color: "inherit",
    textDecoration: "none",
  },

  body: {
    margin: 0,
    padding: 0,
  },

  html: {
    fontFamily: "$sans",
    fontSize: "19px",
  },
};

const fonts = {};

const globalStyles = globalCss({
  ...defaults,
  ...fonts,
});

export default globalStyles;
