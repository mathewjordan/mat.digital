import { Container, Heading, Section } from "@radix-ui/themes";

import Head from "next/head";
import Header from "../components/Header/Header";
import type { NextPage } from "next";

const PageNotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ zIndex: "1", position: "relative" }}>
        <Container size="2">
          <Section size="3">
            <Header />
            <Heading as="h1">404 — Not Found</Heading>
            <p>
              Sometimes we lose things and certain ideas are left to abandon.
            </p>
          </Section>
        </Container>
      </main>
    </>
  );
};

export default PageNotFound;
