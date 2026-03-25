# CreativeClaw Landing Page

Static landing page for [creativeclaw.co](https://creativeclaw.co).

## Stack

- **Astro 6** — static site generator (output: static, no SSR)
- **Tailwind CSS 4** — styling (via `@tailwindcss/vite`)
- **MDX** — blog content (via `@astrojs/mdx`)
- **TypeScript** — strict mode
- **Cloudflare Pages** — hosting (project: `creative-claw`)

## Commands

```bash
pnpm dev        # dev server
pnpm build      # build to dist/
pnpm preview    # preview production build
```

## Deploy

```bash
pnpm build && CLOUDFLARE_ACCOUNT_ID=ea42f6a70241dee229e264a740588f67 pnpm exec wrangler pages deploy dist --project-name creative-claw --branch main --commit-dirty=true
```

Domains: `creativeclaw.co`, `www.creativeclaw.co`

## Project Structure

```
src/
  pages/        # file-based routing — each .astro file = a route
  layouts/      # shared page layouts (Layout.astro is the base)
  components/   # reusable UI components
  content/      # blog posts (markdown/mdx, for later)
  styles/       # global.css (Tailwind entry point)
public/         # static assets (images, fonts, favicon)
```

## Conventions

- Pages import Layout.astro which handles `<head>`, global styles, and base markup
- Tailwind classes go directly on elements (no separate CSS files per component)
- All pages are statically generated at build time — no server-side logic
- **Never commit or push without being explicitly asked to**
