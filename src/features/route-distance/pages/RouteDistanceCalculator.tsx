/**
 * Route Distance Calculator Page
 * Allows users to upload files, map fields, and calculate route distances
 */

import { useCallback, useRef, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  LinearProgress,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  CloudUpload,
  PlayArrow,
  CheckCircle,
  Download,
  Refresh,
  Info,
  Close,
} from '@mui/icons-material'
import { useRouteDistance } from '../hooks/useRouteDistance'
import { ErrorAlert } from '@shared/ui'
import type { RouteIssue } from '../api/routeDistance'
import type { FieldMapping } from '../types/routeDistance'

const steps = ['Upload File', 'Map Fields', 'Process', 'Complete']

export default function RouteDistanceCalculator() {
  const {
    step,
    uploadData,
    fieldMapping,
    taskStatus,
    error,
    handleFileUpload,
    updateFieldMapping,
    startProcessing,
    downloadResult,
    reset,
    clearError,
    canProcess,
    progress,
    progressMessage,
  } = useRouteDistance()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const knownBadRoutes = (
    taskStatus?.result?.stats?.known_bad_routes ??
    taskStatus?.result?.failed_routes ??
    []
  ) as RouteIssue[]
  const missingRoutes = (taskStatus?.result?.stats?.missing_routes ?? []) as RouteIssue[]

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      try {
        setIsUploading(true)
        await handleFileUpload(selectedFile)
      } finally {
        setIsUploading(false)
      }
    }
  }, [handleFileUpload])

  const handleDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault()
      const droppedFile = event.dataTransfer.files?.[0]
      if (droppedFile) {
        try {
          setIsUploading(true)
          await handleFileUpload(droppedFile)
        } finally {
          setIsUploading(false)
        }
      }
    },
    [handleFileUpload]
  )

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
  }, [])

  const renderFieldRow = (
    label: string,
    key: keyof FieldMapping,
    exclusions: Array<string | undefined>,
    isRequired = false
  ) => {
    const selectedElsewhere = new Set(exclusions.filter(Boolean) as string[])
    const value = fieldMapping[key] ?? ''

    return (
      <Stack spacing={1} key={String(key)}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          flexWrap="wrap"
          sx={{ width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minWidth: { sm: 200 },
              flex: { sm: '0 0 auto' },
            }}
          >
            <CheckCircle
              fontSize="small"
              sx={{ color: 'success.main', visibility: fieldMapping[key] ? 'visible' : 'hidden' }}
            />
            <Typography color="text.secondary">{label}</Typography>
          </Box>
          <FormControl
            required={isRequired}
            sx={{ width: { xs: '100%', sm: 220 }, flex: { sm: '0 0 auto' } }}
          >
            <Select
              value={(value as string) || ''}
              displayEmpty
              renderValue={(selected) => (selected ? String(selected) : '')}
              onChange={(e) =>
                updateFieldMapping({
                  [key]: (e.target.value as string) || undefined,
                } as Partial<FieldMapping>)
              }
              required={isRequired}
            >
              <MenuItem value="">
                <Close fontSize="small" sx={{ color: 'text.disabled' }} />
              </MenuItem>
              {uploadData?.columns.map((col) => {
                const disabled = selectedElsewhere.has(col)
                return (
                  <MenuItem
                    key={col}
                    value={col}
                    disabled={disabled}
                    sx={disabled ? { color: 'text.disabled' } : undefined}
                  >
                    {col}
                    {disabled ? ' (in use)' : ''}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    )
  }

  const getActiveStep = () => {
    switch (step) {
      case 'upload':
        return 0
      case 'mapping':
        return 1
      case 'processing':
        return 2
      case 'complete':
        return 3
      case 'error':
        return 1 // Return to mapping on error
      default:
        return 0
    }
  }

  // Removed database navigation; errors are shown on the completion page

  return (
    <Box>
      <Stepper activeStep={getActiveStep()} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <ErrorAlert 
          message={error} 
          onClose={clearError} 
          sx={{ mb: 2 }}
        />
      )}

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <Paper sx={{ p: 4, mt: 2 }}>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover',
              },
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Upload File
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Drag and drop a CSV or Excel file here, or click to browse
            </Typography>
            <Button variant="contained" component="span" sx={{ mt: 2 }} disabled={isUploading}>
              {isUploading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'inherit' }} /> Uploading...
                </>
              ) : (
                'Select File'
              )}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </Box>
        </Paper>
      )}

      {/* Step 2: Field Mapping */}
      {step === 'mapping' && uploadData && (
        <Paper sx={{ p: 4, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Map Fields
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Confirm the auto-detected mappings.
          </Typography>

          <Stack spacing={3} sx={{ mt: 3 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Origin Fields
              </Typography>
              <Stack spacing={3}>
                {renderFieldRow('Origin 3DZ', 'source_3dz', [
                  fieldMapping.source_5dz,
                  fieldMapping.source_country,
                  fieldMapping.dest_3dz,
                  fieldMapping.dest_5dz,
                  fieldMapping.dest_country,
                ])}
                {renderFieldRow('Origin 5DZ', 'source_5dz', [
                  fieldMapping.source_3dz,
                  fieldMapping.source_country,
                  fieldMapping.dest_3dz,
                  fieldMapping.dest_5dz,
                  fieldMapping.dest_country,
                ])}
                {renderFieldRow('Origin Country', 'source_country', [
                  fieldMapping.source_3dz,
                  fieldMapping.source_5dz,
                  fieldMapping.dest_3dz,
                  fieldMapping.dest_5dz,
                  fieldMapping.dest_country,
                ], true)}
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Destination Fields
              </Typography>
              <Stack spacing={3}>
                {renderFieldRow('Destination 3DZ', 'dest_3dz', [
                  fieldMapping.source_3dz,
                  fieldMapping.source_5dz,
                  fieldMapping.source_country,
                  fieldMapping.dest_5dz,
                  fieldMapping.dest_country,
                ])}
                {renderFieldRow('Destination 5DZ', 'dest_5dz', [
                  fieldMapping.source_3dz,
                  fieldMapping.source_5dz,
                  fieldMapping.source_country,
                  fieldMapping.dest_3dz,
                  fieldMapping.dest_country,
                ])}
                {renderFieldRow('Destination Country', 'dest_country', [
                  fieldMapping.source_3dz,
                  fieldMapping.source_5dz,
                  fieldMapping.source_country,
                  fieldMapping.dest_3dz,
                  fieldMapping.dest_5dz,
                ], true)}
              </Stack>
            </Box>

            <Alert severity="info" icon={<Info />} sx={{ mt: 2 }}>
              <Typography variant="body2">
                Required: Country and at least one ZIP field.
              </Typography>
            </Alert>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button variant="outlined" onClick={reset}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={startProcessing}
                disabled={!canProcess}
                startIcon={<PlayArrow />}
              >
                Start Processing
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}

      {/* Step 3: Processing */}
      {step === 'processing' && (
        <Paper sx={{ p: 4, mt: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={56} thickness={5} sx={{ color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Calculating Distances
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {progressMessage || 'Processing your file...'}
            </Typography>
            <Box sx={{ mt: 3, mb: 2 }}>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {progress}% complete
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Step 4: Complete */}
      {step === 'complete' && taskStatus?.result && (
        <Paper sx={{ p: 4, mt: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Processing Complete!
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your file has been enriched with route distances.
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Stack
              direction="row"
              spacing={4}
              flexWrap="wrap"
              justifyContent="center"
              alignItems="stretch"
            >
              <Box sx={{ textAlign: 'center', minWidth: 160 }}>
                <Typography variant="subtitle1" color="text.secondary">Total Rows</Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
                  {taskStatus.result.stats.total_rows.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 160 }}>
                <Typography variant="subtitle1" color="text.secondary">From Database</Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
                  {taskStatus.result.stats.from_cache.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 160 }}>
                <Typography variant="subtitle1" color="text.secondary">From Azure</Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
                  {taskStatus.result.stats.from_api.toLocaleString()}
                </Typography>
              </Box>
              {knownBadRoutes.length > 0 && (
                <Box sx={{ textAlign: 'center', minWidth: 160 }}>
                  <Typography variant="subtitle1" color="text.secondary">Known Bad Routes</Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: 'error.main' }}>
                    {knownBadRoutes.length.toLocaleString()}
                  </Typography>
                </Box>
              )}
              {taskStatus.result.stats.missing > 0 && (
                <Box sx={{ textAlign: 'center', minWidth: 160 }}>
                  <Typography variant="subtitle1" color="text.secondary">Not Processed</Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: 'error.main' }}>
                    {taskStatus.result.stats.missing.toLocaleString()}
                  </Typography>
                </Box>
              )}
              {taskStatus.result.stats.api_failed > 0 && (
                <Box sx={{ textAlign: 'center', minWidth: 160 }}>
                  <Typography variant="subtitle1" color="text.secondary">Azure Failed</Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: 'error.main' }}>
                    {taskStatus.result.stats.api_failed.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Stack>

            <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
              <Button variant="contained" onClick={downloadResult} startIcon={<Download />}>Download Enriched File</Button>
              <Button variant="outlined" onClick={reset} startIcon={<Refresh />}>Process Another File</Button>
            </Box>

            {taskStatus.result.failed_routes && taskStatus.result.failed_routes.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  {taskStatus.result.failed_routes.length} routes could not be calculated:
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Origin</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Destination</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Reason</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {taskStatus.result.failed_routes.map((route, idx) => (
                        <TableRow key={idx} hover>
                          <TableCell>{route.origin}</TableCell>
                          <TableCell>{route.destination}</TableCell>
                          <TableCell>{route.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {missingRoutes.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  {missingRoutes.length} routes not processed:
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Origin</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Destination</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Reason</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {missingRoutes.map((route, idx) => (
                        <TableRow key={idx} hover>
                          <TableCell>{route.origin}</TableCell>
                          <TableCell>{route.destination}</TableCell>
                          <TableCell>{route.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {knownBadRoutes.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  {knownBadRoutes.length} known bad routes:
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Origin</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Destination</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Reason</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {knownBadRoutes.map((route: RouteIssue, idx: number) => (
                        <TableRow key={idx} hover>
                          <TableCell>{route.origin}</TableCell>
                          <TableCell>{route.destination}</TableCell>
                          <TableCell>{route.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </Paper>
      )}

      {/* Error State */}
      {step === 'error' && (
        <Paper sx={{ p: 4, mt: 2 }}>
          <Alert severity="error">
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Processing Failed
            </Typography>
            <Typography variant="body2">{error || 'An unknown error occurred'}</Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={reset}>
                Start Over
              </Button>
              <Button variant="contained" onClick={() => updateFieldMapping({})}>
                Try Again
              </Button>
            </Box>
          </Alert>
        </Paper>
      )}
    </Box>
  )
}

