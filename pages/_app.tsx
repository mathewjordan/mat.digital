import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import globalStyles from "../styles/global";
import { darkTheme } from "../stitches";
import Underlay from "../components/Underlay";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.className,
        light: "light",
      }}
    >
      {mounted && <Component {...pageProps} />}
      <Underlay />
    </ThemeProvider>
  );
}

export default MyApp;
