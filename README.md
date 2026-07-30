# Norbert Hadiprodjo — Personal Portfolio

A single-page portfolio site built with vanilla HTML, CSS, and JavaScript. No framework, no build step — open `index.html` and it runs.

![HTML5](https://img.shields.io/badge/HTML5-1a1a1a?style=flat-square&logo=html5&logoColor=FFB000)
![CSS3](https://img.shields.io/badge/CSS3-1a1a1a?style=flat-square&logo=css3&logoColor=FFB000)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-1a1a1a?style=flat-square&logo=javascript&logoColor=FFB000)
![No Build Step](https://img.shields.io/badge/build%20step-none-1a1a1a?style=flat-square)

---

## Features

**Splash screen** — A timed intro card that auto-dismisses after 3 seconds, with a skip button. Body scroll is locked until the fade completes, and the element is removed from layout on `transitionend` rather than left sitting invisible over the page.

**Typewriter about section** — The "About me" block renders as a syntax-highlighted JavaScript object that types itself out character by character. The implementation clones the DOM structure first, then replays it node by node, so highlighting spans survive the animation and a caret element tracks the current line as a sibling rather than being injected inside it.

**Client-side routing** — Four sections (About, Resume, Portfolio, Contact) swap via `data-page` / `data-nav-link` attribute matching. No page reloads, no router library.

**Portfolio filtering** — Projects carry a `data-category` attribute and filter by Software Development, Data Science, or Finance. Desktop gets a button row; mobile gets a custom dropdown, both driving the same `filterFunc`.

**Project modal with slider** — Clicking a project opens a modal populated from `data-*` attributes on the list item (`data-desc`, `data-demo`, `data-github`, `data-images`). The image slider supports arrow buttons, clickable dots, left/right keyboard arrows, `Escape` to close, and touch swipe with a 40px threshold. Navigation controls hide automatically when a project has only one image.

**Contact form** — Posts to Formspree via `fetch` with a JSON `Accept` header, so submission happens without navigating away. The submit button stays disabled until `checkValidity()` passes, and a hidden `_gotcha` honeypot field catches naive spam bots.

---

## Structure

```
.
├── index.html
└── assets/
    ├── css/style.css
    ├── js/script.js
    └── images/
```

The uploaded files are flat, but `index.html` references `./assets/css/style.css`, `./assets/js/script.js`, and `./assets/images/`. Place them accordingly or the page will load unstyled.

---

## Design system

`style.css` opens with a design-token block rather than scattering literals through the file:

| Token group | Examples |
| --- | --- |
| Neutrals | `--smoky-black`, `--eerie-black-1/2`, `--onyx`, `--jet` |
| Accent | `--orange-yellow-crayola`, `--vegas-gold` |
| Type scale | `--fs-1` (24px) through `--fs-8` (11px) |
| Weights | `--fw-300` through `--fw-600` |
| Elevation | `--shadow-1` through `--shadow-5` |
| Motion | `--transition-1` (0.25s), `--transition-2` (0.5s) |

Dark near-black surfaces with an amber accent, Poppins throughout. Breakpoints at 450px, 580px, 768px, 900px, and 1200px; the sidebar collapses behind a "Show Contacts" toggle on small screens.

---

## Dependencies

All loaded from CDN — nothing to install.

| Library | Purpose |
| --- | --- |
| [Ionicons 5.5.2](https://ionic.io/ionicons) | UI icons |
| [Prism.js 1.29.0](https://prismjs.com/) | Syntax highlighting theme (`prism-tomorrow`) |
| Google Fonts — Poppins | Typography |
| [Formspree](https://formspree.io/) | Contact form backend |

---

## Running locally

```bash
git clone <repo-url>
cd <repo>
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly via `file://` mostly works, but a local server avoids CORS issues with the CDN module scripts.

To deploy, push to a repo and enable GitHub Pages — there is nothing to build.

---
