import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import globalStyles from "../styles/global";
import { darkTheme } from "../stitches";
import Underlay from "../components/Underlay";

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
      <Underlay />
    </ThemeProvider>
  );
}

export default MyApp;
