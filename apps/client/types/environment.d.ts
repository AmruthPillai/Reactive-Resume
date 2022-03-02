declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TZ: string;
      ANALYZE?: boolean;
      NODE_ENV: 'development' | 'production';

      // Public Environment Variables
      NEXT_PUBLIC_APP_VERSION?: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID?: string;
    }
  }
}

export {};
