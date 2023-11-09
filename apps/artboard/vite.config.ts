/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, searchForWorkspaceRoot, splitVendorChunkPlugin } from "vite";

export default defineConfig({
  base: "/artboard/",

  cacheDir: "../../node_modules/.vite/artboard",

  build: {
    sourcemap: true,
  },

  server: {
    host: true,
    port: +(process.env.__DEV__ARTBOARD_PORT ?? 6173),
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
  },

  plugins: [react(), nxViteTsPaths(), splitVendorChunkPlugin()],

  resolve: {
    alias: {
      "@/artboard/": `${searchForWorkspaceRoot(process.cwd())}/apps/artboard/src/`,
    },
  },
});
