import { wiringPinsSuperMini, wiringPinsN16R8, type WiringPin } from "../../content/wiring";
import { useBoardChoice } from "../../hooks/useBoardChoice";
import { BoardPicker } from "../../components/BoardPicker";
import zoraWiringAmp from "../../assets/device/zora-wiring-amp.jpg";
import zoraWiringOpen from "../../assets/device/zora-wiring-open.jpg";
import styles from "./Docs.module.css";

function PinTable({ pins }: { pins: WiringPin[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Fungsi</th>
          <th>Pin modul</th>
          <th>GPIO</th>
        </tr>
      </thead>
      <tbody>
        {pins.map((row, i) => {
          const isFirstOfGroup = i === 0 || pins[i - 1].fungsi !== row.fungsi;
          const groupSize = pins.filter((r) => r.fungsi === row.fungsi).length;
          return (
            <tr key={`${row.fungsi}-${row.pin}-${i}`}>
              {isFirstOfGroup && <td rowSpan={groupSize}>{row.fungsi}</td>}
              <td>{row.pin}</td>
              <td>{row.gpio}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function Wiring() {
  const [board, setBoard] = useBoardChoice();
  const pins = board === "supermini" ? wiringPinsSuperMini : wiringPinsN16R8;
  const branch = board === "supermini" ? "esp32/supermini-zora" : "esp32/n16r8-zora";
  const boardLabel = board === "supermini" ? "SuperMini" : "DevKit N16R8";

  return (
    <div className={styles.page}>
      <h1>Wiring — {boardLabel}</h1>
      <p className={styles.intro}>
        Pin yang dipakai Zora Mini — tiap board ESP32-S3 punya pemetaan GPIO sendiri. Pilih board
        kamu, lalu sambungkan persis sesuai tabel di bawah sebelum nyalain board-nya.
      </p>

      <BoardPicker board={board} onChange={setBoard} />

      <div className={styles.photoRow}>
        <figure>
          <img src={zoraWiringAmp} alt="Close-up board ampli MAX98357A yang dikabel di dalam shell yeti" />
          <figcaption>Ampli MAX98357A terpasang di dalam shell</figcaption>
        </figure>
        <figure>
          <img src={zoraWiringOpen} alt="Shell yeti terbuka, memperlihatkan port USB-C dan kabel di dalamnya" />
          <figcaption>Shell terbuka — port USB-C dan jalur kabel</figcaption>
        </figure>
      </div>

      <PinTable pins={pins} />

      <p className={styles.note}>
        Sumber pin:{" "}
        <a
          href={`https://github.com/h-yusuf/zora-mini-esp32/blob/${branch}/main/boards/bread-compact-wifi/config.h`}
          target="_blank"
          rel="noreferrer"
        >
          main/boards/bread-compact-wifi/config.h
        </a>{" "}
        di branch <code>{branch}</code>.
      </p>
    </div>
  );
}
