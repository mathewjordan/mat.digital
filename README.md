## Mat Jordan

_Making complex things simple._ Creating digital
experiences that feel human. Stitching natural, social, and
historical context deeply in my work.

I am designer and developer originally from Latah County, Idaho,
in the United States. _Latah_ is a
[Nez Percé](https://www.wikidata.org/wiki/Q1123923)
, (Nimíipuu) word for &ldquo;the place of pine trees and
pestle.&rdquo; I currently live in Asheville, North Carolina,
United States, and work for Northwestern University Libraries,
where I contribute to open-source software that enhance digital
collections and scholarship.

When not ruminating in the office, I am likely to be found
avoiding technology, tending my garden, backpacking the Blue
Ridge Mountains, cooking, reading, and learning to become the
best partner and parent I can be.

## Deployment

- Static builds are produced with `next build`, which now exports the site into `out/` for GitHub Pages.
- `next-sitemap` runs automatically after the build and writes directly into `out/`, so sitemaps and robots.txt are part of the published artifact.
- `.github/workflows/gh-pages.yml` installs dependencies, runs the build, uploads `out/`, and deploys the result with `actions/deploy-pages` whenever `main` changes or the workflow is dispatched manually.
- In the repository settings, ensure **Pages → Source** is set to **GitHub Actions** and configure a custom domain (`mat.digital`) if desired.
