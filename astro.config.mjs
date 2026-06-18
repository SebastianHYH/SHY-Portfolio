// @ts-check
import { defineConfig } from 'astro/config';

// Project is served from https://sebastianhyh.github.io/SHY-Portfolio/
// `site` + `base` make all generated links and the sitemap path-correct.
export default defineConfig({
  site: 'https://sebastianhyh.github.io',
  base: '/SHY-Portfolio',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
});
