import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import globalStyles from "../styles/global";
import { darkTheme } from "../stitches";
import Transition from "../components/Transition";
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
      <Underlay />
      {mounted && (
        <Transition>
          <Component {...pageProps} />
        </Transition>
      )}
    </ThemeProvider>
  );
}

export default MyApp;
