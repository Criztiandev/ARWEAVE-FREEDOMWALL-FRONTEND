/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_DEVELOPEMENT_BACKEND_API: string;
  readonly VITE_PRODUCTION_BACKEND_API: string;
  readonly VITE_BACKEND_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
