import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Landing } from "./Landing";

test("renders hero heading, placeholder media, and CTA into docs", () => {
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { name: /zora mini/i })).toBeInTheDocument();
  expect(screen.getByText(/video segera hadir|demo segera hadir/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /mulai bikin sendiri|lihat panduan/i })
  ).toHaveAttribute("href", "/docs/wiring");
});

test("renders the three doc entry points", () => {
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
  expect(screen.getByRole("link", { name: /lihat wiring/i })).toHaveAttribute(
    "href",
    "/docs/wiring"
  );
  expect(screen.getByRole("link", { name: /lihat 3d print/i })).toHaveAttribute(
    "href",
    "/docs/diy"
  );
  expect(screen.getByRole("link", { name: /lihat flash firmware/i })).toHaveAttribute(
    "href",
    "/docs/flash"
  );
});
