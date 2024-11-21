import "@radix-ui/themes/styles.css";
import "@/styles/global.css";

import { Box, Theme } from "@radix-ui/themes";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Mat Jordan - Designer and Developer",
  description: "Making complex things simple.",
};

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
  weight: "500",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
  weight: "500",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body>
        <ThemeProvider attribute="class">
          <Theme {...theme}>
            <Header />
            <Box
              mx={{
                initial: "5",
                md: "0",
              }}
            >
              <Main>{children}</Main>
              <Footer />
            </Box>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
