// Ported from xiaozhi-esp32 branch `esp32/supermini`,
// docs/3d-print-dimensions.md — "Daftar komponen & dimensi" table (all 8 rows).
export const bomItems: {
  komponen: string;
  qty: number;
  dimensi: string;
  catatan: string;
}[] = [
  {
    komponen: "ESP32-S3 SuperMini",
    qty: 1,
    dimensi: "±22.5 x 18 x 3.5 (PCB saja; +USB-C connector ±3.2mm tinggi)",
    catatan:
      "Sisi USB-C harus kebuka penuh (flashing + charging). Mounting: tempel double-tape atau standoff kalau ada lubang di sudut PCB.",
  },
  {
    komponen: "Mic INMP441",
    qty: 1,
    dimensi: "±15 x 16 x 2 (cek punya sendiri, ada varian bulat ±15 diameter)",
    catatan:
      "Lubang sound port kecil (Ø2–3mm) tepat di atas membrane mic, jangan ketutup rapat/rapet ke dinding.",
  },
  {
    komponen: "Amp MAX98357A",
    qty: 1,
    dimensi: "±20 x 15 x 2.5",
    catatan: "Gak perlu cutout khusus, cukup jaga ventilasi (bisa panas di volume tinggi).",
  },
  {
    komponen: "Speaker 4–8Ω",
    qty: 1,
    dimensi: "Isi sesuai speaker yang dipakai — umum diameter bulat 28–40mm, tebal 5–8mm",
    catatan:
      "Perlu grill/lubang-lubang kecil di enclosure depan buat keluar suara, jangan sumbat total.",
  },
  {
    komponen: "OLED SSD1306 128x64 (I2C)",
    qty: 1,
    dimensi: "±27.3 x 27.8 x 4 (area tampil aktif ±21.7 x 10.9mm)",
    catatan:
      'Cutout/window sebesar area tampil di bagian depan ("wajah" device). PCB biasanya 4 lubang mounting di sudut.',
  },
  {
    komponen: "Touch sensor TTP223 (module A, satu-satunya yang dipakai)",
    qty: 1,
    dimensi: "±14 x 6 x 2",
    catatan:
      "Pad sensor harus nempel rapat ke permukaan luar plastik tipis (<3mm) biar sensitivitas sentuh tetap kerasa.",
  },
  {
    komponen: "Baterai LiPo JYZ 603030, 500mAh",
    qty: 1,
    dimensi: '30 x 30 x 6 (P x L x T — kode "603030" = tebal 6mm, lebar 30mm, panjang 30mm)',
    catatan: "Kompartemen baterai terpisah/empuk, sisain jalur buat kabel B+/B-.",
  },
  {
    komponen: "Power switch (baru, inline kabel baterai)",
    qty: 1,
    dimensi:
      "Slide switch kecil umum ±10.4 x 4.1 x 3.4 (body), atau toggle panel-mount Ø6mm kalau mau model tekan/putar",
    catatan:
      "Pasang seri di kabel B+ baterai (bukan paralel). Taruh di sisi enclosure yang gampang dijangkau jari, bukan ketutup baterai.",
  },
];
