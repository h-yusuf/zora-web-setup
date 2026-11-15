import { render, screen, fireEvent } from "@testing-library/react";
import { BoardPicker } from "./BoardPicker";

test("marks the active board and calls onChange when the other tab is clicked", () => {
  const onChange = vi.fn();
  render(<BoardPicker board="supermini" onChange={onChange} />);

  expect(screen.getByRole("tab", { name: "SuperMini" })).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tab", { name: /n16r8/i })).toHaveAttribute("aria-selected", "false");

  fireEvent.click(screen.getByRole("tab", { name: /n16r8/i }));
  expect(onChange).toHaveBeenCalledWith("n16r8");
});
