## Posts

> Directory to include Markdown posts using MDX `title.mdx` with inclusive frontmatter.

_Example_

```
---
title: Post Title
description: A short description of the post will act as the lead.
---

# Post Title

Content to be included using MDX.

```

> **Note:** The GitHub Pages build requires at least one slug for `/posts/[slug]`. When this directory is empty the build creates a placeholder slug that renders the 404 page, and it disappears automatically as soon as you add a real `.md`/`.mdx` file.
