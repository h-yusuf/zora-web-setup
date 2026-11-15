import { render, screen } from "@testing-library/react";
import { Wiring } from "./Wiring";

test("renders a table row for every wiring pin entry", () => {
  render(<Wiring />);
  expect(screen.getByRole("heading", { name: /wiring/i })).toBeInTheDocument();
  expect(screen.getByText("GPIO4")).toBeInTheDocument();
  expect(screen.getByText("Mic INMP441")).toBeInTheDocument();
});
