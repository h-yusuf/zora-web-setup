import { bomItems } from "../../content/bom";
import styles from "./Docs.module.css";

export function Diy() {
  return (
    <div className={styles.page}>
      <h1>DIY &amp; 3D Print</h1>
      <p className={styles.intro}>
        Daftar komponen dan perkiraan dimensinya, buat rencana desain enclosure yeti. Semua
        dimensi di bawah estimasi umum dari varian breakout board yang beredar di pasaran — ukur
        ulang pakai jangka sorong tiap modul asli sebelum finalisasi model 3D.
      </p>
      <table>
        <thead>
          <tr>
            <th>Komponen</th>
            <th>Qty</th>
            <th>Dimensi (P x L x T, mm)</th>
            <th>Catatan desain enclosure</th>
          </tr>
        </thead>
        <tbody>
          {bomItems.map((item) => (
            <tr key={item.komponen}>
              <td>{item.komponen}</td>
              <td>{item.qty}</td>
              <td>{item.dimensi}</td>
              <td>{item.catatan}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.placeholder}>
        <p>File STL belum tersedia — segera hadir</p>
        <p>
          Model 3D-nya masih difinalisasi dari dimensi di atas. Begitu file STL/3MF-nya siap,
          link unduhannya akan muncul di sini.
        </p>
      </div>
    </div>
  );
}
