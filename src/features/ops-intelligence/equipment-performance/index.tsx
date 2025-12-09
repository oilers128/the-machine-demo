/**
 * Equipment Performance
 * 
 * Monitoring of all automated equipment and PLC-driven subsystems
 * Includes: shuttles, AS/RS, AMRs, ports, pusher/sorter, print & apply
 * Metrics: cycle times, queue lengths, machine throughput, error rates, downtime
 */
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@mui/material'
import { PrecisionManufacturing, CheckCircle, Warning, Error } from '@mui/icons-material'
import { iconColors } from '../../../theme/theme'

export default function EquipmentPerformance() {
  const equipment = [
    { id: 'SH-001', type: 'Shuttle System', utilization: 87, cycleTime: '2.3s', status: 'operational', throughput: '342/hr', queueLength: 3 },
    { id: 'SH-002', type: 'Shuttle System', utilization: 92, cycleTime: '2.1s', status: 'operational', throughput: '389/hr', queueLength: 1 },
    { id: 'SH-003', type: 'Shuttle System', utilization: 45, cycleTime: '4.2s', status: 'degraded', throughput: '156/hr', queueLength: 12 },
    { id: 'SH-004', type: 'Shuttle System', utilization: 89, cycleTime: '2.2s', status: 'operational', throughput: '365/hr', queueLength: 2 },
    { id: 'SH-005', type: 'Shuttle System', utilization: 94, cycleTime: '2.0s', status: 'operational', throughput: '398/hr', queueLength: 0 },
    { id: 'SH-006', type: 'Shuttle System', utilization: 78, cycleTime: '2.5s', status: 'operational', throughput: '312/hr', queueLength: 4 },
    { id: 'AMR-01', type: 'AMR', utilization: 82, cycleTime: '3.2s', status: 'operational', throughput: '234/hr', queueLength: 0 },
    { id: 'AMR-02', type: 'AMR', utilization: 0, cycleTime: 'N/A', status: 'offline', throughput: '0/hr', queueLength: 0 },
    { id: 'AMR-03', type: 'AMR', utilization: 88, cycleTime: '3.0s', status: 'operational', throughput: '267/hr', queueLength: 1 },
    { id: 'AMR-04', type: 'AMR', utilization: 75, cycleTime: '3.5s', status: 'operational', throughput: '198/hr', queueLength: 2 },
    { id: 'AMR-05', type: 'AMR', utilization: 91, cycleTime: '2.9s', status: 'operational', throughput: '289/hr', queueLength: 0 },
    { id: 'AMR-06', type: 'AMR', utilization: 68, cycleTime: '3.8s', status: 'operational', throughput: '178/hr', queueLength: 3 },
    { id: 'ASRS-01', type: 'AS/RS', utilization: 91, cycleTime: '2.8s', status: 'operational', throughput: '298/hr', queueLength: 2 },
    { id: 'PA-01', type: 'Print & Apply', utilization: 76, cycleTime: '1.5s', status: 'operational', throughput: '445/hr', queueLength: 1 },
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
        <PrecisionManufacturing sx={{ fontSize: 32, color: iconColors.equipmentPerformance }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Equipment Performance
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Equipment
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {equipment.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {equipment.filter(m => m.status === 'operational').length} operational
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Avg Utilization
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {Math.round(equipment.filter(m => m.status !== 'offline').reduce((acc, m) => acc + m.utilization, 0) / equipment.filter(m => m.status !== 'offline').length)}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Across active systems
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Throughput
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {equipment.reduce((acc, m) => acc + parseInt(m.throughput), 0).toLocaleString()}/hr
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Combined rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Alerts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                {equipment.filter(m => m.status !== 'operational').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Requiring attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Equipment Details Table */}
      <Card elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            Equipment Status & Performance
          </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Equipment ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Utilization</TableCell>
                <TableCell>Cycle Time</TableCell>
                <TableCell>Queue Length</TableCell>
                <TableCell align="right">Throughput</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipment.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{item.id}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(item.status)}
                      <Chip
                        label={item.status}
                        size="small"
                        color={getStatusColor(item.status) as 'success' | 'warning' | 'error'}
                        sx={{ height: 20, textTransform: 'capitalize' }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{item.utilization}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.utilization}
                        sx={{ height: 6, borderRadius: 1 }}
                        color={item.utilization > 80 ? 'success' : item.utilization > 50 ? 'primary' : 'warning'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{item.cycleTime}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.queueLength}
                      size="small"
                      color={item.queueLength > 10 ? 'error' : item.queueLength > 5 ? 'warning' : 'default'}
                      sx={{ height: 20 }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>{item.throughput}</TableCell>
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

