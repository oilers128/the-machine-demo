/**
 * API Client Utility
 * Handles all HTTP requests to the FastAPI backend
 */

type EnvRecord = Record<string, string | boolean | undefined>

const envRecord = import.meta.env as EnvRecord
const modeSuffix = import.meta.env.MODE === 'production' ? '_PROD' : '_DEV'

const resolveEnvValue = (baseKey: string): string | undefined => {
  const modeSpecificKey = `${baseKey}${modeSuffix}`
  const modeSpecificValue = envRecord[modeSpecificKey]
  if (typeof modeSpecificValue === 'string' && modeSpecificValue.trim()) {
    return modeSpecificValue.trim()
  }

  const baseValue = envRecord[baseKey]
  if (typeof baseValue === 'string' && baseValue.trim()) {
    return baseValue.trim()
  }

  return undefined
}

const resolveApiBaseUrl = (): string => {
  const rawValue = resolveEnvValue('VITE_API_BASE_URL')

  if (!rawValue) {
    // For demo purposes, use a fallback URL (API calls will fail gracefully if backend doesn't exist)
    const fallback = import.meta.env.DEV ? 'http://localhost:8000' : '/api'
    
    if (import.meta.env.DEV) {
      console.warn(
        [
          'VITE_API_BASE_URL is not defined. Falling back to development default:',
          fallback,
          'Set VITE_API_BASE_URL (or VITE_API_BASE_URL_DEV / VITE_API_BASE_URL_PROD) in your environment configuration.',
        ].join(' '),
      )
    }
    
    return fallback
  }

  return rawValue.replace(/\/+$/, '')
}

export const API_BASE_URL = resolveApiBaseUrl()

export interface ApiError {
  detail: string
  message?: string
}

/**
 * Generic API request function with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_BASE_URL}${normalizedEndpoint}`
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      
      try {
        const errorData: ApiError = await response.json()
        errorMessage = errorData.detail || errorData.message || errorMessage
      } catch {
        // If response isn't JSON, use status text
        errorMessage = response.statusText || errorMessage
      }

      throw new Error(errorMessage)
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred')
  }
}

/**
 * Upload file with FormData
 */
async function apiUpload<T>(
  endpoint: string,
  file: File,
  additionalData?: Record<string, string>
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_BASE_URL}${normalizedEndpoint}`
  
  const formData = new FormData()
  formData.append('file', file)
  
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary
    })

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      
      try {
        const errorData: ApiError = await response.json()
        errorMessage = errorData.detail || errorData.message || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }

      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred during file upload')
  }
}

/**
 * Download file as blob
 */
async function apiDownload(endpoint: string): Promise<Blob> {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_BASE_URL}${normalizedEndpoint}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      
      try {
        const errorData: ApiError = await response.json()
        errorMessage = errorData.detail || errorData.message || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }

      throw new Error(errorMessage)
    }

    return await response.blob()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred during file download')
  }
}

export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, data?: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
  upload: <T>(endpoint: string, file: File, additionalData?: Record<string, string>) =>
    apiUpload<T>(endpoint, file, additionalData),
  download: (endpoint: string) => apiDownload(endpoint),
}

