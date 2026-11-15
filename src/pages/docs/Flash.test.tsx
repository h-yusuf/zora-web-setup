import { render, screen } from "@testing-library/react";
import { Flash } from "./Flash";

test("renders flashing guide, browser caveat, BOOT instruction, and FAQ", () => {
  render(<Flash />);
  expect(screen.getByRole("heading", { name: /flash firmware/i })).toBeInTheDocument();
  expect(screen.getByText(/chrome|edge/i)).toBeInTheDocument();
  expect(screen.getByText(/boot/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /faq|pertanyaan/i })).toBeInTheDocument();
});
