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
        <Container size="2">
          <Section size="3">
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
              <Box my="7">
                <Flex direction="column" gap="6">
                  <InsetCard
                    href="https://dc.library.northwestern.edu"
                    imageSrc="https://iiif.dc.library.northwestern.edu/iiif/2/a1532579-8907-45d9-ad88-34587700dbd8/1195,195,2667,2574/500,500/0/default.jpg"
                    title="Northwestern Digital Collections"
                  >
                    <Text>
                      A website providing thousands of cultural heritage
                      materials from Northwestern University Libraries&apos;
                      distinctive collections. Powered by Next.js and IIIF
                      resources delivered from the Northwestern Digital
                      Collections API.
                    </Text>
                  </InsetCard>
                  <InsetCard
                    href="https://samvera-labs.github.io/clover-iiif/"
                    imageSrc="https://iiif.dc.library.northwestern.edu/iiif/2/84530412-0dad-408d-b0f0-fc787b677bdb/190,190,1870,1870/500,500/0/default.jpg"
                    title="Clover IIIF"
                    type="video"
                    side="right"
                  >
                    <Text>
                      An open-source UI component library designed for quickly
                      developing high-quality and accessible web interfaces that
                      are fluent in IIIF. It features an A/V capable IIIF Viewer
                      and other components tailored to the IIIF Presentation
                      API.
                    </Text>
                  </InsetCard>
                  <InsetCard
                    href="https://canopy-iiif.github.io/docs/"
                    imageSrc="https://iiif.dc.library.northwestern.edu/iiif/2/84530412-0dad-408d-b0f0-fc787b677bdb/190,190,1870,1870/500,500/0/default.jpg"
                    title="Canopy IIIF"
                  >
                    <Text>
                      An open-source static site generator designed for fast
                      creation, contextualization, and customization of a
                      discovery-focused digital scholarship and collections
                      website using IIIF APIs.
                    </Text>
                  </InsetCard>
                </Flex>
              </Box>
            </Flex>
          </Section>
        </Container>
        <Underlay />
      </main>
    </>
  );
};

export default Home;
