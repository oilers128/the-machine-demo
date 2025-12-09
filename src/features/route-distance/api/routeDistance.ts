/**
 * Route Distance Calculator API Service
 * Type-safe API client for route distance endpoints
 */

import { api, API_BASE_URL } from '@shared/api/client'

export interface UploadResponse {
  filename: string
  columns: string[]
  field_suggestions: {
    source_3dz?: string
    source_5dz?: string
    source_country?: string
    dest_3dz?: string
    dest_5dz?: string
    dest_country?: string
  }
  message: string
}

export interface ProcessRequest {
  filename: string
  source_3dz?: string
  source_5dz?: string
  source_country?: string
  dest_3dz?: string
  dest_5dz?: string
  dest_country?: string
}

export interface ProcessResponse {
  task_id: string
  message: string
}

export interface RouteIssue {
  origin: string
  destination: string
  reason: string
}

export interface TaskStatus {
  state: 'PROCESSING' | 'SUCCESS' | 'FAILURE'
  status: 'processing' | 'completed' | 'failed'
  message: string
  percent: number
  result?: {
    filename: string
    stats: {
      total_rows: number
      from_cache: number
      from_api: number
      api_failed: number
      missing: number
      unique_routes: number
      db_found?: number
      db_errors?: number
      db_missing?: number
      known_bad_routes?: RouteIssue[]
      missing_routes?: RouteIssue[]
    }
    failed_routes?: RouteIssue[]
  }
}

/**
 * Upload a CSV/Excel file for route distance calculation
 */
export async function uploadRouteFile(file: File): Promise<UploadResponse> {
  return api.upload<UploadResponse>('/api/route-distance/upload', file)
}

/**
 * Start processing the uploaded file with field mappings
 */
export async function processRouteEnrichment(
  request: ProcessRequest
): Promise<ProcessResponse> {
  // Convert to FormData for multipart/form-data
  const formData = new FormData()
  Object.entries(request).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value)
    }
  })

  const response = await fetch(`${API_BASE_URL}/api/route-distance/process`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`
    try {
      const errorData = await response.json()
      errorMessage = errorData.detail || errorData.message || errorMessage
    } catch {
      errorMessage = response.statusText || errorMessage
    }
    throw new Error(errorMessage)
  }

  return await response.json()
}

/**
 * Get the current status of a processing task
 */
export async function getTaskStatus(taskId: string): Promise<TaskStatus> {
  return api.get<TaskStatus>(`/api/route-distance/task-status/${taskId}`)
}

/**
 * Download the enriched result file
 */
export async function downloadEnrichedFile(filename: string): Promise<void> {
  const blob = await api.download(`/api/route-distance/download/${filename}`)
  
  // Create download link and trigger download
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export async function retryAzureFailuresOnce(routes: Array<{ origin: string; destination: string; reason?: string }>): Promise<{
  updated: number
  successes: number
  failures: number
}> {
  return api.post('/api/route-distance/retry', { routes })
}


