import "@radix-ui/themes/styles.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import { ThemeProps } from "@radix-ui/themes/dist/cjs/theme";
import { ThemeProvider } from "next-themes";
import Transition from "../components/Transition";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const themeProps: ThemeProps = {
    accentColor: "indigo",
    grayColor: "slate",
    radius: "small",
  };

  return (
    <>
      {mounted && (
        <Theme {...themeProps}>
          <Transition>
            <Component {...pageProps} />
          </Transition>
        </Theme>
      )}
    </>
  );
}

export default MyApp;
