import { render, screen, fireEvent } from "@testing-library/react";
import { Diy } from "./Diy";

beforeEach(() => {
  sessionStorage.clear();
});

test("renders BOM table and a real MakerWorld print-source link", () => {
  render(<Diy />);
  expect(
    screen.getByRole("link", { name: /compagnon 3\.09/i })
  ).toHaveAttribute("href", expect.stringContaining("makerworld.com"));
  expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
});

test("shows a no-N16R8-dimensions note only when DevKit N16R8 is picked", () => {
  render(<Diy />);
  expect(screen.queryByText(/belum ada dimensi/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("tab", { name: /n16r8/i }));
  expect(screen.getByText(/belum ada dimensi/i)).toBeInTheDocument();
});
