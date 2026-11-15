import { render, screen, fireEvent } from "@testing-library/react";
import { Flash } from "./Flash";

beforeEach(() => {
  sessionStorage.clear();
});

test("renders flashing guide, browser caveat, BOOT instruction, and FAQ", () => {
  render(<Flash />);
  expect(screen.getByRole("heading", { name: /flash firmware/i })).toBeInTheDocument();
  expect(screen.getByText(/chrome|edge/i)).toBeInTheDocument();
  expect(screen.getByText(/boot/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /faq|pertanyaan/i })).toBeInTheDocument();
});

test("replaces the flash button with a build-from-source note when N16R8 is picked", () => {
  render(<Flash />);
  fireEvent.click(screen.getByRole("tab", { name: /n16r8/i }));
  expect(screen.getByText(/belum nutup devkit n16r8/i)).toBeInTheDocument();
  expect(document.querySelector("esp-web-install-button")).toBeNull();
});
