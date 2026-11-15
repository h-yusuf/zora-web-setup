# public/firmware/supermini-zora

This folder is empty on purpose. `FlashButton` (`src/components/FlashButton.tsx`)
fetches `manifest.json` from here on every page load; until it exists (or 404s,
or has an empty `builds` array), the Flash page shows a "Firmware belum
tersedia" placeholder instead of a broken button.

## What goes here

1. **The merged, flashable binary** for the `esp32/supermini-zora` board
   variant — built and hardware-tested by the project owner from
   [`h-yusuf/zora-mini-esp32`](https://github.com/h-yusuf/zora-mini-esp32),
   branch `esp32/supermini-zora`, following the
   `esptool.py --chip esp32s3 merge_bin ...` pattern (adapted to this
   project's `sdkconfig.board.supermini` / `partitions/v2/4m.csv`). Producing
   this binary is **not** part of this site's build — it's a manual,
   one-time step documented in the design spec
   (`docs/superpowers/specs/2026-11-15-zora-web-setup-design.md`).
2. **`manifest.json`**, in the [ESP Web Tools manifest format](https://esphome.github.io/esp-web-tools/):

```json
{
  "name": "Zora Mini — SuperMini",
  "version": "1.0.0",
  "builds": [
    {
      "chipFamily": "ESP32-S3",
      "parts": [{ "path": "zora-mini-supermini-zora-v1.0.0.bin", "offset": 0 }]
    }
  ]
}
```

`parts[].path` is relative to this folder, so the referenced `.bin` must sit
right next to `manifest.json` here. `FlashButton` doesn't validate the
schema beyond checking `builds.length > 0` — get the chip family and offset
right or flashing will fail on-device, not in this site.
