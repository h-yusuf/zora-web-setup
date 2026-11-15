import { useState } from "react";

export type Board = "supermini" | "n16r8";

const KEY = "zora-board";

function readStored(): Board {
  try {
    return sessionStorage.getItem(KEY) === "n16r8" ? "n16r8" : "supermini";
  } catch {
    return "supermini";
  }
}

/** Shared board selection (SuperMini / DevKit N16R8), persisted per tab so it
 * carries over between /docs/wiring, /docs/diy and /docs/flash. */
export function useBoardChoice(): [Board, (board: Board) => void] {
  const [board, setBoardState] = useState<Board>(readStored);

  function setBoard(next: Board) {
    setBoardState(next);
    try {
      sessionStorage.setItem(KEY, next);
    } catch {
      // sessionStorage unavailable (private mode, etc.) — state still works in-memory.
    }
  }

  return [board, setBoard];
}
