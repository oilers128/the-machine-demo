/**
 * Machine Performance
 * 
 * Highlights the activity, throughput, and efficiency of automated systems
 * within the warehouse. Provides visibility into how equipment is performing
 * and identifies areas of slowdown, queuing, or mechanical issues.
 */
import { Box, Typography, Paper, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { PrecisionManufacturing, CheckCircle, Warning, Error } from '@mui/icons-material'

export default function MachinePerformance() {
  const machines = [
    { id: 'SH-001', type: 'Shuttle System', utilization: 87, cycleTime: '2.3s', status: 'operational', throughput: '342/hr' },
    { id: 'SH-002', type: 'Shuttle System', utilization: 92, cycleTime: '2.1s', status: 'operational', throughput: '389/hr' },
    { id: 'SH-003', type: 'Shuttle System', utilization: 45, cycleTime: '4.2s', status: 'degraded', throughput: '156/hr' },
    { id: 'CV-001', type: 'Conveyor', utilization: 78, cycleTime: '1.8s', status: 'operational', throughput: '512/hr' },
    { id: 'CV-002', type: 'Conveyor', utilization: 65, cycleTime: '2.1s', status: 'operational', throughput: '445/hr' },
    { id: 'AMR-01', type: 'AMR', utilization: 82, cycleTime: '3.2s', status: 'operational', throughput: '234/hr' },
    { id: 'AMR-02', type: 'AMR', utilization: 0, cycleTime: 'N/A', status: 'offline', throughput: '0/hr' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />
      case 'degraded':
        return <Warning sx={{ color: 'warning.main', fontSize: 18 }} />
      case 'offline':
        return <Error sx={{ color: 'error.main', fontSize: 18 }} />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'success'
      case 'degraded':
        return 'warning'
      case 'offline':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <PrecisionManufacturing sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Machine Performance
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total Machines
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {machines.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {machines.filter(m => m.status === 'operational').length} operational
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Avg Utilization
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {Math.round(machines.filter(m => m.status !== 'offline').reduce((acc, m) => acc + m.utilization, 0) / machines.filter(m => m.status !== 'offline').length)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Across active systems
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total Throughput
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {machines.reduce((acc, m) => acc + parseInt(m.throughput), 0).toLocaleString()}/hr
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Combined rate
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Alerts
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
              {machines.filter(m => m.status !== 'operational').length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Requiring attention
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Machine Details Table */}
      <Paper sx={{ p: 2.5 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Machine Status & Performance
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Machine ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Utilization</TableCell>
                <TableCell>Cycle Time</TableCell>
                <TableCell align="right">Throughput</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{machine.id}</TableCell>
                  <TableCell>{machine.type}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(machine.status)}
                      <Chip
                        label={machine.status}
                        size="small"
                        color={getStatusColor(machine.status) as 'success' | 'warning' | 'error'}
                        sx={{ height: 20, textTransform: 'capitalize' }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{machine.utilization}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={machine.utilization}
                        sx={{ height: 6, borderRadius: 1 }}
                        color={machine.utilization > 80 ? 'success' : machine.utilization > 50 ? 'primary' : 'warning'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{machine.cycleTime}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>{machine.throughput}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

