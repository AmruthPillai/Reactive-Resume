/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/hooks",

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
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
