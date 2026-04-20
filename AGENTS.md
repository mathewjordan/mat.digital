# mat.digital

Personal site and blog for Mat Jordan. Acts as an online resume and a place to publish weekly articles on any topic — personal or professional.

## What this project is

A static site exported from Next.js and deployed to GitHub Pages at `mat.digital`. There is no server, no CMS, and no database. All content lives in Markdown/MDX files. All pages are pre-rendered at build time.

## Stack

- **Next.js 14** (App Router, `output: "export"` for static generation)
- **MDX** via `next-mdx-remote` for content authoring
- **Radix UI Themes** for components and design tokens
- **TypeScript** (strict mode)
- **GitHub Actions** for CI/CD to GitHub Pages

## Project layout

```
content/
  index.mdx          # Homepage content (resume/about)
  posts/             # Weekly articles — one .mdx file per post
src/
  app/               # Next.js App Router pages and layouts
  components/        # Reusable React components
  lib/               # Utility functions (post discovery, MDX compilation)
  styles/            # Global CSS
public/              # Static assets
.github/workflows/   # GitHub Actions deployment pipeline
```

## Writing an article

Create a new `.mdx` file in `content/posts/`. The filename becomes the URL slug.

```
content/posts/my-article-title.mdx  →  mat.digital/posts/my-article-title
```

Every post requires this frontmatter:

```yaml
---
title: My Article Title
description: A one or two sentence summary that appears below the title.
---
```

The body is standard Markdown. MDX components (Radix UI, `UIProject`, etc.) are available but not required — plain Markdown is fine for most articles.

## Updating the homepage

The homepage content lives in `content/index.mdx`. Edit that file to update the resume, project list, or any other homepage section.

## Running locally

```bash
npm install
npm run dev       # Start dev server at localhost:3000
```

## Building

```bash
npm run build     # Exports static site to /out
```

The `postbuild` step runs automatically and generates `sitemap.xml` and `robots.txt`.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/gh-pages.yml`, which builds the site and deploys the `/out` directory to GitHub Pages. No manual steps are needed.

The `ALLOW_INDEXING` repository variable controls `robots.txt`. Set it to `true` in repository settings to allow search engine indexing.

## Code style

All code should be straightforward to read. Prefer clarity over cleverness. Avoid abstractions that do not exist yet. Keep components small and focused. Do not add comments that restate what the code already says — only comment when the reason behind something is non-obvious.

## Content philosophy

- One article per week, any topic
- Topics can be personal or professional — no filter
- Plain Markdown is the default; MDX components only when genuinely needed
- The homepage (`content/index.mdx`) is a living resume and should stay current
