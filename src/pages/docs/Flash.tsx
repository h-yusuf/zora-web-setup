import { FlashButton } from "../../components/FlashButton";
import styles from "./Docs.module.css";

export function Flash() {
  return (
    <div className={styles.page}>
      <h1>Flash Firmware</h1>
      <p className={styles.intro}>
        Dua cara: pakai tombol di bawah langsung dari browser (paling gampang), atau checkout
        branch <code>esp32/supermini-zora</code> dan build sendiri pakai ESP-IDF kalau mau ubah
        kodenya duluan.
      </p>

      <div className={styles.placeholder}>
        <p>Sebelum mulai</p>
        <ul>
          <li>Pakai Chrome atau Edge — browser lain belum dukung WebSerial.</li>
          <li>Harus lewat HTTPS atau localhost, bukan HTTP biasa.</li>
          <li>Sambungkan board via kabel data USB-C (bukan kabel charge-only).</li>
          <li>
            Kalau ini flash pertama kali, tahan tombol <strong>BOOT</strong> pas nyolokin USB,
            lepas begitu board kedetect di dialog port serial.
          </li>
        </ul>
      </div>

      <FlashButton />

      <h2 className={styles.faqHeading}>FAQ</h2>
      <dl>
        <dt>
          <strong>Flashing gagal / macet di tengah?</strong>
        </dt>
        <dd>
          Cek kabel USB (pakai kabel data, bukan charge-only), ulangi dari awal sambil menahan
          tombol fisiknya seperti di langkah sebelumnya, atau coba lagi dengan baud rate lebih
          rendah kalau opsinya muncul.
        </dd>
        <dt>
          <strong>Port serial-nya nggak muncul di dialog browser?</strong>
        </dt>
        <dd>
          Kemungkinan driver USB-to-serial (CP210x/CH340) belum terinstall di OS kamu, atau
          kabelnya cuma buat ngecas (nggak ada jalur data). Ganti kabel dan install driver yang
          sesuai chip USB-serial di board SuperMini kamu.
        </dd>
        <dt>
          <strong>Browser-nya nolak / tombolnya nggak bisa diklik?</strong>
        </dt>
        <dd>
          WebSerial cuma didukung dua browser itu, lewat HTTPS atau localhost. Firefox dan Safari
          belum dukung API ini.
        </dd>
      </dl>
    </div>
  );
}
