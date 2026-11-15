# Zora Web Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `zora-web-setup` React site: a landing page plus a `/docs` section (wiring, DIY/3D-print, flashing + troubleshooting) with a browser-based one-click firmware flash button for the `esp32/supermini-zora` board.

**Architecture:** A single static Vite + React + TypeScript app deployed to Cloudflare Pages (`*.pages.dev`). React Router handles client-side routes; a `public/_redirects` rule makes Cloudflare serve `index.html` for all of them (SPA fallback). The flash feature is `esp-web-tools`'s `<esp-web-install-button>` custom element, pointed at `public/firmware/supermini-zora/manifest.json` — a file the user supplies later; until it exists, the button component shows a "not ready yet" state instead of erroring.

**Tech Stack:** Vite, React 18, TypeScript, React Router v6, esp-web-tools (WebSerial flashing), Vitest + @testing-library/react + jsdom (tests).

**Spec:** [2026-11-15-zora-web-setup-design.md](../specs/2026-11-15-zora-web-setup-design.md)

## Global Constraints

- No backend. The site is a fully static build (Cloudflare Pages, React/Vite).
- v1 online-flashing covers the `esp32/supermini-zora` board variant only.
- Hosting is Cloudflare's default `*.pages.dev` subdomain; no custom domain.
- Producing/merging/testing the actual flashable `.bin` is **not** part of this build — ship the receiving infra only (folder, manifest schema, button wiring).
- Landing-page media (TikTok video, yeti mascot art) is not supplied yet — ship clearly-marked placeholders, do not block on missing assets.
- `zora-mini-esp32` is MIT-licensed and carries a fork notice crediting `78/xiaozhi-esp32` — every docs page must keep a visible attribution link to that upstream project.
- Indonesian only, no i18n.
- Flashing uses `esp-web-tools` (`<esp-web-install-button>`, WebSerial) — Chrome/Edge + HTTPS-or-localhost only; the flash page must say so, and must tell first-time flashers to hold BOOT while powering on.

## Review Focus

- Browser without WebSerial (Firefox/Safari) must see a clear "use Chrome or Edge" message on the flash page, not a silently broken button. (Task 6)
- Flash page visited before `manifest.json` exists (firmware not uploaded yet) must show a "not ready yet" state, not a crash or a dead button. (Task 6)
- Deep-linking straight to a `/docs/*` URL (not via in-app nav) must render the page, not a Cloudflare 404 — this is the SPA-fallback redirect file. (Task 1)
- DIY/3D-print page visited before STL files are supplied must clearly read as "not ready yet," not as a broken or empty page. (Task 5)
- The upstream attribution link must appear on every page via the shared layout, so a future content edit to one page can't silently drop it. (Task 1)

---

## File Structure

```
zora-setup/
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  public/
    _redirects                      # Cloudflare SPA fallback
    firmware/supermini-zora/        # empty; user drops manifest.json + .bin here later
      README.md                     # what goes here + manifest schema
    models/                         # empty; user drops STL files here later
      README.md
  src/
    main.tsx
    App.tsx                         # Router + route table
    layout/
      Layout.tsx                    # Nav + Footer (attribution link) wrapper
      Layout.test.tsx
    pages/
      Landing.tsx
      Landing.test.tsx
      docs/
        Wiring.tsx
        Wiring.test.tsx
        Diy.tsx
        Diy.test.tsx
        Flash.tsx
        Flash.test.tsx
    components/
      FlashButton.tsx
      FlashButton.test.tsx
    content/
      wiring.ts                     # pin-table data, ported from xiaozhi-esp32 docs
      bom.ts                        # 3D-print/BOM dimension data
  docs/superpowers/...               # specs + this plan (already present)
  README.md
```

---

### Task 1: Project scaffold, layout, routing, SPA fallback

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `src/layout/Layout.tsx`
- Create: `public/_redirects`
- Test: `src/layout/Layout.test.tsx`

**Interfaces:**
- Produces: `Layout` component — `function Layout(props: { children: React.ReactNode }): JSX.Element`. Renders a top nav with links to `/`, `/docs/wiring`, `/docs/diy`, `/docs/flash`, and a footer containing the text "xiaozhi-esp32" with an `<a>` whose `href` is `https://github.com/78/xiaozhi-esp32`. Later tasks' pages are rendered as `children`.
- Produces: `App` — mounts `<BrowserRouter>` with routes `/` (Landing, added Task 2), `/docs/wiring` (Task 4), `/docs/diy` (Task 5), `/docs/flash` (Task 6), each wrapped in `Layout`.

- [ ] **Step 1: Scaffold the Vite React-TS project**

