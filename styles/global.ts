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
    backgroundColor: "$slate1",
    color: "$slate12",
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
    color: "$indigo11",
    fontWeight: "700",
    fontSize: "$gr6",
  },
};

const globalStyles = globalCss({
  ...defaults,
});

export default globalStyles;
