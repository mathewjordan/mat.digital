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
    backgroundColor: "$sand1",
    color: "$sand12",
  },

  html: {
    fontFamily: "$display",
    fontSize: "19px",
    fontSmooth: "always",
    webKitFontSmothing: "subpixel-antialiased",
  },

  "p, li, blockquote": {
    lineHeight: "1.618em",
  },

  h2: {
    color: "$sand11",
    fontWeight: "400",
    fontSize: "$gr5",
  },
};

const globalStyles = globalCss({
  ...defaults,
});

export default globalStyles;
