import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./Layout";

test("renders a menu with doc links and the upstream attribution", () => {
  render(
    <MemoryRouter>
      <Layout>
        <p>content</p>
      </Layout>
    </MemoryRouter>
  );

  // The doc links live inside a collapsed <details> "Menu" pill — open it first.
  fireEvent.click(screen.getByText("Menu"));

  expect(screen.getByRole("link", { name: /wiring/i })).toHaveAttribute("href", "/docs/wiring");
  expect(screen.getByRole("link", { name: /xiaozhi-esp32/i })).toHaveAttribute(
    "href",
    "https://github.com/78/xiaozhi-esp32"
  );
  expect(screen.getByText("content")).toBeInTheDocument();
});
