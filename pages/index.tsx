import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mat Jordan</title>
        <meta name="description" content="Mat Jordan - Designer & Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>About</h2>
        <p>
          I am a designer and developer originally from Latah County, Idaho,
          United States. _Latah_ is a{" "}
          <Link href="https://www.wikidata.org/wiki/Q1123923">
            <a>Nez Percé</a>
          </Link>
          , (Nimíipuu) word for "the place of pine trees and pestle." I
          currently live in Asheville, North Carolina, and work for Northwestern
          University Libraries, where I contribute to open-source software
          enhancing digital archives with a focus on user experience.
        </p>
        <p>
          Outside the office, I am likely to be found avoiding technology,
          tending a bonsai garden, backpacking the Blue Ridge Mountains,
          cooking, reading, and learning to become the best parent I can be.
        </p>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
