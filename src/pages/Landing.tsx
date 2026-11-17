import { useRef } from "react";
import { Link } from "react-router-dom";
import zoraFrontEyes from "../assets/device/zora-front-eyes.jpg";
import styles from "./Landing.module.css";

const docEntries = [
  {
    name: "Kumpulkan",
    body: "Sambungkan mic, ampli, dan OLED ke pin GPIO yang tepat — semua sudah dipetakan.",
    href: "/docs/wiring",
    linkLabel: "Lihat Wiring",
  },
  {
    name: "Rakit",
    body: "Cetak body yeti-nya, pasang tiap komponen sesuai daftar BOM dan dimensinya.",
    href: "/docs/diy",
    linkLabel: "Lihat 3D Print",
  },
  {
    name: "Nyalakan",
    body: "Satu klik dari browser — tanpa install apa-apa, robotnya langsung hidup.",
    href: "/docs/flash",
    linkLabel: "Lihat Flash Firmware",
  },
];

export function Landing() {
  const eyesRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.MouseEvent<HTMLElement>) {
    const el = eyesRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--pupil-x", `${Math.max(-1, Math.min(1, x)) * 3}px`);
    el.style.setProperty("--pupil-y", `${Math.max(-1, Math.min(1, y)) * 3}px`);
  }

  function handlePointerLeave() {
    const el = eyesRef.current;
    if (!el) return;
    el.style.setProperty("--pupil-x", "0px");
    el.style.setProperty("--pupil-y", "0px");
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero} onMouseMove={handlePointerMove} onMouseLeave={handlePointerLeave}>
        <div className={styles.eyes} ref={eyesRef} aria-hidden="true">
          <svg viewBox="0 0 120 60">
            <defs>
              <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#glow)">
              <circle cx="38" cy="30" r="14" className={styles.eye} />
              <circle cx="82" cy="30" r="14" className={styles.eye} />
            </g>
            <circle cx="38" cy="30" r="5" className={styles.pupil} />
            <circle cx="82" cy="30" r="5" className={styles.pupil} />
          </svg>
        </div>

        <h1 className={styles.headline}>Zora Mini</h1>

        <p className={styles.lead}>Robot AI suara bentuk yeti, berbasis ESP32-S3 — viral di TikTok.</p>

        <Link to="/docs/wiring" className={styles.cta}>
          Mulai Bikin Sendiri
        </Link>
      </section>

      <section className={styles.demo}>
        <p className={styles.demoCaption}>Zora Mini yang asli — bukan render, bukan mockup. Video segera hadir.</p>
        <img
          src={zoraFrontEyes}
          alt="Zora Mini asli: body yeti putih hasil cetak 3D dengan tanduk, layar OLED menampilkan dua mata bulat menyala cyan"
          className={styles.demoPhoto}
        />
      </section>

      <section className={styles.about}>
        <h2>Yeti kecil yang bisa dengar dan bicara</h2>
        <p>
          Zora Mini itu voice assistant AI yang jalan di ESP32-S3 SuperMini — mic, ampli kecil,
          dan layar OLED buat &ldquo;wajah&rdquo;-nya: dua mata bulat yang nyala cyan di
          kegelapan. Videonya sempat viral di TikTok, banyak yang nanya &ldquo;itu beli di
          mana?&rdquo; — jawabannya: nggak dijual, tapi semua yang kamu butuh buat bikin sendiri
          ada di sini.
        </p>
        <div className={styles.aboutColumns}>
          <div>
            <h3>Kenapa bentuk yeti?</h3>
            <p>
              Gampang dicetak 3D dalam satu potongan, dan bentuk yang lucu bikin orang penasaran
              pas lihat matanya nyala — itu yang bikin videonya ditonton banyak orang.
            </p>
          </div>
          <div>
            <h3>Kenapa open source?</h3>
            <p>
              Firmware-nya fork dari xiaozhi-esp32 (MIT License), dimodifikasi khusus buat board
              SuperMini dan bentuk Zora. Semua kode dan dokumentasinya kebuka buat siapa aja.
            </p>
          </div>
        </div>
        <a
          className={styles.aboutLink}
          href="https://github.com/h-yusuf/zora-mini-esp32"
          target="_blank"
          rel="noreferrer"
        >
          Lihat firmware di GitHub
        </a>
      </section>

      <section className={styles.howItWorks}>
        <h2>Tiga langkah bikin</h2>
        <ol className={styles.steps}>
          {docEntries.map((entry) => (
            <li key={entry.href} className={styles.step}>
              <span className={styles.stepName}>{entry.name}</span>
              <p className={styles.stepBody}>{entry.body}</p>
              <Link to={entry.href} className={styles.stepLink}>
                {entry.linkLabel}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.ctaSection}>
        <h2>Siap bikin Zora sendiri?</h2>
        <p>Mulai dari wiring, cetak bodinya, lalu flash firmware-nya. Gratis dan open source.</p>
        <Link to="/docs/wiring" className={styles.cta}>
          Mulai dari Wiring
        </Link>
      </section>
    </div>
  );
}
