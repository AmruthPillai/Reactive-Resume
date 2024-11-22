/// <reference types="vite/client" />

declare const appVersion: string;
declare const nocodbToken: string;
declare const jobTable: string;
declare const jobView1: string;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// declare const process;
