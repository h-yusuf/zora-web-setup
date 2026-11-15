export type WiringPin = { fungsi: string; pin: string; gpio: string };

// Ported verbatim from xiaozhi-esp32 branch `esp32/supermini-zora`,
// docs/wiring-bread-compact-wifi.md — "Ringkasan pin" table (SuperMini column).
// Do not paraphrase GPIO values; this is reference data a builder would get
// wrong by paraphrasing.
export const wiringPinsSuperMini: WiringPin[] = [
  { fungsi: "Mic INMP441", pin: "WS", gpio: "GPIO4" },
  { fungsi: "Mic INMP441", pin: "SCK", gpio: "GPIO5" },
  { fungsi: "Mic INMP441", pin: "SD", gpio: "GPIO6" },
  { fungsi: "Mic INMP441", pin: "L/R", gpio: "GND" },
  { fungsi: "Mic INMP441", pin: "VDD", gpio: "3V3" },
  { fungsi: "Mic INMP441", pin: "GND", gpio: "GND" },
  { fungsi: "Amp MAX98357A", pin: "DIN", gpio: "GPIO7" },
  { fungsi: "Amp MAX98357A", pin: "BCLK", gpio: "GPIO10" },
  { fungsi: "Amp MAX98357A", pin: "LRC (WS)", gpio: "GPIO11" },
  { fungsi: "Amp MAX98357A", pin: "VIN", gpio: "5V" },
  { fungsi: "Amp MAX98357A", pin: "GND", gpio: "GND" },
  { fungsi: "Amp MAX98357A", pin: "SD (mode)", gpio: "biarkan / 3V3" },
  { fungsi: "Amp MAX98357A", pin: "GAIN", gpio: "biarkan (9 dB)" },
  { fungsi: "OLED SSD1306 128x64", pin: "SDA", gpio: "GPIO8" },
  { fungsi: "OLED SSD1306 128x64", pin: "SCL", gpio: "GPIO9" },
  { fungsi: "OLED SSD1306 128x64", pin: "VCC", gpio: "3V3" },
  { fungsi: "OLED SSD1306 128x64", pin: "GND", gpio: "GND" },
  { fungsi: "Tombol BOOT (bawaan)", pin: "—", gpio: "GPIO0" },
];

// Ported verbatim from xiaozhi-esp32 branch `esp32/n16r8-zora`,
// docs/wiring-bread-compact-wifi.md — "Ringkasan pin" table (DevKit N16R8).
export const wiringPinsN16R8: WiringPin[] = [
  { fungsi: "Mic INMP441", pin: "WS", gpio: "GPIO4" },
  { fungsi: "Mic INMP441", pin: "SCK", gpio: "GPIO5" },
  { fungsi: "Mic INMP441", pin: "SD", gpio: "GPIO6" },
  { fungsi: "Mic INMP441", pin: "L/R", gpio: "GND" },
  { fungsi: "Mic INMP441", pin: "VDD", gpio: "3V3" },
  { fungsi: "Mic INMP441", pin: "GND", gpio: "GND" },
  { fungsi: "Amp MAX98357A", pin: "DIN", gpio: "GPIO7" },
  { fungsi: "Amp MAX98357A", pin: "BCLK", gpio: "GPIO15" },
  { fungsi: "Amp MAX98357A", pin: "LRC (WS)", gpio: "GPIO16" },
  { fungsi: "Amp MAX98357A", pin: "VIN", gpio: "5V" },
  { fungsi: "Amp MAX98357A", pin: "GND", gpio: "GND" },
  { fungsi: "Amp MAX98357A", pin: "SD (mode)", gpio: "biarkan / 3V3" },
  { fungsi: "Amp MAX98357A", pin: "GAIN", gpio: "biarkan (9 dB)" },
  { fungsi: "OLED SSD1306 128x64", pin: "SDA", gpio: "GPIO41" },
  { fungsi: "OLED SSD1306 128x64", pin: "SCL", gpio: "GPIO42" },
  { fungsi: "OLED SSD1306 128x64", pin: "VCC", gpio: "3V3" },
  { fungsi: "OLED SSD1306 128x64", pin: "GND", gpio: "GND" },
  { fungsi: "Tombol BOOT (bawaan)", pin: "—", gpio: "GPIO0" },
];
