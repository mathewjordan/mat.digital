import { globalCss } from "@stitches/react";

const defaults = {
  [`*`]: {
    boxSizing: "border-box",
  },

  a: {
    color: "$indigo11",
    textDecoration: "underline",

    "&:hover": {
      color: "$indigo12",
    },
  },

  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "$indigo1",
    color: "$indigo12",
    fontWeight: "400",
  },

  html: {
    fontFamily: "$body",
    fontSize: "18px",
    letterSpacing: "0.015em",
    fontSmooth: "always",
    webKitFontSmothing: "antialiased",
    mozOsxFontSmoth: "grayscale",
  },

  "p, li, blockquote": {
    lineHeight: "1.618em",
  },

  h2: {
    fontWeight: "600",
    fontSize: "$gr5",
    fontStyle: "italic",
    letterSpacing: "0",
    textTransform: "lowercase",
  },
};

const globalStyles = globalCss({
  ...defaults,
});

export default globalStyles;
