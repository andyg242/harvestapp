declare namespace NodeJS {
    export interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      AZURE_AD_CLIENT_SECRET: string;
      AZURE_AD_CLIENT_ID: string;
    }
  }