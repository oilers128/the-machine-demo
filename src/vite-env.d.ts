/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_API_BASE_URL_DEV?: string
  readonly VITE_API_BASE_URL_PROD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Declare image imports
declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.jpeg' {
  const value: string
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}


