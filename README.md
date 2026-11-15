# Zora Web Setup

Public landing + docs site for **Zora Mini** — a DIY yeti-shaped AI voice
robot built on ESP32-S3, firmware forked from
[xiaozhi-esp32](https://github.com/78/xiaozhi-esp32) (see
[`h-yusuf/zora-mini-esp32`](https://github.com/h-yusuf/zora-mini-esp32)).
Two board variants are supported in firmware — SuperMini
(`esp32/supermini-zora`) and DevKit N16R8 (`esp32/n16r8-zora`) — selectable
via a board picker on the Wiring and DIY/3D-Print docs pages.

It gives viewers everything needed to build their own: wiring (both board
variants), a 3D-print source + BOM/dimension reference, and a browser-based
one-click firmware flash (ESP Web Tools over WebSerial). **The online flash
button is SuperMini-only for v1** — picking DevKit N16R8 on the Flash page
shows a build-from-source message instead of the flash button.

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

## Manual follow-up (not part of this build)

**Firmware** — `public/firmware/supermini-zora/` deliberately ships as an
empty "drop folder" (see its own README for the manifest format). Build,
merge, and hardware-test the `esp32/supermini-zora` binary yourself, then
drop the merged `.bin` + a `manifest.json` (ESP Web Tools format) in there.
Until that exists, the Flash page shows a "Firmware belum tersedia" state
instead of a broken button.

3D-print source is already real: the DIY/3D-Print page links out to
[Compagnon 3.09](https://makerworld.com/en/models/2109424-compagnon-309-build-your-expressive-robot#profileId-2281938)
on MakerWorld (not a custom model, not mirrored in this repo — see
`public/models/README.md`).

## Design

The landing page's visual direction (type, colour, composition) was drawn
with the `design-taste-frontend` skill: direction **"one-motif"**, with
Zora's own glowing cyan OLED eyes as the one shape (hero circle, photo
masks, buttons, bullets) — redrawn from the dealt pastel palette to a dark
ground + cyan accent to match the subject. Docs pages inherit the same
tokens (`src/styles/tokens.css`) without their own full draw.
