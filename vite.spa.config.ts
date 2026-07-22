import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// SPA build config for static hosting (Netlify / Vercel)
// This bypasses @tanstack/react-start SSR and produces a
// fully self-contained dist/ folder with index.html + assets.
export default defineConfig({
  root: ".",
  plugins: [viteReact(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist/spa",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
});
