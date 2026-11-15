# Zora Web Setup

Public landing + docs site for **Zora Mini** — a DIY yeti-shaped AI voice
robot built on ESP32-S3 (SuperMini board), firmware forked from
[xiaozhi-esp32](https://github.com/78/xiaozhi-esp32) (see
[`h-yusuf/zora-mini-esp32`](https://github.com/h-yusuf/zora-mini-esp32),
branch `esp32/supermini-zora`).

It gives viewers everything needed to build their own: wiring, a 3D-print /
BOM reference, and a browser-based one-click firmware flash (ESP Web Tools
over WebSerial) for the `esp32/supermini-zora` variant.

## Tech stack

- Vite + React 18 + TypeScript
- React Router v6 (client-side routing, SPA)
- [esp-web-tools](https://esphome.github.io/esp-web-tools/) (`<esp-web-install-button>`, WebSerial flashing)
- Vitest + Testing Library + jsdom (tests)
- No backend — fully static, deployed to Cloudflare Pages

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # vitest run
npm run build     # tsc -b && vite build -> dist/
npm run preview   # serve the production build locally
```

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- Hosting: Cloudflare's default `*.pages.dev` subdomain (no custom domain for v1)
- `public/_redirects` (`/* /index.html 200`) makes Cloudflare serve `index.html`
  for every client-side route, so deep links like `/docs/flash` don't 404.

## Manual follow-ups (not part of this build)

Two things this site deliberately ships as empty "drop folders" with their
own instructions — see each folder's README for the exact format:

1. **Firmware** — `public/firmware/supermini-zora/`. Build, merge, and
   hardware-test the `esp32/supermini-zora` binary yourself, then drop the
   merged `.bin` + a `manifest.json` (ESP Web Tools format) in there. Until
   that exists, the Flash page shows a "Firmware belum tersedia" state
   instead of a broken button.
2. **3D print files** — `public/models/`. Drop STL/3MF files in there once
   they exist, then swap the "File STL belum tersedia" placeholder block in
   `src/pages/docs/Diy.tsx` for real download links.

## Design

The landing page's visual direction (type, colour, composition) was drawn
with the `design-taste-frontend` skill: direction **"one-motif"**, with
Zora's own glowing cyan OLED eyes as the one shape (hero circle, photo
masks, buttons, bullets) — redrawn from the dealt pastel palette to a dark
ground + cyan accent to match the subject. Docs pages inherit the same
tokens (`src/styles/tokens.css`) without their own full draw.
