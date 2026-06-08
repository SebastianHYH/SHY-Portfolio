# SHY-Portfolio

My Personal portfolio website :D

Built with [Astro](https://astro.build). The Projects section is **synced from
GitHub automatically** — I tag a repo with a topic and it shows up here on the
next build, no manual editing.

## How it works

- **Projects come from the GitHub API at build time.** Any repo tagged with the
  `portfolio` topic is featured automatically (name, description, language and
  star count are pulled live). See [`src/lib/github.ts`](src/lib/github.ts).
- **GitHub Actions builds & deploys** on every push to `main`, and **re-builds
  weekly** so newly tagged/updated repos appear on their own. See
  [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Project structure

```
astro.config.mjs          site URL + base path (/SHY-Portfolio)
src/
  data/
    site.ts               name, tagline, contact, social links, project topic
    overrides.ts          optional per-repo title/description/image/order
  lib/
    github.ts             fetches & shapes the GitHub project data
    util.ts               base-path helper for asset URLs
  layouts/Base.astro      <head> meta/OG, fonts, client-side JS
  components/             Sidebar, Hero, Projects, ProjectCard, Contact, Banner, Footer, Icon
  pages/index.astro       the page
  styles/global.css       design tokens, layout, responsive, animations
public/files/             images (WebP), favicon, CV
```

## Adding / editing projects

1. **Feature a repo:** add the `portfolio` topic to it on GitHub
   (repo page → ⚙️ next to *About* → *Topics*). It appears on the next build.
2. **Polish a repo (optional):** add an entry to
   [`src/data/overrides.ts`](src/data/overrides.ts) to set a custom title,
   description, thumbnail (from `public/files/img/`) or display order. Repos
   without an override use their GitHub description and auto-generated social
   image.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/SHY-Portfolio/
npm run build    # output to ./dist
npm run preview  # preview the production build
```

## Deployment

Hosted on **GitHub Pages** via GitHub Actions.

> **One-time setup:** in the repo, go to **Settings → Pages → Build and
> deployment → Source** and select **GitHub Actions** (instead of the old
> `gh-pages` branch). After that, every push to `main` deploys automatically and
> the weekly schedule keeps projects fresh.

Live at <https://sebastianhyh.github.io/SHY-Portfolio/>.

## Regenerating images

Images are pre-optimized WebP in `public/files/img/`. To regenerate one from a
high-res original with [ImageMagick](https://imagemagick.org):

```bash
# project thumbnail (max 800px wide)
magick original.jpg -auto-orient -strip -resize 800x800\> -quality 82 public/files/img/name.webp
```
