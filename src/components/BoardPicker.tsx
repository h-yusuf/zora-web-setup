import type { Board } from "../hooks/useBoardChoice";
import styles from "./BoardPicker.module.css";

const boards: { id: Board; label: string }[] = [
  { id: "supermini", label: "SuperMini" },
  { id: "n16r8", label: "DevKit N16R8" },
];

export function BoardPicker({
  board,
  onChange,
}: {
  board: Board;
  onChange: (board: Board) => void;
}) {
  return (
    <div className={styles.picker} role="tablist" aria-label="Pilih board ESP32-S3">
      {boards.map((b) => (
        <button
          key={b.id}
          type="button"
          role="tab"
          aria-selected={board === b.id}
          className={board === b.id ? styles.active : styles.tab}
          onClick={() => onChange(b.id)}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
