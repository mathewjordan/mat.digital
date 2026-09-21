import next from "eslint-config-next/core-web-vitals";

// Next 16 removed `next lint`; this is the flat config the ESLint CLI reads.
const config = [
  { ignores: [".next/**", "out/**", "node_modules/**"] },
  ...next,
];

export default config;
