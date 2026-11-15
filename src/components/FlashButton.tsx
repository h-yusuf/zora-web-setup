import { useEffect, useState } from "react";
import styles from "./FlashButton.module.css";

const MANIFEST_URL = "/firmware/supermini-zora/manifest.json";

type ManifestBuild = { chipFamily: string; parts: { path: string; offset: number }[] };
type Manifest = { name: string; builds: ManifestBuild[] };
type FlashState =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "ready"; manifest: Manifest };

export function FlashButton() {
  const [state, setState] = useState<FlashState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch(MANIFEST_URL)
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as Manifest;
      })
      .catch(() => null)
      .then((manifest) => {
        if (cancelled) return;
        if (manifest && manifest.builds?.length > 0) {
          // Registers the <esp-web-install-button> custom element.
          import("esp-web-tools/dist/web/install-button.js").then(() => {
            if (!cancelled) setState({ status: "ready", manifest });
          });
        } else {
          setState({ status: "unavailable" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <div className={styles.loading} aria-hidden="true" />;
  }

  if (state.status === "unavailable") {
    return (
      <div className={styles.unavailable}>
        <p>Firmware belum tersedia</p>
        <p className={styles.hint}>
          Binary flash untuk <code>esp32/supermini-zora</code> belum di-upload. Kembali lagi nanti,
          atau build sendiri dari{" "}
          <a href="https://github.com/h-yusuf/zora-mini-esp32" target="_blank" rel="noreferrer">
            repo firmware-nya
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <esp-web-install-button manifest={MANIFEST_URL} className={styles.installButton}>
      <button slot="activate" className={styles.activate}>
        Flash Zora Mini
      </button>
      <span slot="unsupported" className={styles.unsupported}>
        Browser ini belum dukung WebSerial — buka halaman ini pakai Chrome atau Edge.
      </span>
      <span slot="not-allowed" className={styles.unsupported}>
        Flashing cuma jalan di HTTPS atau localhost.
      </span>
    </esp-web-install-button>
  );
}
