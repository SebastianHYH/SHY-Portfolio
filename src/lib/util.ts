const base = import.meta.env.BASE_URL; // "/" on the custom domain

/**
 * Prefix a public-asset path with the site's base path so links work both
 * locally and under the GitHub Pages project subpath. Absolute URLs are
 * returned unchanged.
 */
export function withBase(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