Run: `npm create vite@latest . -- --template react-ts` in `/Users/apittmy/me-n-me/AIoT/zora-setup` (directory already has `.git` + `docs/`; accept merging into the existing folder). Then `npm install`.

- [ ] **Step 2: Add routing and test deps**

Run: `npm install react-router-dom` and `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/coverage-v8`. Add a `test` script to `package.json`: `"test": "vitest run"`. Add `/// <reference types="vitest" />` test config to `vite.config.ts` (`test: { environment: "jsdom", setupFiles: "./src/setupTests.ts" }`). Create `src/setupTests.ts` with `import "@testing-library/jest-dom";`.

- [ ] **Step 3: Write the failing test for `Layout`**

```tsx
// src/layout/Layout.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./Layout";

test("renders nav links and upstream attribution", () => {
  render(
    <MemoryRouter>
      <Layout><p>content</p></Layout>
    </MemoryRouter>
  );
  expect(screen.getByRole("link", { name: /wiring/i })).toHaveAttribute("href", "/docs/wiring");
  expect(screen.getByRole("link", { name: /xiaozhi-esp32/i })).toHaveAttribute(
    "href",
    "https://github.com/78/xiaozhi-esp32"
  );
  expect(screen.getByText("content")).toBeInTheDocument();
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- Layout` — Expected: FAIL, `Layout` module not found.

- [ ] **Step 5: Implement `Layout`**

