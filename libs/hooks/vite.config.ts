/// <reference types='vitest' />

import path from "node:path";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/hooks",

  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(import.meta.dirname, "tsconfig.lib.json"),
    }),
  ],

  build: {
    emptyOutDir: true,
    lib: {
      entry: "src/index.ts",
      name: "hooks",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [/^react.*/, "react-hook-form", "use-breakpoint", "usehooks-ts"],
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
