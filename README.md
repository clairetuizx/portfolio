# Claire Tui — Portfolio

Static portfolio website for Claire Tui, a Singapore-based creator producer.
Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Pages

| File | Page |
|---|---|
| `index.html` | Landing: retro computer powers on, then auto-goes to Home |
| `home.html` | Home: hello + "pick a folder" |
| `about.html` | About me, skills, software, awards carousel |
| `works-meta.html` | Works › Meta |
| `works-hepmil.html` | Works › HEPMIL Singapore / SGAG (campaign cards + "Read more" pop-ups) |
| `works-big3.html` | Works › Big 3 Media / The Hidden Good |
| `works-cna.html` | Works › Mediacorp CNA |
| `vibecoding.html` | Vibecoding projects (folder pop-ups with screenshots and videos) |
| `contact.html` | LinkedIn + email (mailto with copy-address fallback) |
| `404.html` | Copy of the landing page |

`assets/` holds all images, videos, the favicon and `runtime.js`.

## Preview locally

```
python3 -m http.server 8000
```
then open http://localhost:8000

## How the pages work

Each page keeps its markup in `<template id="dc-template">` and its small
interactive logic (a `Component` class) in `<script type="text/plain" id="dc-logic">`.
`assets/runtime.js` renders the template: `{{name}}` placeholders are filled
from `renderVals()`, `<sc-if value="{{flag}}">` blocks show only when the flag is
truthy, and `onClick="{{fn}}"` / `onAnimationEnd` / `ref` attributes are wired
up as event listeners. `setState()` re-renders the page.

To change copy, edit the text inside the page's `<template>` directly.
