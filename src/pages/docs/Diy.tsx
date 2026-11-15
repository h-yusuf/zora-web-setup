import { bomItems } from "../../content/bom";
import { useBoardChoice } from "../../hooks/useBoardChoice";
import { BoardPicker } from "../../components/BoardPicker";
import styles from "./Docs.module.css";

const MAKERWORLD_URL =
  "https://makerworld.com/en/models/2109424-compagnon-309-build-your-expressive-robot#profileId-2281938";

export function Diy() {
  const [board, setBoard] = useBoardChoice();

  return (
    <div className={styles.page}>
      <h1>DIY &amp; 3D Print</h1>
      <p className={styles.intro}>
        Badan yeti ini dicetak dari model{" "}
        <a href={MAKERWORLD_URL} target="_blank" rel="noreferrer">
          Compagnon 3.09 — Build Your Expressive Robot
        </a>{" "}
        di MakerWorld, bukan desain sendiri — tinggal unduh dan cetak. Tabel di bawah ini daftar
        komponen elektroniknya, buat ngecek dimensi tiap part sebelum muat-pasang ke body-nya.
      </p>

      <BoardPicker board={board} onChange={setBoard} />

      {board === "n16r8" && (
        <div className={styles.placeholder}>
          <p>Belum ada dimensi khusus DevKit N16R8</p>
          <p>
            Modul mic/ampli/OLED di bawah fisiknya sama persis di kedua board — bedanya cuma
            pemetaan GPIO (lihat halaman Wiring). Tapi board DevKit N16R8 sendiri jauh lebih besar
            dari SuperMini, jadi enclosure-nya butuh penyesuaian ukuran yang belum didokumentasikan
            di sini.
          </p>
        </div>
      )}

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

      <p className={styles.sourceNote}>
        Dimensi komponen di atas diukur dari varian breakout board yang beredar di pasaran (bukan
        hasil ukur langsung modul kamu) — tetap cek ulang pakai jangka sorong sebelum cetak ulang
        body-nya sendiri.
      </p>
    </div>
  );
}
