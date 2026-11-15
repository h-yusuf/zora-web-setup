import { render, screen } from "@testing-library/react";
import { Diy } from "./Diy";

test("renders BOM table and a not-ready placeholder for STL files", () => {
  render(<Diy />);
  expect(screen.getByText(/belum tersedia|segera hadir/i)).toBeInTheDocument();
  expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
});
