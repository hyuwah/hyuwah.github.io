# hyuwah-portfolio

A simple portfolio site built with Astro.

## Project Structure

```
├── src/
│   ├── content/           # Content collections
│   │   ├── projects/      # Project entries (markdown)
│   │   ├── blog/          # Blog posts (markdown)
│   │   └── work/          # Work experience (markdown)
│   ├── layouts/           # Layout components
│   │   └── Layout.astro   # Base layout
│   └── pages/             # Page routes
│       ├── index.astro    # Homepage
│       ├── projects/      # Projects list & detail
│       ├── blog/          # Blog list & detail
│       └── work/          # Work experience
├── public/                # Static assets
└── astro.config.mjs       # Astro config
```

## Adding Content

### Projects

Create a new file in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "Short description"
tech: ["React", "TypeScript", "Node.js"]
link: "https://example.com"
github: "https://github.com/username/repo"
featured: true
order: 1
---

Longer description here...
```

### Blog Posts

Create a new file in `src/content/blog/`:

```markdown
---
title: "Post Title"
description: "Short description"
pubDate: 2024-01-15
tags: ["tag1", "tag2"]
draft: false
---

Your content here...
```

### Work Experience

Create a new file in `src/content/work/`:

```markdown
---
title: "Job Title"
company: "Company Name"
position: "Position"
startDate: 2020-01-01
endDate: 2023-12-31
current: false
order: 1
---

Description of your role...
```

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## Deployment

This site is configured for GitHub Pages. Build output goes to `dist/`.

```bash
npm run build
```

Then deploy the `dist` folder to GitHub Pages.

## Notes

- Edit markdown files directly in your favorite editor
- Content is validated by the schema in `src/content/config.ts`
- Simple styling is in `src/layouts/Layout.astro` - can be enhanced later
