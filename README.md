# SHY-Portfolio

My Personal portfolio website :D 
built with plain HTML, CSS and a small amount of vanilla JavaScript (no build step, no frameworks).

## Structure

```
index.html        Markup, inline SVG icon sprite, meta/Open Graph tags
style.css         Styling — design tokens, responsive layout, animations
main.js           Mobile nav, scroll-reveal, scroll-spy, footer year
files/
  img/            Optimized WebP images (profile, project thumbs, banners)
  x-icon.svg      Favicon / logo
  CV_*.pdf        Downloadable CV
```

## Local preview

It's a static site — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Hosted on **GitHub Pages**. The live site is published from the `gh-pages` branch
at <https://sebastianhyh.github.io/SHY-Portfolio/>. To publish changes, merge into
`gh-pages` (or push there) and Pages will redeploy automatically.
