import { render, screen, fireEvent } from "@testing-library/react";
import { Wiring } from "./Wiring";

beforeEach(() => {
  sessionStorage.clear();
});

test("renders a table row for every wiring pin entry, defaulting to SuperMini", () => {
  render(<Wiring />);
  expect(screen.getByRole("heading", { name: /wiring/i })).toBeInTheDocument();
  expect(screen.getByText("GPIO4")).toBeInTheDocument();
  expect(screen.getByText("Mic INMP441")).toBeInTheDocument();
  // SuperMini's amp BCLK pin (GPIO10) differs from N16R8's (GPIO15).
  expect(screen.getByText("GPIO10")).toBeInTheDocument();
});

test("switches the pin table when DevKit N16R8 is picked", () => {
  render(<Wiring />);
  fireEvent.click(screen.getByRole("tab", { name: /n16r8/i }));
  expect(screen.getByRole("heading", { name: /n16r8/i })).toBeInTheDocument();
  expect(screen.getByText("GPIO15")).toBeInTheDocument();
  expect(screen.queryByText("GPIO10")).not.toBeInTheDocument();
});
