import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const docEntries = [
  {
    name: "Kumpulkan",
    body: "Sambungkan mic, ampli, dan OLED ke pin GPIO yang tepat — semua sudah dipetakan.",
    href: "/docs/wiring",
    linkLabel: "Lihat Wiring",
    icon: "wiring" as const,
  },
  {
    name: "Rakit",
    body: "Cetak body yeti-nya, pasang tiap komponen sesuai daftar BOM dan dimensinya.",
    href: "/docs/diy",
    linkLabel: "Lihat 3D Print",
    icon: "print" as const,
  },
  {
    name: "Nyalakan",
    body: "Satu klik dari browser — tanpa install apa-apa, robotnya langsung hidup.",
    href: "/docs/flash",
    linkLabel: "Lihat Flash Firmware",
    icon: "flash" as const,
  },
];

function StepIcon({ kind }: { kind: "wiring" | "print" | "flash" }) {
  if (kind === "wiring") {
    return (
      <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
        <circle cx="13" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="35" cy="34" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M17 17 C 24 22, 24 26, 31 31"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "print") {
    return (
      <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
        <path
          d="M10 32 Q24 38 38 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 24 Q24 29 36 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M15 16 Q24 20 33 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
      <path
        d="M26 8 L14 27 H22 L20 40 L34 19 H26 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--pupil-x", `${Math.max(-1, Math.min(1, x)) * 6}px`);
    el.style.setProperty("--pupil-y", `${Math.max(-1, Math.min(1, y)) * 5}px`);
  }

  function handlePointerLeave() {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--pupil-x", "0px");
    el.style.setProperty("--pupil-y", "0px");
  }

  return (
    <div className={styles.page}>
      <section
        className={styles.hero}
        ref={heroRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <div className={styles.heroText}>
          <h1>Zora Mini</h1>
          <p className={styles.lead}>
            Robot AI suara bentuk yeti, berbasis ESP32-S3 — viral di TikTok, sekarang kamu bisa
            bikin sendiri.
          </p>
          <Link to="/docs/wiring" className={styles.cta}>
            Mulai Bikin Sendiri
          </Link>
        </div>

        <div className={styles.heroArt} aria-hidden="true">
          <svg viewBox="0 0 600 640" className={styles.yetiSvg}>
            <defs>
              <filter id="eyeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="14" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ears */}
            <circle cx="186" cy="150" r="74" className={styles.yetiBody} />
            <circle cx="414" cy="150" r="74" className={styles.yetiBody} />
            {/* body */}
            <rect x="110" y="160" width="380" height="430" rx="170" className={styles.yetiBody} />
            {/* feet */}
            <rect x="155" y="560" width="100" height="70" rx="40" className={styles.yetiShade} />
            <rect x="345" y="560" width="100" height="70" rx="40" className={styles.yetiShade} />
            {/* face screen */}
            <rect x="185" y="280" width="230" height="150" rx="38" className={styles.yetiScreen} />
            {/* eyes, glowing, pupils track the cursor */}
            <g filter="url(#eyeGlow)">
              <circle cx="258" cy="355" r="30" className={styles.eye} />
              <circle cx="342" cy="355" r="30" className={styles.eye} />
            </g>
            <circle cx="258" cy="355" r="9" className={styles.pupil} />
            <circle cx="342" cy="355" r="9" className={styles.pupil} />
          </svg>
        </div>
      </section>

      <section className={styles.demo}>
        <div className={styles.demoText}>
          <h2>Video yang bikin orang nanya-nanya</h2>
          <p>
            Klip TikTok-nya yang bikin Zora Mini dikenal — lagi disiapkan buat ditaruh di sini.
          </p>
        </div>
        <div className={styles.phoneFrame}>
          <svg viewBox="0 0 120 130" className={styles.phoneMini} aria-hidden="true">
            <circle cx="36" cy="55" r="26" className={styles.yetiBody} />
            <circle cx="84" cy="55" r="26" className={styles.yetiBody} />
            <rect x="24" y="48" width="72" height="56" rx="26" className={styles.yetiBody} />
            <rect x="40" y="68" width="40" height="28" rx="10" className={styles.yetiScreen} />
            <circle cx="52" cy="82" r="5.5" className={styles.eyeStatic} />
            <circle cx="68" cy="82" r="5.5" className={styles.eyeStatic} />
          </svg>
          <span className={styles.demoPlay} />
          <p>Video segera hadir</p>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutLeft}>
          <div className={styles.aboutText}>
            <h2>Yeti kecil yang bisa dengar dan bicara</h2>
            <p>
              Zora Mini itu voice assistant AI yang jalan di ESP32-S3 SuperMini — mic, ampli
              kecil, dan layar OLED buat &ldquo;wajah&rdquo;-nya: dua mata bulat yang nyala cyan di
              kegelapan. Videonya sempat viral di TikTok, banyak yang nanya &ldquo;itu beli di
              mana?&rdquo; — jawabannya: nggak dijual, tapi semua yang kamu butuh buat bikin
              sendiri ada di sini.
            </p>
          </div>
          <div className={styles.boardWrap} aria-hidden="true">
            <svg viewBox="0 0 320 220" className={styles.boardSvg}>
              <rect x="0" y="0" width="320" height="220" rx="16" className={styles.boardBase} />
              <rect x="110" y="70" width="100" height="60" rx="8" className={styles.boardChip} />
              <path
                d="M60 60 C 90 60, 90 90, 120 90"
                fill="none"
                className={styles.boardWire}
                strokeWidth="3"
              />
              <path
                d="M260 60 C 230 60, 230 90, 200 90"
                fill="none"
                className={styles.boardWireB}
                strokeWidth="3"
              />
              <path
                d="M60 160 C 90 160, 90 130, 120 130"
                fill="none"
                className={styles.boardWireB}
                strokeWidth="3"
              />
              <path
                d="M260 160 C 230 160, 230 130, 200 130"
                fill="none"
                className={styles.boardWire}
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
        <div className={styles.aboutBlocks}>
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
          <a
            className={styles.aboutButton}
            href="https://github.com/h-yusuf/zora-mini-esp32"
            target="_blank"
            rel="noreferrer"
          >
            Lihat Firmware di GitHub
          </a>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.howItWorksIntro}>
          <h2>Tiga langkah bikin</h2>
          <p>Semua panduan lengkap — pin, dimensi part, sampai flash langsung dari browser.</p>
        </div>
        <ol className={styles.steps}>
          {docEntries.map((entry, i) => (
            <li key={entry.href} className={styles.step}>
              {i > 0 && <span className={styles.stepConnector} aria-hidden="true" />}
              <span className={styles.stepIcon}>
                <StepIcon kind={entry.icon} />
              </span>
              <div>
                <span className={styles.stepName}>{entry.name}</span>
                <p className={styles.stepBody}>{entry.body}</p>
                <Link to={entry.href}>{entry.linkLabel}</Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaRow}>
          <div className={`${styles.ctaTile} ${styles.ctaTilePattern}`} aria-hidden="true" />
          <div className={`${styles.ctaTile} ${styles.ctaTileCenter}`}>
            <h2>Siap bikin Zora sendiri?</h2>
            <p>Mulai dari wiring, cetak bodinya, lalu flash firmware-nya. Gratis dan open source.</p>
            <Link to="/docs/wiring" className={styles.cta}>
              Mulai dari Wiring
            </Link>
          </div>
          <div className={`${styles.ctaTile} ${styles.ctaTileFlat}`} aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}
