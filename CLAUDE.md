# Handoff: host Claire Tui's portfolio as a public website

## Context
- This folder is the finished, approved portfolio site. The design is final:
  do not restyle, rewrite copy or restructure pages unless Claire asks.
- It was designed in a Claude design canvas and compiled to plain static files
  (see README.md for how pages and `assets/runtime.js` work).
- Claire's other projects are already hosted on GitHub Pages under the
  `clairetuizx` account (e.g. https://clairetuizx.github.io/packingcubes/ and
  https://clairetuizx.github.io/F1-beginners-guide/), so GitHub Pages is the
  expected host unless she says otherwise.

## Goal
Get this online at a public URL that works well on desktop and mobile.

## Suggested steps
1. Ask Claire which address she wants:
   - `https://clairetuizx.github.io/` (repo named `clairetuizx.github.io`), or
   - `https://clairetuizx.github.io/portfolio/` (any repo name), or
   - a custom domain she owns.
2. Create the repo, commit everything in this folder (keep `.nojekyll`), push,
   and enable Pages from the `main` branch root.
3. Check the live site:
   - Landing: power button press -> boot screen -> auto-redirect to home.html.
     The redirect also happens on its own a few seconds after load.
   - Nav links, the Works dropdown and the Works tabs all go to the right pages.
   - HEPMIL "Read more" and Vibecoding folders open and close their pop-ups.
   - Contact "Email me" opens a draft to clairetuizx@gmail.com and then shows
     the address with a "Copy email" button.
   - Every image and video in assets/ loads (paths are relative, case-sensitive).
   - Google Fonts load (IBM Plex Sans Condensed, IBM Plex Mono, Silkscreen).
   - Mobile (390px wide): no sideways scrolling, text stays inside its boxes.
4. Nice-to-haves (ask Claire before doing):
   - An Open Graph share image (e.g. a screenshot of the landing page) so links
     look good when shared on LinkedIn/WhatsApp.
   - Self-hosting the fonts instead of Google Fonts.
   - Compressing the larger videos (lock/pack/f1 walkthrough .mp4 files).

## Notes
- The email address is intentionally public on the Contact page.
- No analytics, cookies or forms are included.
- Several HEPMIL campaign cards link out to YouTube; those links are intentional.
