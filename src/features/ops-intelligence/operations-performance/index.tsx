/**
 * Operations Performance
 * 
 * Measures how effectively work is being completed across picking, packing,
 * and shipping activities. This module focuses on output and efficiency for
 * both people and workstations.
 */
import { Box, Typography, Paper, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Speed, Person, AccessTime } from '@mui/icons-material'

export default function OperationsPerformance() {
  const activities = [
    { activity: 'Picking', throughput: 342, target: 320, efficiency: 94, cycleTime: '2.3 min', workers: 12 },
    { activity: 'Packing', throughput: 289, target: 280, efficiency: 98, cycleTime: '1.8 min', workers: 8 },
    { activity: 'Shipping', throughput: 156, target: 150, efficiency: 96, cycleTime: '3.2 min', workers: 6 },
  ]

  const stations = [
    { station: 'P-001', zone: 'Zone A', throughput: 45, efficiency: 92, status: 'active' },
    { station: 'P-002', zone: 'Zone A', throughput: 38, efficiency: 88, status: 'active' },
    { station: 'P-003', zone: 'Zone B', throughput: 42, efficiency: 95, status: 'active' },
    { station: 'PK-001', zone: 'Packing', throughput: 52, efficiency: 98, status: 'active' },
    { station: 'PK-002', zone: 'Packing', throughput: 48, efficiency: 96, status: 'active' },
    { station: 'SH-001', zone: 'Shipping', throughput: 28, efficiency: 94, status: 'active' },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Speed sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Operations Performance
        </Typography>
      </Box>

      {/* Activity Performance Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {activities.map((activity) => (
          <Grid size={{ xs: 12, md: 4 }} key={activity.activity}>
            <Paper sx={{ p: 2.5 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {activity.activity}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {activity.throughput}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    units/hr
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Chip
                    label={`${activity.efficiency}% efficiency`}
                    size="small"
                    color={activity.efficiency >= 95 ? 'success' : activity.efficiency >= 90 ? 'primary' : 'warning'}
                    sx={{ mb: 0.5 }}
                  />
                  <Typography variant="caption" display="block" color="text.secondary">
                    Target: {activity.target}/hr
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {activity.workers} workers
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {activity.cycleTime} avg
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(activity.throughput / activity.target) * 100}
                sx={{ height: 8, borderRadius: 1 }}
                color={activity.throughput >= activity.target ? 'success' : 'primary'}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Station Performance */}
      <Paper sx={{ p: 2.5 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Station & Zone Performance
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Station</TableCell>
                <TableCell>Zone</TableCell>
                <TableCell>Throughput</TableCell>
                <TableCell>Efficiency</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((station) => (
                <TableRow key={station.station} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{station.station}</TableCell>
                  <TableCell>{station.zone}</TableCell>
                  <TableCell>{station.throughput} units/hr</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={station.efficiency}
                        sx={{ width: 60, height: 6, borderRadius: 1 }}
                        color={station.efficiency >= 95 ? 'success' : station.efficiency >= 90 ? 'primary' : 'warning'}
                      />
                      <Typography variant="body2">{station.efficiency}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={station.status}
                      size="small"
                      color="success"
                      sx={{ height: 20, textTransform: 'capitalize' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
