import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./Layout";

test("renders nav links and upstream attribution", () => {
  render(
    <MemoryRouter>
      <Layout>
        <p>content</p>
      </Layout>
    </MemoryRouter>
  );
  expect(screen.getByRole("link", { name: /wiring/i })).toHaveAttribute("href", "/docs/wiring");
  expect(screen.getByRole("link", { name: /xiaozhi-esp32/i })).toHaveAttribute(
    "href",
    "https://github.com/78/xiaozhi-esp32"
  );
  expect(screen.getByText("content")).toBeInTheDocument();
});
