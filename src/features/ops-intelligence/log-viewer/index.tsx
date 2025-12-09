/**
 * Log Viewer
 * 
 * Full raw event stream for power users and AI processing
 * Pulls from message bus, WES status logs, WCS/PLC event logs
 * Features: time filters, order/tote/device search, subsystem filters, severity filters
 * Used for root cause analysis, debugging, and AI training data
 */
import { Box, Typography, Card, CardContent, TextField, Select, MenuItem, FormControl, InputLabel, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Container } from '@mui/material'
import { Description, Search, FilterList, Download } from '@mui/icons-material'
import { useState } from 'react'
import { iconColors } from '../../../theme/theme'

export default function LogViewer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [subsystemFilter, setSubsystemFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')

  const logs = [
    { timestamp: '2024-01-15 14:23:45.123', subsystem: 'WES', severity: 'info', orderId: 'ORD-12345', toteId: 'TOTE-001', deviceId: 'SH-001', message: 'Order ORD-12345 assigned to tote TOTE-001' },
    { timestamp: '2024-01-15 14:23:46.234', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-001', deviceId: 'SH-001', message: 'Tote TOTE-001 retrieved by shuttle SH-001' },
    { timestamp: '2024-01-15 14:23:47.345', subsystem: 'PLC', severity: 'warning', orderId: null, toteId: 'TOTE-001', deviceId: 'CV-001', message: 'Conveyor CV-001 queue length exceeded threshold (15 totes)' },
    { timestamp: '2024-01-15 14:23:48.456', subsystem: 'WES', severity: 'error', orderId: 'ORD-12346', toteId: 'TOTE-002', deviceId: null, message: 'Routing error: Tote TOTE-002 blocked at junction J-12' },
    { timestamp: '2024-01-15 14:23:49.567', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-003', deviceId: 'AMR-01', message: 'AMR-01 completed putaway task for tote TOTE-003' },
    { timestamp: '2024-01-15 14:23:50.678', subsystem: 'WES', severity: 'info', orderId: 'ORD-12347', toteId: null, deviceId: null, message: 'Order ORD-12347 completed and released for shipping' },
    { timestamp: '2024-01-15 14:23:51.789', subsystem: 'WES', severity: 'info', orderId: 'ORD-12348', toteId: 'TOTE-004', deviceId: 'SH-002', message: 'Order ORD-12348 assigned to tote TOTE-004' },
    { timestamp: '2024-01-15 14:23:52.890', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-004', deviceId: 'SH-002', message: 'Shuttle SH-002 moving tote TOTE-004 to picking zone' },
    { timestamp: '2024-01-15 14:23:53.901', subsystem: 'WES', severity: 'info', orderId: 'ORD-12349', toteId: 'TOTE-005', deviceId: 'SH-003', message: 'Order ORD-12349 assigned to tote TOTE-005' },
    { timestamp: '2024-01-15 14:23:54.012', subsystem: 'PLC', severity: 'warning', orderId: null, toteId: 'TOTE-005', deviceId: 'SH-003', message: 'Shuttle SH-003 cycle time elevated (4.2s vs target 2.5s)' },
    { timestamp: '2024-01-15 14:23:55.123', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-006', deviceId: 'AMR-03', message: 'AMR-03 started retrieval task for tote TOTE-006' },
    { timestamp: '2024-01-15 14:23:56.234', subsystem: 'WES', severity: 'info', orderId: 'ORD-12350', toteId: 'TOTE-007', deviceId: 'SH-004', message: 'Order ORD-12350 assigned to tote TOTE-007' },
    { timestamp: '2024-01-15 14:23:57.345', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-007', deviceId: 'SH-004', message: 'Shuttle SH-004 completed cycle for tote TOTE-007' },
    { timestamp: '2024-01-15 14:23:58.456', subsystem: 'WES', severity: 'error', orderId: 'ORD-12351', toteId: 'TOTE-008', deviceId: null, message: 'Short pick detected: SKU-12345 not found at location A-12-34' },
    { timestamp: '2024-01-15 14:23:59.567', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-009', deviceId: 'AMR-04', message: 'AMR-04 navigating to location B-23-45' },
    { timestamp: '2024-01-15 14:24:00.678', subsystem: 'WES', severity: 'info', orderId: 'ORD-12352', toteId: 'TOTE-010', deviceId: 'SH-005', message: 'Order ORD-12352 assigned to tote TOTE-010' },
    { timestamp: '2024-01-15 14:24:01.789', subsystem: 'PLC', severity: 'info', orderId: null, toteId: 'TOTE-010', deviceId: 'SH-005', message: 'Shuttle SH-005 utilization at 94%' },
    { timestamp: '2024-01-15 14:24:02.890', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-011', deviceId: 'ASRS-01', message: 'AS/RS ASRS-01 storing tote TOTE-011 in location C-34-56' },
    { timestamp: '2024-01-15 14:24:03.901', subsystem: 'WES', severity: 'info', orderId: 'ORD-12353', toteId: 'TOTE-012', deviceId: 'SH-006', message: 'Order ORD-12353 assigned to tote TOTE-012' },
    { timestamp: '2024-01-15 14:24:04.012', subsystem: 'WCS', severity: 'warning', orderId: null, toteId: 'TOTE-012', deviceId: 'SH-006', message: 'Shuttle SH-006 queue length at 4 (approaching threshold)' },
    { timestamp: '2024-01-15 14:24:05.123', subsystem: 'WES', severity: 'info', orderId: 'ORD-12354', toteId: 'TOTE-013', deviceId: 'AMR-05', message: 'Order ORD-12354 assigned to tote TOTE-013' },
    { timestamp: '2024-01-15 14:24:06.234', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-013', deviceId: 'AMR-05', message: 'AMR-05 completed pick task for tote TOTE-013' },
    { timestamp: '2024-01-15 14:24:07.345', subsystem: 'PLC', severity: 'error', orderId: null, toteId: 'TOTE-014', deviceId: 'SH-003', message: 'Shuttle SH-003 motor temperature exceeded threshold (85°C)' },
    { timestamp: '2024-01-15 14:24:08.456', subsystem: 'WES', severity: 'info', orderId: 'ORD-12355', toteId: 'TOTE-015', deviceId: 'SH-001', message: 'Order ORD-12355 assigned to tote TOTE-015' },
    { timestamp: '2024-01-15 14:24:09.567', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-015', deviceId: 'SH-001', message: 'Shuttle SH-001 retrieved tote TOTE-015 from storage' },
    { timestamp: '2024-01-15 14:24:10.678', subsystem: 'WES', severity: 'info', orderId: 'ORD-12356', toteId: 'TOTE-016', deviceId: 'AMR-06', message: 'Order ORD-12356 assigned to tote TOTE-016' },
    { timestamp: '2024-01-15 14:24:11.789', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-016', deviceId: 'AMR-06', message: 'AMR-06 moving tote TOTE-016 to packing station' },
    { timestamp: '2024-01-15 14:24:12.890', subsystem: 'WES', severity: 'info', orderId: 'ORD-12357', toteId: 'TOTE-017', deviceId: 'SH-002', message: 'Order ORD-12357 assigned to tote TOTE-017' },
    { timestamp: '2024-01-15 14:24:13.901', subsystem: 'PLC', severity: 'info', orderId: null, toteId: 'TOTE-017', deviceId: 'PA-01', message: 'Print & Apply PA-01 labeled tote TOTE-017' },
    { timestamp: '2024-01-15 14:24:14.012', subsystem: 'WES', severity: 'info', orderId: 'ORD-12358', toteId: 'TOTE-018', deviceId: 'SH-004', message: 'Order ORD-12358 assigned to tote TOTE-018' },
    { timestamp: '2024-01-15 14:24:15.123', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-018', deviceId: 'SH-004', message: 'Shuttle SH-004 delivered tote TOTE-018 to picking zone A' },
    { timestamp: '2024-01-15 14:24:16.234', subsystem: 'WES', severity: 'info', orderId: 'ORD-12359', toteId: 'TOTE-019', deviceId: 'AMR-01', message: 'Order ORD-12359 assigned to tote TOTE-019' },
    { timestamp: '2024-01-15 14:24:17.345', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-019', deviceId: 'AMR-01', message: 'AMR-01 completed putaway for tote TOTE-019' },
    { timestamp: '2024-01-15 14:24:18.456', subsystem: 'WES', severity: 'info', orderId: 'ORD-12360', toteId: 'TOTE-020', deviceId: 'SH-005', message: 'Order ORD-12360 assigned to tote TOTE-020' },
    { timestamp: '2024-01-15 14:24:19.567', subsystem: 'WCS', severity: 'warning', orderId: null, toteId: 'TOTE-020', deviceId: 'SH-005', message: 'Shuttle SH-005 queue length at 0 (optimal)' },
    { timestamp: '2024-01-15 14:24:20.678', subsystem: 'WES', severity: 'info', orderId: 'ORD-12361', toteId: null, deviceId: null, message: 'Order ORD-12361 completed and released for shipping' },
    { timestamp: '2024-01-15 14:24:21.789', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-021', deviceId: 'ASRS-01', message: 'AS/RS ASRS-01 retrieving tote TOTE-021 from location D-45-67' },
    { timestamp: '2024-01-15 14:24:22.890', subsystem: 'WES', severity: 'info', orderId: 'ORD-12362', toteId: 'TOTE-022', deviceId: 'SH-006', message: 'Order ORD-12362 assigned to tote TOTE-022' },
    { timestamp: '2024-01-15 14:24:23.901', subsystem: 'PLC', severity: 'info', orderId: null, toteId: 'TOTE-022', deviceId: 'SH-006', message: 'Shuttle SH-006 cycle time: 2.5s (within target)' },
    { timestamp: '2024-01-15 14:24:24.012', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-023', deviceId: 'AMR-03', message: 'AMR-03 completed retrieval task for tote TOTE-023' },
    { timestamp: '2024-01-15 14:24:25.123', subsystem: 'WES', severity: 'info', orderId: 'ORD-12363', toteId: 'TOTE-024', deviceId: 'SH-001', message: 'Order ORD-12363 assigned to tote TOTE-024' },
    { timestamp: '2024-01-15 14:24:26.234', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-024', deviceId: 'SH-001', message: 'Shuttle SH-001 moving tote TOTE-024 to packing zone' },
    { timestamp: '2024-01-15 14:24:27.345', subsystem: 'WES', severity: 'error', orderId: 'ORD-12364', toteId: 'TOTE-025', deviceId: null, message: 'Scan failed for order ORD-12364 - manual review required' },
    { timestamp: '2024-01-15 14:24:28.456', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-025', deviceId: 'AMR-04', message: 'AMR-04 assigned to handle exception for tote TOTE-025' },
    { timestamp: '2024-01-15 14:24:29.567', subsystem: 'WES', severity: 'info', orderId: 'ORD-12365', toteId: 'TOTE-026', deviceId: 'SH-002', message: 'Order ORD-12365 assigned to tote TOTE-026' },
    { timestamp: '2024-01-15 14:24:30.678', subsystem: 'PLC', severity: 'warning', orderId: null, toteId: 'TOTE-026', deviceId: 'SH-002', message: 'Shuttle SH-002 utilization at 92% (high)' },
    { timestamp: '2024-01-15 14:24:31.789', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-027', deviceId: 'AMR-05', message: 'AMR-05 started putaway task for tote TOTE-027' },
    { timestamp: '2024-01-15 14:24:32.890', subsystem: 'WES', severity: 'info', orderId: 'ORD-12366', toteId: 'TOTE-028', deviceId: 'SH-003', message: 'Order ORD-12366 assigned to tote TOTE-028' },
    { timestamp: '2024-01-15 14:24:33.901', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-028', deviceId: 'SH-003', message: 'Shuttle SH-003 status: degraded - reduced throughput' },
    { timestamp: '2024-01-15 14:24:34.012', subsystem: 'WES', severity: 'info', orderId: 'ORD-12367', toteId: null, deviceId: null, message: 'Order ORD-12367 completed and released for shipping' },
    { timestamp: '2024-01-15 14:24:35.123', subsystem: 'WCS', severity: 'info', orderId: null, toteId: 'TOTE-029', deviceId: 'ASRS-01', message: 'AS/RS ASRS-01 storing tote TOTE-029 in location E-56-78' },
    { timestamp: '2024-01-15 14:24:36.234', subsystem: 'WES', severity: 'info', orderId: 'ORD-12368', toteId: 'TOTE-030', deviceId: 'SH-004', message: 'Order ORD-12368 assigned to tote TOTE-030' },
    { timestamp: '2024-01-15 14:24:37.345', subsystem: 'PLC', severity: 'info', orderId: null, toteId: 'TOTE-030', deviceId: 'SH-004', message: 'Shuttle SH-004 cycle completed successfully' },
  ]

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !searchTerm || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.toteId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.deviceId?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubsystem = subsystemFilter === 'all' || log.subsystem === subsystemFilter
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter
    return matchesSearch && matchesSubsystem && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      case 'info':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2, 
          mb: 4 
        }}
      >
        <Description sx={{ fontSize: 32, color: iconColors.logViewer }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Log Viewer
        </Typography>
      </Box>

      {/* Filters */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Search orders, totes, devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ minWidth: 300, flexGrow: 1 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Subsystem</InputLabel>
              <Select value={subsystemFilter} label="Subsystem" onChange={(e) => setSubsystemFilter(e.target.value)}>
                <MenuItem value="all">All Subsystems</MenuItem>
                <MenuItem value="WES">WES</MenuItem>
                <MenuItem value="WCS">WCS</MenuItem>
                <MenuItem value="PLC">PLC</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Severity</InputLabel>
              <Select value={severityFilter} label="Severity" onChange={(e) => setSeverityFilter(e.target.value)}>
                <MenuItem value="all">All Severities</MenuItem>
                <MenuItem value="error">Error</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
                <MenuItem value="info">Info</MenuItem>
              </Select>
            </FormControl>
            <IconButton>
              <Download />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
            <FilterList sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Showing {filteredLogs.length} of {logs.length} events
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Log Table */}
      <Card elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Subsystem</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Tote ID</TableCell>
                  <TableCell>Device ID</TableCell>
                  <TableCell>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.map((log, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <Chip label={log.subsystem} size="small" variant="outlined" sx={{ height: 20 }} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={log.severity}
                        size="small"
                        color={getSeverityColor(log.severity) as 'error' | 'warning' | 'info'}
                        sx={{ height: 20, textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {log.orderId || '-'}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {log.toteId || '-'}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {log.deviceId || '-'}
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  )
}
