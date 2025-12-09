/**
 * Custom hook for Route Distance Calculator
 * Manages state and API interactions
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  uploadRouteFile,
  processRouteEnrichment,
  getTaskStatus,
  downloadEnrichedFile,
  type UploadResponse,
  type ProcessRequest,
  type TaskStatus,
} from '../api/routeDistance'
import type { FieldMapping } from '../types/routeDistance'

export type { FieldMapping }

type Step = 'upload' | 'mapping' | 'processing' | 'complete' | 'error'

interface UseRouteDistanceReturn {
  // State
  step: Step
  file: File | null
  uploadData: UploadResponse | null
  fieldMapping: FieldMapping
  taskId: string | null
  taskStatus: TaskStatus | null
  error: string | null
  
  // Actions
  handleFileUpload: (file: File) => Promise<void>
  updateFieldMapping: (mapping: Partial<FieldMapping>) => void
  startProcessing: () => Promise<void>
  downloadResult: () => Promise<void>
  reset: () => void
  clearError: () => void
  
  // Computed
  canProcess: boolean
  isProcessing: boolean
  progress: number
  progressMessage: string
}

const POLL_INTERVAL = 2000 // Poll every 2 seconds

export function useRouteDistance(): UseRouteDistanceReturn {
  const [step, setStep] = useState<Step>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [uploadData, setUploadData] = useState<UploadResponse | null>(null)
  const [fieldMapping, setFieldMapping] = useState<FieldMapping>({})
  const [taskId, setTaskId] = useState<string | null>(null)
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const pollingIntervalRef = useRef<number | null>(null)

  // Poll for task status when processing
  useEffect(() => {
    if (step === 'processing' && taskId) {
      const poll = async () => {
        try {
          const status = await getTaskStatus(taskId)
          setTaskStatus(status)

          if (status.state === 'SUCCESS') {
            setStep('complete')
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current)
              pollingIntervalRef.current = null
            }
          } else if (status.state === 'FAILURE') {
            setStep('error')
            setError(status.message || 'Processing failed')
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current)
              pollingIntervalRef.current = null
            }
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to check task status')
          setStep('error')
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
          }
        }
      }

      // Poll immediately, then at intervals
      poll()
      pollingIntervalRef.current = window.setInterval(poll, POLL_INTERVAL)
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
        pollingIntervalRef.current = null
      }
    }
  }, [step, taskId])

  const handleFileUpload = useCallback(async (uploadedFile: File) => {
    setError(null)
    setFile(uploadedFile)

    try {
      const data = await uploadRouteFile(uploadedFile)
      setUploadData(data)
      
      // Auto-populate field mappings from suggestions
      if (data.field_suggestions) {
        setFieldMapping({
          source_3dz: data.field_suggestions.source_3dz,
          source_5dz: data.field_suggestions.source_5dz,
          source_country: data.field_suggestions.source_country,
          dest_3dz: data.field_suggestions.dest_3dz,
          dest_5dz: data.field_suggestions.dest_5dz,
          dest_country: data.field_suggestions.dest_country,
        })
      }
      
      setStep('mapping')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file')
      setFile(null)
    }
  }, [])

  const updateFieldMapping = useCallback((mapping: Partial<FieldMapping>) => {
    setFieldMapping((prev) => ({ ...prev, ...mapping }))
  }, [])

  const startProcessing = useCallback(async () => {
    if (!uploadData) {
      setError('No file uploaded')
      return
    }

    setError(null)
    setStep('processing')

    try {
      const request: ProcessRequest = {
        filename: uploadData.filename,
        ...fieldMapping,
      }

      const response = await processRouteEnrichment(request)
      setTaskId(response.task_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start processing')
      setStep('mapping')
    }
  }, [uploadData, fieldMapping])

  const downloadResult = useCallback(async () => {
    if (!taskStatus?.result?.filename) {
      setError('No result file available')
      return
    }

    try {
      await downloadEnrichedFile(taskStatus.result.filename)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download file')
    }
  }, [taskStatus])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setStep('upload')
    setFile(null)
    setUploadData(null)
    setFieldMapping({})
    setTaskId(null)
    setTaskStatus(null)
    setError(null)
    
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
    }
  }, [])

  // Computed values
  const canProcess = Boolean(
    uploadData &&
    (fieldMapping.source_3dz || fieldMapping.source_5dz) &&
    (fieldMapping.dest_3dz || fieldMapping.dest_5dz) &&
    fieldMapping.source_country &&
    fieldMapping.dest_country
  )

  const isProcessing = step === 'processing'
  const progress = taskStatus?.percent ?? 0
  const progressMessage = taskStatus?.message ?? ''

  return {
    step,
    file,
    uploadData,
    fieldMapping,
    taskId,
    taskStatus,
    error,
    handleFileUpload,
    updateFieldMapping,
    startProcessing,
    downloadResult,
    reset,
    clearError,
    canProcess,
    isProcessing,
    progress,
    progressMessage,
  }
}

