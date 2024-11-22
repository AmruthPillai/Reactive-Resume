/// <reference types='vitest' />

import { lingui } from "@lingui/vite-plugin";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    cacheDir: "../../node_modules/.vite/client",

    build: {
      sourcemap: true,
      emptyOutDir: true,
    },

    define: {
      appVersion: JSON.stringify(process.env.npm_package_version),
      VITE_NOCODB_TOKEN: JSON.stringify(process.env.VITE_NOCODB_TOKEN),
      VITE_JOB_TABLE: JSON.stringify(process.env.VITE_JOB_TABLE),
      VITE_JOB_VIEW_1: JSON.stringify(process.env.VITE_JOB_VIEW_1),
      // "process.env": env,
    },

    server: {
      host: true,
      port: 5173,
      fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
    },

    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".po": "text",
        },
      },
    },

    plugins: [
      react({
        babel: {
          plugins: ["macros"],
        },
      }),
      // EnvironmentPlugin("all"),
      lingui(),
      nxViteTsPaths(),
    ],

    worker: {
      plugins: () => [nxViteTsPaths()],
    },

    test: {
      globals: true,
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },

    resolve: {
      alias: {
        "@/client/": `${searchForWorkspaceRoot(process.cwd())}/apps/client/src/`,
      },
    },
  };
});
