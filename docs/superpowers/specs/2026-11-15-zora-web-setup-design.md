# Zora Web Setup — Design

## Intent & why

Zora Mini (DIY yeti-shaped AI voice robot, firmware fork of xiaozhi-esp32,
repo: h-yusuf/zora-mini-esp32, branch `esp32/supermini-zora`) got exposure via
a TikTok demo video. Viewers want to build their own: 3D print the body,
wire the electronics, flash the firmware. This project is the public
website (repo: h-yusuf/zora-web-setup, local folder `AIoT/zora-setup`) that
gives them everything needed to do that, including a browser-based
"one-click" firmware flash so non-developers don't need a CLI.

## Audience

Mixed: casual TikTok viewers (want a quick "wow, what is this, how do I get
one") and serious DIY builders (want full wiring diagrams, BOM, print
files, flashing steps).

## Goals

- Landing page that hooks casual visitors: hero/demo media, short "what is
  Zora" pitch, CTA into the docs.
- `/docs` section with: wiring guide (pin tables + diagram), 3D print /
  BOM reference, firmware flashing guide, troubleshooting/FAQ.
- Browser-based one-click firmware flashing (WebSerial), same UX pattern
  as https://ottodiy.tech/en/docs/downloads/ ("Connect via USB, click
  flash, pick serial port in browser prompt").
- Links to the firmware repo (xiaozhi-esp32, branch `esp32/supermini-zora`)
  and this docs repo.
- Built with React, deployed on Cloudflare Pages.

## Non-goals (v1)

- Online flashing only covers the `esp32/supermini-zora` variant. No
  N16R8 or other boards in the flasher yet (can be added later the same
  way).
- No backend/server. The site is fully static; flashing runs client-side
  over WebSerial, exactly like Otto DIY's reference implementation.
- No multi-language. Indonesian only, matching the existing project docs.
- No e-commerce / kit checkout. Just DIY instructions + BOM + repo links.
- No automated CI pipeline for the merged flashable `.bin` yet — v1 ships
  one manually-built merged binary + manifest for `supermini-zora`.

## Anti-goals

- Must not read as a generic templated doc site — this is a maker/DIY
  brand tied to a playful physical object (yeti shape) and a TikTok
  audience; visual design should match that tone, not default
  Bootstrap-ish docs chrome.
- The flashing flow must not fail silently. Mirror Otto's visible
  caveats: Chrome/Edge + HTTPS(or localhost) only, hold BOOT button on
  first flash, what to do if it fails.

## Constraints

- Source of truth for wiring/setup content lives in the xiaozhi-esp32
  repo, branch `esp32/supermini-zora` (`docs/wiring-bread-compact-wifi.md`,
  `SETUP.md`). The docs site should present this content (rewritten for a
  public/beginner audience), not fork it as a second, divergent source of
  truth — link back to the firmware repo for anyone who wants to build
  from source instead of flashing a prebuilt binary.
- 3D print STL files don't exist in any repo yet (only a dimension
  reference doc, and that doc lives on `esp32/supermini`, not on
  `esp32/supermini-zora`). The user will supply the actual print files
  separately. The site needs a place to host/link them once provided;
  until then, the print-files page ships with a "coming soon" placeholder
  using the dimension reference as interim content.
- No existing CI step produces a single merged flashable `.bin` for any
  variant (`.github/workflows/build.yml` uploads per-component build
  artifacts, not a merged image). Producing the v1 merged binary +
  `manifest.json` is a manual, one-time step for this launch, following
  the `esptool.py --chip esp32s3 merge_bin ...` pattern Otto's site
  documents, adapted to this project's partition table
  (`sdkconfig.board.supermini` / `partitions/v2/4m.csv`).
- Target repo `h-yusuf/zora-web-setup` is empty (fresh init, remote
  already wired up in `AIoT/zora-setup`).

## Approaches considered

**Site structure** (discussed and picked by the user):

1. Single-page landing — simplest, but won't scale as docs grow.
2. Multi-page docs site — good structure, weak hook for casual TikTok
   traffic landing cold.
3. **Hybrid (chosen):** marketing landing (hero, demo, kit preview, CTA)
   + a separate `/docs` multi-page section for step-by-step detail.

**Online flashing tool:** only one sensible choice — ESP Web Tools
(`esp-web-install-button`, open source, WebSerial-based), the same
component family Otto DIY's reference site uses. No real alternative
was considered worth presenting (a custom esptool-js integration would
just reinvent what this already does).

## Decided (the user's calls)

- Framework: React.
- Hosting: Cloudflare Pages.
- Site structure: hybrid landing + `/docs`.
- Online flashing: ESP Web Tools over WebSerial.
- v1 flashing scope: `esp32/supermini-zora` only.
- Hosting identity: Cloudflare's default `*.pages.dev` subdomain for v1, no
  custom domain yet.
- Merged `.bin` production: out of scope for this build. The user builds,
  merges, and hardware-tests the firmware themselves from
  `esp32/supermini-zora`; this project only ships the infra to receive and
  serve it (`public/firmware/` folder, manifest format, flash button
  wired up against a placeholder/empty manifest until the real file
  lands).
- Landing page media (TikTok demo video, yeti mascot art/photos): not
  supplied yet. Ship with clearly-marked placeholders the user swaps in
  later — do not block the build on missing assets.
- License/attribution: no concern. `zora-mini-esp32` is MIT-licensed
  (stated in its README) and already carries a fork notice crediting
  `78/xiaozhi-esp32`; the docs site just needs to keep that same
  attribution link, nothing further required.

## What's left to the builder

- Exact React tooling: Vite + React Router (static output, no SSR/backend
  needed — fits Cloudflare Pages directly and the "no backend" non-goal).
- Visual/brand design pass (colors, type, layout, how the yeti mascot and
  TikTok tone come through) — do this as part of building, not pre-decided
  here.
- Exact `/docs` page list and nav: wiring, 3D print/BOM, flashing,
  troubleshooting/FAQ — draft during build, can deviate from this list if
  something fits better once content is drafted.
- Producing the v1 merged firmware `.bin` + `manifest.json` for
  `supermini-zora`: a documented manual build (from `esp32/supermini-zora`
  branch), stored as a static asset in this repo (e.g. `public/firmware/`).
- Where exactly the "coming soon" 3D print placeholder lives and how it's
  swapped once the user supplies real STL files — builder's call, keep it
  a one-file change.
