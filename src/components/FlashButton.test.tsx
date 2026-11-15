import { render, screen, waitFor } from "@testing-library/react";
import { FlashButton } from "./FlashButton";

afterEach(() => {
  vi.restoreAllMocks();
});

test("shows a not-ready message when the manifest 404s", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
  render(<FlashButton />);
  await waitFor(() => expect(screen.getByText(/firmware belum tersedia/i)).toBeInTheDocument());
});

test("shows a not-ready message when the manifest has no builds", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ name: "Zora", builds: [] }) })
  );
  render(<FlashButton />);
  await waitFor(() => expect(screen.getByText(/firmware belum tersedia/i)).toBeInTheDocument());
});

test("renders the flash button when the manifest has a build", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        name: "Zora",
        builds: [{ chipFamily: "ESP32-S3", parts: [{ path: "firmware.bin", offset: 0 }] }],
      }),
    })
  );
  render(<FlashButton />);
  await waitFor(() => expect(document.querySelector("esp-web-install-button")).not.toBeNull());
});
