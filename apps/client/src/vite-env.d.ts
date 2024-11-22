/// <reference types="vite/client" />

declare const appVersion: string;
declare const VITE_NOCODB_TOKEN: string;
declare const VITE_JOB_TABLE: string;
declare const VITE_JOB_VIEW_1: string;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// declare const process;
