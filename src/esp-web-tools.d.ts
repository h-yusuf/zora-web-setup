// esp-web-tools ships no type declarations for its deep import.
declare module "esp-web-tools/dist/web/install-button.js";

// esp-web-tools registers <esp-web-install-button> as a custom element; this
// tells TypeScript/JSX its shape so FlashButton.tsx can render it directly.
declare namespace JSX {
  interface IntrinsicElements {
    "esp-web-install-button": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & { manifest: string },
      HTMLElement
    >;
  }
}
