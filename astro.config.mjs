// @ts-check
import { defineConfig } from 'astro/config';

// Project is served from the custom domain https://sebastianhy.dev/ (root path),
// so no `base` is needed. `site` makes generated links and the sitemap absolute.
export default defineConfig({
  site: 'https://sebastianhy.dev',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
  markdown: {
    // Code blocks carry both palettes; global.css switches them with the theme.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
