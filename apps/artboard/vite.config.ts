/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

export default defineConfig({
  base: "/artboard/",

  cacheDir: "../../node_modules/.vite/artboard",

  build: {
    sourcemap: true,
    emptyOutDir: true,
  },

  server: {
    host: true,
    port: 6173,
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    chunkSplitPlugin({
      strategy: "unbundle",
    }),
  ],

  resolve: {
    alias: {
      "@/artboard/": `${searchForWorkspaceRoot(process.cwd())}/apps/artboard/src/`,
    },
  },
});
