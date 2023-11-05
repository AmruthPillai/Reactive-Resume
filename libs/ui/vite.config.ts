/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig, searchForWorkspaceRoot, splitVendorChunkPlugin } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/ui",

  server: {
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    splitVendorChunkPlugin(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
    }),
  ],

  build: {
    lib: {
      entry: "src/index.ts",
      name: "ui",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [/^react.*/, /^@radix-ui\/*/],
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    cache: { dir: "../../node_modules/.vitest" },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
