declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TZ: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
