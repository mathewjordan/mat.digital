import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Container from "../components/Container";
import Header from "../components/Header";
import InlineHeading from "../components/Heading";
import Section from "../components/Section";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mat Jordan</title>
        <meta name="description" content="Mat Jordan - Designer & Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ zIndex: "1", position: "relative" }}>
        <Container>
          <Header />
          <Section>
            <p>
              <InlineHeading as="span">
                Making things simple again.
              </InlineHeading>{" "}
              I am a designer and developer originally from Latah County, Idaho,
              United States. <em>Latah</em> is a{" "}
              <Link href="https://www.wikidata.org/wiki/Q1123923">
                <a target="_blank">Nez Percé</a>
              </Link>
              , (Nimíipuu) word for &ldquo;the place of pine trees and
              pestle.&rdquo; I currently live in Asheville, North Carolina, and
              work for Northwestern University Libraries, where I contribute to
              open-source software enhancing digital archives with a focus on
              user experience.
            </p>
            <p>
              Outside the office, I am likely to be found avoiding technology,
              tending a bonsai garden, backpacking the Blue Ridge Mountains,
              cooking, reading, and learning to become the best parent I can be.
            </p>
          </Section>
        </Container>
      </main>
    </>
  );
};

export default Home;