`src/layout/Layout.tsx` exports `Layout({ children })`: a `<nav>` with `<Link>`s (from `react-router-dom`) to `/` ("Beranda"), `/docs/wiring` ("Wiring"), `/docs/diy` ("DIY & 3D Print"), `/docs/flash` ("Flash Firmware"); renders `{children}` in a `<main>`; a `<footer>` with the attribution sentence and link specified above.

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- Layout` — Expected: PASS.

- [ ] **Step 7: Wire up `App.tsx` and `main.tsx`**

`App.tsx`: `<BrowserRouter><Routes>` with a `/` route rendering `<Layout><div>Zora Mini — coming soon</div></Layout>` as a temporary placeholder (replaced in Task 2). `main.tsx`: standard Vite React 18 root render of `<App />`.

- [ ] **Step 8: Add the Cloudflare Pages SPA fallback**

Create `public/_redirects` with exactly: `/* /index.html 200`

- [ ] **Step 9: Run the full test suite and the dev build**

Run: `npm test` — Expected: PASS. Run: `npm run build` — Expected: succeeds, produces `dist/`.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json index.html src public README.md 2>/dev/null
git add -A
git commit -m "feat: scaffold Vite React app with layout, routing, SPA fallback"
```

---

### Task 2: Landing page

**Files:**
- Create: `src/pages/Landing.tsx`
- Modify: `src/App.tsx:` (point `/` route at `Landing` instead of the placeholder)
- Test: `src/pages/Landing.test.tsx`

**Interfaces:**
- Consumes: `Layout` from Task 1.
- Produces: `Landing` component (`export function Landing(): JSX.Element`), rendered standalone (routes wrap it in `Layout` in `App.tsx`, so `Landing` itself renders only its own section, no nav/footer).

- [ ] **Step 1: Write the failing test**

```tsx
// src/pages/Landing.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Landing } from "./Landing";

test("renders hero heading, placeholder media, and CTA into docs", () => {
  render(<MemoryRouter><Landing /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: /zora mini/i })).toBeInTheDocument();
  expect(screen.getByText(/video segera hadir|demo segera hadir/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /mulai bikin sendiri|lihat panduan/i })).toHaveAttribute(
    "href",
    "/docs/wiring"
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Landing` — Expected: FAIL, module not found.

- [ ] **Step 3: Implement `Landing`**

Hero section: `<h1>` "Zora Mini" + one-line pitch (robot AI DIY voice assistant berbasis ESP32). A placeholder media block (a `<div>` with the text "Video demo segera hadir" — swapped for the real TikTok embed once supplied). A short "apa itu Zora" paragraph. A CTA `<Link to="/docs/wiring">` labeled "Mulai Bikin Sendiri".

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Landing` — Expected: PASS.

- [ ] **Step 5: Wire into routing**

In `src/App.tsx`, replace the Task 1 placeholder `/` route content with `<Layout><Landing /></Layout>`.

- [ ] **Step 6: Run the full suite**

Run: `npm test` — Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/pages/Landing.tsx src/pages/Landing.test.tsx src/App.tsx
git commit -m "feat: add landing page with placeholder hero media and docs CTA"
```

---

### Task 3: Shared content data (wiring pins, BOM/3D-print dimensions)

**Files:**
- Create: `src/content/wiring.ts`
- Create: `src/content/bom.ts`

**Interfaces:**
- Produces: `src/content/wiring.ts` exports `wiringPins: { fungsi: string; pin: string; gpio: string }[]`, ported verbatim from `docs/wiring-bread-compact-wifi.md` on the `esp32/supermini-zora` branch of `xiaozhi-esp32` (SuperMini column only — this site covers that variant alone), e.g. `{ fungsi: "Mic INMP441", pin: "WS", gpio: "GPIO4" }` through all mic/amp/OLED/button rows in that doc's table.
- Produces: `src/content/bom.ts` exports `bomItems: { komponen: string; qty: number; dimensi: string; catatan: string }[]`, ported from `docs/3d-print-dimensions.md` on the `esp32/supermini` branch's "Daftar komponen & dimensi" table (all 8 rows).

- [ ] **Step 1: Pull the source tables**

Run: `cd /Users/apittmy/me-n-me/AIoT/xiaozhi-esp32 && git show refs/heads/esp32/supermini-zora:docs/wiring-bread-compact-wifi.md` and `git show refs/heads/esp32/supermini:docs/3d-print-dimensions.md` to copy the exact SuperMini-column wiring rows and the 8 BOM rows.

- [ ] **Step 2: Write `src/content/wiring.ts`**

One array literal, one object per table row, values copied exactly from the doc (GPIO numbers must match — this is reference data a builder would get wrong by paraphrasing).

- [ ] **Step 3: Write `src/content/bom.ts`**

One array literal, one object per BOM row, `catatan` holding the "design note" column text from the doc.

- [ ] **Step 4: Verify against the source (no test framework needed — a manual diff check)**

Re-open both source docs side by side with the two new files; confirm every row/value matches 1:1. No build step needed yet since nothing imports these files.

- [ ] **Step 5: Commit**

```bash
git add src/content/wiring.ts src/content/bom.ts
git commit -m "feat: add wiring pin and BOM content data for SuperMini variant"
```

---

### Task 4: Docs > Wiring page

**Files:**
- Create: `src/pages/docs/Wiring.tsx`
- Modify: `src/App.tsx` (add `/docs/wiring` route)
- Test: `src/pages/docs/Wiring.test.tsx`

**Interfaces:**
- Consumes: `wiringPins` from `src/content/wiring.ts` (Task 3).
- Produces: `Wiring` component (`export function Wiring(): JSX.Element`).

- [ ] **Step 1: Write the failing test**

```tsx
// src/pages/docs/Wiring.test.tsx
import { render, screen } from "@testing-library/react";
import { Wiring } from "./Wiring";

test("renders a table row for every wiring pin entry", () => {
  render(<Wiring />);
  expect(screen.getByRole("heading", { name: /wiring/i })).toBeInTheDocument();
  expect(screen.getByText("GPIO4")).toBeInTheDocument();
  expect(screen.getByText("Mic INMP441")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Wiring` — Expected: FAIL.

- [ ] **Step 3: Implement `Wiring`**

Renders an `<h1>` "Wiring — SuperMini", a short intro paragraph, and a `<table>` with one `<tr>` per `wiringPins` entry (`fungsi`, `pin`, `gpio` columns).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Wiring` — Expected: PASS.

- [ ] **Step 5: Wire into routing**

Add route `/docs/wiring` in `App.tsx`: `<Layout><Wiring /></Layout>`.

- [ ] **Step 6: Run the full suite, commit**

```bash
npm test
git add src/pages/docs/Wiring.tsx src/pages/docs/Wiring.test.tsx src/App.tsx
git commit -m "feat: add docs wiring page"
```

---

### Task 5: Docs > DIY / 3D-print page

**Files:**
- Create: `src/pages/docs/Diy.tsx`
- Modify: `src/App.tsx` (add `/docs/diy` route)
- Test: `src/pages/docs/Diy.test.tsx`
- Create: `public/models/README.md`

**Interfaces:**
- Consumes: `bomItems` from `src/content/bom.ts` (Task 3).
- Produces: `Diy` component (`export function Diy(): JSX.Element`).

- [ ] **Step 1: Write the failing test**

```tsx
// src/pages/docs/Diy.test.tsx
import { render, screen } from "@testing-library/react";
import { Diy } from "./Diy";

test("renders BOM table and a not-ready placeholder for STL files", () => {
  render(<Diy />);
  expect(screen.getByText(/belum tersedia|segera hadir/i)).toBeInTheDocument();
  expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Diy` — Expected: FAIL.

- [ ] **Step 3: Implement `Diy`**

Renders an `<h1>` "DIY & 3D Print", a BOM `<table>` from `bomItems` (same row-per-item pattern as Task 4), and a clearly-styled placeholder block (e.g. a bordered `<div>`) with text "File STL belum tersedia — segera hadir" instead of a download link.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Diy` — Expected: PASS.

- [ ] **Step 5: Add the models drop folder**

Create `public/models/README.md` explaining: this folder is empty on purpose; drop STL/3MF files here and update `Diy.tsx`'s placeholder block with real download links once supplied.

- [ ] **Step 6: Wire into routing, run suite, commit**

Add `/docs/diy` route in `App.tsx`.

```bash
npm test
git add src/pages/docs/Diy.tsx src/pages/docs/Diy.test.tsx src/App.tsx public/models/README.md
git commit -m "feat: add docs DIY/3D-print page with not-ready placeholder"
```

---

### Task 6: FlashButton component + Docs > Flash page (guide + online flash + troubleshooting)

**Files:**
- Create: `src/components/FlashButton.tsx`
- Create: `src/pages/docs/Flash.tsx`
- Modify: `src/App.tsx` (add `/docs/flash` route)
- Test: `src/components/FlashButton.test.tsx`
- Test: `src/pages/docs/Flash.test.tsx`
- Create: `public/firmware/supermini-zora/README.md`

**Interfaces:**
- Produces: `FlashButton` — `export function FlashButton(): JSX.Element`. On mount, `fetch("/firmware/supermini-zora/manifest.json")`. While loading: renders nothing but a neutral loading state. On fetch failure (404/network error) or a manifest with an empty `builds` array: renders a disabled-looking block with the text "Firmware belum tersedia". On fetch success with at least one build: dynamically `import("esp-web-tools/dist/web/install-button.js")` (registers the `<esp-web-install-button>` custom element) and renders `<esp-web-install-button manifest="/firmware/supermini-zora/manifest.json">` with a slotted activate button labeled "Flash Zora Mini" plus a `<span slot="unsupported">` message telling the visitor to use Chrome or Edge.
- Produces: `Flash` component (`export function Flash(): JSX.Element`), consumes `FlashButton`.

- [ ] **Step 1: Install esp-web-tools**

Run: `npm install esp-web-tools@10.5.2`.

- [ ] **Step 2: Write the failing tests for `FlashButton`**

```tsx
// src/components/FlashButton.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { FlashButton } from "./FlashButton";

afterEach(() => { vi.restoreAllMocks(); });

test("shows a not-ready message when the manifest 404s", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
  render(<FlashButton />);
  await waitFor(() => expect(screen.getByText(/firmware belum tersedia/i)).toBeInTheDocument());
});

test("shows a not-ready message when the manifest has no builds", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ name: "Zora", builds: [] }) })
  );
  render(<FlashButton />);
  await waitFor(() => expect(screen.getByText(/firmware belum tersedia/i)).toBeInTheDocument());
});

test("renders the flash button when the manifest has a build", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ name: "Zora", builds: [{ chipFamily: "ESP32-S3", parts: [{ path: "firmware.bin", offset: 0 }] }] }),
    })
  );
  render(<FlashButton />);
  await waitFor(() => expect(document.querySelector("esp-web-install-button")).not.toBeNull());
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- FlashButton` — Expected: FAIL, module not found.

- [ ] **Step 4: Implement `FlashButton`**

Use `useState`/`useEffect` to fetch the manifest once on mount; branch render on `{ status: "loading" | "unavailable" | "ready"; manifest? }`. For `"ready"`, `await import("esp-web-tools/dist/web/install-button.js")` before rendering the custom element (or import it unconditionally at module top — either way the test's `waitFor` must observe the element after the fetch resolves).

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- FlashButton` — Expected: PASS.

- [ ] **Step 6: Write the failing test for `Flash` page**

```tsx
// src/pages/docs/Flash.test.tsx
import { render, screen } from "@testing-library/react";
import { Flash } from "./Flash";

test("renders flashing guide, browser caveat, BOOT instruction, and FAQ", () => {
  render(<Flash />);
  expect(screen.getByRole("heading", { name: /flash firmware/i })).toBeInTheDocument();
  expect(screen.getByText(/chrome|edge/i)).toBeInTheDocument();
  expect(screen.getByText(/boot/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /faq|pertanyaan/i })).toBeInTheDocument();
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npm test -- Flash` — Expected: FAIL.

- [ ] **Step 8: Implement `Flash`**

Renders: `<h1>` "Flash Firmware", short numbered guide (checkout `esp32/supermini-zora`, atau langsung pakai tombol di bawah), the browser caveat ("Pakai Chrome atau Edge, lewat HTTPS atau localhost"), the BOOT-button instruction for first flash, the `<FlashButton />`, and an FAQ section (`<h2>` "FAQ") covering at minimum: flashing gagal → cek koneksi USB, tahan BOOT, turunkan baud rate; port tidak muncul → driver USB-serial, kabel data (bukan kabel charge-only).

- [ ] **Step 9: Run test to verify it passes**

Run: `npm test -- Flash` — Expected: PASS.

- [ ] **Step 10: Add the firmware drop folder**

Create `public/firmware/supermini-zora/README.md` documenting the expected `manifest.json` (esp-web-tools format: `name`, `version`, `builds: [{ chipFamily: "ESP32-S3", parts: [{ path, offset }] }]`) and that the merged `.bin` + this manifest are supplied by the project owner after building from `esp32/supermini-zora`, not produced by this site.

- [ ] **Step 11: Wire into routing, run full suite, commit**

Add `/docs/flash` route in `App.tsx`.

```bash
npm test
git add src/components/FlashButton.tsx src/components/FlashButton.test.tsx src/pages/docs/Flash.tsx src/pages/docs/Flash.test.tsx src/App.tsx public/firmware/supermini-zora/README.md package.json package-lock.json
git commit -m "feat: add online flash button (esp-web-tools) and flash/troubleshooting docs page"
```

---

### Task 7: Repo README and build verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- None (documentation only).

- [ ] **Step 1: Write the repo README**

Cover: what this repo is (Zora Mini DIY docs + online-flash site), tech stack (Vite/React/esp-web-tools), how to run locally (`npm install`, `npm run dev`, `npm test`, `npm run build`), deploy target (Cloudflare Pages, build command `npm run build`, output directory `dist`), and the two manual follow-ups: drop the merged `.bin` + `manifest.json` into `public/firmware/supermini-zora/` (see that folder's README), drop STL files into `public/models/` and update `Diy.tsx`.

- [ ] **Step 2: Full verification run**

Run: `npm test` — Expected: all PASS. Run: `npm run build` — Expected: succeeds. Run: `npx serve dist` (or `npm run preview`) and manually load `/`, `/docs/wiring`, `/docs/diy`, `/docs/flash` to confirm each renders.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add repo README with run/deploy/follow-up instructions"
```

- [ ] **Step 4: Push**

```bash
git push -u origin main
```

---

## Self-Review

**1. Spec coverage:** Landing (Task 2) ✓. `/docs` wiring (Task 4), DIY/BOM (Task 5), flashing+troubleshooting (Task 6) ✓. Online one-click flash via esp-web-tools, v1 scope `supermini-zora` only (Task 6) ✓. React + Cloudflare Pages (Task 1, 7) ✓. Merge/test out of scope — respected (Task 6 only ships the receiving folder + README, no build/merge step) ✓. Media/STL placeholders — Task 2, Task 5 ✓. Attribution link — Task 1 `Layout` ✓.

**2. Step scan:** done inline; no step left as "handle edge cases" without a concrete follow-on test.

**3. Type consistency:** `wiringPins`/`bomItems` field names introduced in Task 3 are the exact names Task 4/5 render; `FlashButton`'s three states (`loading`/`unavailable`/`ready`) are used consistently in its own test.

**4. Review Focus:** all five items map to a task test — WebSerial-unsupported message (Task 6, Flash caveat text + FlashButton's `unsupported` slot), missing-manifest state (Task 6 FlashButton tests), SPA fallback (Task 1 `_redirects`), DIY placeholder (Task 5), attribution link in shared `Layout` (Task 1).

**5. Proportion:** plan is longer than the spec (expected for 7 implementation tasks with data verbatim-copy steps); code blocks are test assertions and signatures only, no full component bodies written out.

---

Plan complete and saved to `docs/superpowers/plans/2026-11-15-zora-web-setup.md`. Please review the plan. Which execution approach would you prefer?

- **Subagent-driven** — a fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end. Most thorough; costs a fresh context per task and per review.
- **Native** — I implement every task myself in this session, then one fresh reviewer checks the whole branch at the end. Cheapest and fastest; no independent review until the end.

For this plan I recommend **Subagent-driven**: 7 tasks with interfaces that later tasks depend on (content data shapes in Task 3, `FlashButton`'s manifest contract in Task 6) are worth a fresh reviewer's gate each, and a shipped mistake here (wrong GPIO pin copied, a flash button that silently breaks on unsupported browsers) is public-facing and costs real rework once live.
