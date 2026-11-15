import { wiringPins } from "../../content/wiring";
import styles from "./Docs.module.css";

export function Wiring() {
  return (
    <div className={styles.page}>
      <h1>Wiring — SuperMini</h1>
      <p className={styles.intro}>
        Pin yang dipakai Zora Mini di board ESP32-S3 SuperMini — header board ini cuma
        ngeluarin GPIO0-13, jadi semua pin di bawah sengaja dipilih dalam rentang itu. Sambungkan
        persis sesuai tabel ini sebelum nyalain board-nya.
      </p>
      <table>
        <thead>
          <tr>
            <th>Fungsi</th>
            <th>Pin modul</th>
            <th>GPIO</th>
          </tr>
        </thead>
        <tbody>
          {wiringPins.map((row, i) => {
            const isFirstOfGroup = i === 0 || wiringPins[i - 1].fungsi !== row.fungsi;
            const groupSize = wiringPins.filter((r) => r.fungsi === row.fungsi).length;
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
      <p className={styles.note}>
        Sumber pin:{" "}
        <a
          href="https://github.com/h-yusuf/zora-mini-esp32/blob/esp32/supermini-zora/main/boards/bread-compact-wifi/config.h"
          target="_blank"
          rel="noreferrer"
        >
          main/boards/bread-compact-wifi/config.h
        </a>{" "}
        di branch <code>esp32/supermini-zora</code>.
      </p>
    </div>
  );
}
