// Ambient type declaration for Google Tag Manager's dataLayer.
// This prevents TypeScript errors when accessing window.dataLayer.

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export {};
