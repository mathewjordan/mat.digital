import Head from "next/head";
import type { NextPage } from "next";
import Heading from "../components/Heading";
import Section from "../components/Section";
import Link from "next/link";
import Container from "../components/Container";
import Header from "../components/Header/Header";

const PageNotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ zIndex: "1", position: "relative" }}>
        <Container>
          <Header navigation={false} isSignatureHeading={false} />
          <Heading as="h1" isBold>
            404 — Not Found
          </Heading>
          <Section>
            <p>Sometimes we lose things, and some ideas are left to abandon.</p>
          </Section>
        </Container>
      </main>
    </>
  );
};

export default PageNotFound;
