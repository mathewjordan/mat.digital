import {
  Box,
  Card,
  Container,
  Em,
  Flex,
  Heading,
  Inset,
  Link,
  Section,
  Strong,
  Text,
} from "@radix-ui/themes";

import Head from "next/head";
import Header from "../components/Header/Header";
import InsetCard from "../components/InsetCard";
import type { NextPage } from "next";
import Underlay from "../components/Underlay";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mat Jordan - Designer & Developer</title>
        <meta name="description" content="Mat Jordan - Designer & Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Section size="3">
          <Container size="2">
            <Header />
            <Flex gap="3" direction="column">
              <Box mb="5">
                <Text size="5">
                  <Em>Making complex things simple.</Em> Creating digital
                  experiences that feel human. Stitching natural, social, and
                  historical context deeply in my work.
                </Text>
              </Box>
              <Text>
                I am designer and developer originally from Latah County, Idaho,
                in the United States. <em>Latah</em> is a{" "}
                <Link href="https://www.wikidata.org/wiki/Q1123923">
                  <a target="_blank">Nez Percé</a>
                </Link>
                , (Nimíipuu) word for &ldquo;the place of pine trees and
                pestle.&rdquo; I currently live in Asheville, North Carolina,
                United States, and work for Northwestern University Libraries,
                where I contribute to open-source software that enhance digital
                collections and scholarship.
              </Text>
              <Text>
                When not ruminating in the office, I am likely to be found
                avoiding technology, tending my garden, backpacking the Blue
                Ridge Mountains, cooking, reading, and learning to become the
                best partner and parent I can be.
              </Text>
            </Flex>
          </Container>

          <Box my="9">
            <Flex direction="column">
              <InsetCard
                href="https://samvera-labs.github.io/clover-iiif/"
                imageSrc="https://iiif.dc.library.northwestern.edu/iiif/2/84530412-0dad-408d-b0f0-fc787b677bdb/190,190,1870,1870/500,500/0/default.jpg"
                title="Clover IIIF"
                type="video"
              >
                <Text>
                  An open-source UI component library designed for quickly
                  developing high-quality and accessible web interfaces that are
                  fluent in IIIF. It features an A/V capable IIIF Viewer and
                  other components tailored to the IIIF Presentation API.
                </Text>
              </InsetCard>
              <InsetCard
                href="https://canopy-iiif.github.io/docs/"
                imageSrc="https://iiif.dc.library.northwestern.edu/iiif/2/146f9772-829c-4254-a9d1-ba8175efc071/287,287,3819,2749/1000,/0/default.jpg"
                title="Canopy IIIF"
                side="right"
              >
                <Text>
                  An open-source static site generator designed for fast
                  creation, contextualization, and customization of a
                  discovery-focused digital scholarship and collections website
                  using IIIF APIs.
                </Text>
              </InsetCard>
              <InsetCard
                href="https://dc.library.northwestern.edu"
                imageSrc="https://iiif.dc.library.northwestern.edu/iiif/2/18c68c24-8b9e-421a-8b52-ce339600f3f4/full/1000,/0/default.jpg"
                title="Northwestern Digital Collections"
              >
                <Text>
                  A website providing thousands of cultural heritage materials
                  from Northwestern University Libraries&apos; distinctive
                  collections. Powered by Next.js and IIIF resources delivered
                  from the Northwestern Digital Collections API.
                </Text>
              </InsetCard>
            </Flex>
          </Box>
        </Section>
        <Underlay />
      </main>
    </>
  );
};

export default Home;
