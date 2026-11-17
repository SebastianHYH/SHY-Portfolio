# SHY-Portfolio

My Personal portfolio website :D

Built with [Astro](https://astro.build). A split layout: a sticky intro column
on the left, and About, Experience, Projects, Papers and Contact on the right.
Featured projects are curated by hand; the "Other projects" list is synced from
GitHub topics at build time.

## How it works

- **Featured projects** are listed by hand in
  [`src/data/projects.ts`](src/data/projects.ts), so they never depend on a tag.
- **Other projects come from the GitHub API at build time.** Any repo tagged
  `portfolio` or `assignment` is listed automatically. See
  [`src/lib/github.ts`](src/lib/github.ts).
- **GitHub Actions builds & deploys** on every push to `main`, and **re-builds
  weekly** so newly tagged/updated repos appear on their own. See
  [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Project structure

```
astro.config.mjs          site URL (https://sebastianhy.dev)
src/
  data/
    site.ts               name, headline, intro, about text, contact, links
    experience.ts         work, organisations, volunteering, education, awards
    projects.ts           featured projects + rules for "Other projects"
    papers.ts             published papers
  lib/
    github.ts             fetches & shapes the GitHub project data
    util.ts               base-path helper for asset URLs
  layouts/Base.astro      <head> meta/OG, fonts, client-side JS
  components/             TopBar, Intro, About, Experience(+Entry), Projects, Papers, Contact, Footer, Icon
  pages/index.astro       the page
  styles/global.css       design tokens (light + dark), layout, responsive
public/files/             images (WebP), favicon, CV
```

## Adding / editing projects

1. **Feature a project:** add it to `featured` in
   [`src/data/projects.ts`](src/data/projects.ts) with a summary, a short
   write-up, stack and a screenshot from `public/files/img/`.
2. **List a repo under "Other projects":** tag it `portfolio` or `assignment`
   on GitHub (repo page → ⚙️ next to *About* → *Topics*), or add its name to
   `include`. Fix titles and descriptions with `describe`.

## Writing

Posts are Markdown files in `src/content/writing/`; the file name becomes the
URL (`rescue-plan-bfs-dfs.md` → `/writing/rescue-plan-bfs-dfs/`). Copy the
existing post as a template. Frontmatter fields are defined in
`src/content.config.ts`. Posts with `draft: true` show in `npm run dev` only.

The Writing link in the top bar is set to `enabled: 'dev'`; change it to `true`
in `src/data/site.ts` once the first post is published.

## Adding pages

Every page uses `layouts/Base.astro`, which renders the top bar. Add a page
under `src/pages/`, then set `enabled: true` for it in `site.pages`
(`src/data/site.ts`), or `'dev'` to show it only locally. The page links only
show once two or more are shown.

Copy that starts with `[Placeholder]` renders in amber italics until it's
replaced.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/
npm run build    # output to ./dist
npm run preview  # preview the production build
```

## Deployment

Hosted on **GitHub Pages** via GitHub Actions.

> **One-time setup:** in the repo, go to **Settings → Pages → Build and
> deployment → Source** and select **GitHub Actions** (instead of the old
> `gh-pages` branch). After that, every push to `main` deploys automatically and
> the weekly schedule keeps projects fresh.

Live at <https://sebastianhy.dev/>.

## Regenerating images

Images are pre-optimized WebP in `public/files/img/`. To regenerate one from a
high-res original with [ImageMagick](https://imagemagick.org):

```bash
# project thumbnail (max 800px wide)
magick original.jpg -auto-orient -strip -resize 800x800\> -quality 82 public/files/img/name.webp
```
