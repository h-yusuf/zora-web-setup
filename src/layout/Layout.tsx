import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Layout.module.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className={styles.nav}>
        <Link to="/" className={styles.wordmark}>
          zora mini
        </Link>
        <details className={styles.menu}>
          <summary className={styles.menuButton}>Menu</summary>
          <nav className={styles.menuPanel}>
            <Link to="/docs/wiring">Wiring</Link>
            <Link to="/docs/diy">DIY &amp; 3D Print</Link>
            <Link to="/docs/flash">Flash Firmware</Link>
          </nav>
        </details>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <p>
          Zora Mini adalah fork dari{" "}
          <a href="https://github.com/78/xiaozhi-esp32" target="_blank" rel="noreferrer">
            xiaozhi-esp32
          </a>{" "}
          (MIT License). Firmware:{" "}
          <a href="https://github.com/h-yusuf/zora-mini-esp32" target="_blank" rel="noreferrer">
            h-yusuf/zora-mini-esp32
          </a>
          , branch <code>esp32/supermini-zora</code>.
        </p>
      </footer>
    </>
  );
}
