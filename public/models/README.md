# public/models

This folder is empty on purpose.

Drop the Zora Mini enclosure's STL (or 3MF) files here once they're ready, for
example:

```
public/models/zora-body.stl
public/models/zora-lid.stl
```

Then update the placeholder block in `src/pages/docs/Diy.tsx` (the "File STL
belum tersedia — segera hadir" box) with real download links pointing at
`/models/<file>.stl`.

Until then, `src/content/bom.ts` (ported from the `esp32/supermini` branch's
`docs/3d-print-dimensions.md`) is the only reference a builder has for sizing
their own enclosure.
