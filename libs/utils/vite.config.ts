import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { defineConfig } from "vite";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/utils",

  plugins: [nxViteTsPaths()],

  test: {
    globals: true,
    environment: "jsdom",
    include: [
      "src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "../../../../parser/src/pdf-resume/**/*.{test,spec}.{ts,tsx}",
    ],
  },
});
