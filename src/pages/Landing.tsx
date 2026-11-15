import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const docEntries = [
  {
    name: "Kumpulkan",
    title: "Wiring",
    body: "Sambungkan mic, ampli, dan OLED ke pin GPIO yang tepat — semua sudah dipetakan.",
    href: "/docs/wiring",
    linkLabel: "Lihat Wiring",
    photo: { id: 304, alt: "Tangan menyetel fader di mixer audio" },
  },
  {
    name: "Rakit",
    title: "DIY & 3D Print",
    body: "Cetak body yeti-nya, pasang tiap komponen sesuai daftar BOM dan dimensinya.",
    href: "/docs/diy",
    linkLabel: "Lihat 3D Print",
    photo: { id: 491, alt: "Kapak, palu, tang, dan sarung tangan di atas kayu gelap" },
  },
  {
    name: "Nyalakan",
    title: "Flash Firmware",
    body: "Satu klik dari browser — tanpa install apa-apa, robotnya langsung hidup.",
    href: "/docs/flash",
    linkLabel: "Lihat Flash Firmware",
    photo: { id: 407, alt: "Tangan menyalakan kembang api yang memercikkan cahaya di kegelapan" },
  },
];

export function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--pupil-x", `${Math.max(-1, Math.min(1, x)) * 18}px`);
    el.style.setProperty("--pupil-y", `${Math.max(-1, Math.min(1, y)) * 18}px`);
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
        <div className={styles.heroShape} aria-hidden="true">
          <span className={styles.pupil} />
        </div>
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
      </section>

      <section className={styles.demo}>
        <div className={styles.demoFrame}>
          <span className={styles.demoPlay} aria-hidden="true" />
          <p>Video demo segera hadir — demo TikTok aslinya lagi disiapkan.</p>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutText}>
          <h2>Yeti kecil yang bisa dengar dan bicara</h2>
          <p>
            Zora Mini itu voice assistant AI yang jalan di ESP32-S3 SuperMini — mic, ampli kecil,
            dan layar OLED buat &ldquo;wajah&rdquo;-nya: dua mata bulat yang nyala cyan di
            kegelapan. Videonya sempat viral di TikTok, banyak yang nanya &ldquo;itu beli di
            mana?&rdquo; — jawabannya: nggak dijual, tapi semua yang kamu butuh buat bikin sendiri
            ada di sini.
          </p>
        </div>
        <div className={styles.aboutPhotoWrap}>
          <img
            className={styles.aboutPhoto}
            src="https://picsum.photos/id/319/900/900"
            width={900}
            height={900}
            alt="Tangan memegang kamera rangefinder vintage — suasana oprek alat elektronik"
            loading="lazy"
          />
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
          {docEntries.map((entry) => (
            <li key={entry.href} className={styles.step}>
              <img
                className={styles.stepPhoto}
                src={`https://picsum.photos/id/${entry.photo.id}/300/300`}
                width={96}
                height={96}
                alt={entry.photo.alt}
                loading="lazy"
              />
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
          <div className={`${styles.ctaTile} ${styles.ctaTilePhotoLeft}`} aria-hidden="true">
            <img
              src="https://picsum.photos/id/491/900/700"
              width={900}
              height={700}
              alt=""
              loading="lazy"
            />
          </div>
          <div className={`${styles.ctaTile} ${styles.ctaTileCenter}`}>
            <h2>Siap bikin Zora sendiri?</h2>
            <p>Mulai dari wiring, cetak bodinya, lalu flash firmware-nya. Gratis dan open source.</p>
            <Link to="/docs/wiring" className={styles.cta}>
              Mulai dari Wiring
            </Link>
          </div>
          <div
            className={`${styles.ctaTile} ${styles.ctaTileFlat}`}
            aria-hidden="true"
          />
        </div>
      </section>

      <p className={styles.credits}>
        Foto suasana (bukan Zora Mini asli): Kristian Karlsson, Drew Patrick Miller, Todd
        Quackenbush, Kelley Bozarth via Unsplash/Picsum — segera diganti dengan foto &amp; video
        Zora Mini asli.
      </p>
    </div>
  );
}
