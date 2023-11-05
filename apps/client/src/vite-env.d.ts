/// <reference types="vite/client" />

declare const appVersion: string;

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
