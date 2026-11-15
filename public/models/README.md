# public/models

This folder is empty on purpose — and may stay that way.

The print source for the yeti body isn't a custom model: it's
[Compagnon 3.09 — Build Your Expressive Robot](https://makerworld.com/en/models/2109424-compagnon-309-build-your-expressive-robot#profileId-2281938)
on MakerWorld, linked directly from `src/pages/docs/Diy.tsx`. MakerWorld is a
login-gated maker platform, so its STL files are not mirrored here — builders
download straight from that model page.

If a custom/remixed STL ever replaces or supplements that model, drop it here,
for example:

```
public/models/zora-body.stl
```

and update `Diy.tsx`'s intro paragraph to link to it alongside (or instead
of) the MakerWorld model.

`src/content/bom.ts` (ported from the `esp32/supermini` branch's
`docs/3d-print-dimensions.md`) stays as supplementary reference for the
electronics' dimensions, regardless of which print source is used — note
that it doesn't yet have DevKit N16R8-specific measurements (see the note on
`/docs/diy` when that board is selected).
