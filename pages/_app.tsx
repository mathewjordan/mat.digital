import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import globalStyles from "../styles/global";
import { darkTheme } from "../stitches";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.className,
        light: "light",
      }}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
