/**
 * Workforce Performance
 * 
 * Human-driven activity and workstation performance
 * Includes: picking, packing, replenishment, decanting, induction, exception handling
 * Metrics: UPH, accuracy, workstation throughput, labor allocation, SLA adherence
 */
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@mui/material'
import { Speed, Person, AccessTime, CheckCircle } from '@mui/icons-material'
import { iconColors } from '../../../theme/theme'

export default function WorkforcePerformance() {
  const activities = [
    { activity: 'Picking', throughput: 342, target: 320, efficiency: 94, cycleTime: '2.3 min', workers: 12, uph: 28.5, accuracy: 99.2 },
    { activity: 'Packing', throughput: 289, target: 280, efficiency: 98, cycleTime: '1.8 min', workers: 8, uph: 36.1, accuracy: 99.8 },
    { activity: 'Replenishment', throughput: 156, target: 150, efficiency: 96, cycleTime: '3.2 min', workers: 4, uph: 39.0, accuracy: 98.5 },
    { activity: 'Decanting', throughput: 124, target: 120, efficiency: 97, cycleTime: '2.5 min', workers: 3, uph: 41.3, accuracy: 99.1 },
    { activity: 'Induction', throughput: 198, target: 190, efficiency: 95, cycleTime: '1.5 min', workers: 5, uph: 39.6, accuracy: 99.5 },
    { activity: 'Exception Handling', throughput: 23, target: 25, efficiency: 92, cycleTime: '8.5 min', workers: 2, uph: 11.5, accuracy: 100 },
  ]

  const stations = [
    { station: 'P-001', zone: 'Zone A', throughput: 45, efficiency: 92, uph: 28.5, status: 'active' },
    { station: 'P-002', zone: 'Zone A', throughput: 38, efficiency: 88, uph: 25.3, status: 'active' },
    { station: 'P-003', zone: 'Zone B', throughput: 42, efficiency: 95, uph: 30.1, status: 'active' },
    { station: 'PK-001', zone: 'Packing', throughput: 52, efficiency: 98, uph: 36.2, status: 'active' },
    { station: 'PK-002', zone: 'Packing', throughput: 48, efficiency: 96, uph: 35.8, status: 'active' },
    { station: 'REP-001', zone: 'Replenishment', throughput: 39, efficiency: 94, uph: 39.0, status: 'active' },
  ]

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
        <Speed sx={{ fontSize: 32, color: iconColors.workforcePerformance }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Workforce Performance
        </Typography>
      </Box>

      {/* Activity Performance Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {activities.map((activity) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.activity}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                  {activity.activity}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ textAlign: 'center', flex: 1 }}>
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
                <Box sx={{ display: 'flex', gap: 2, mb: 1, justifyContent: 'center' }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    UPH: {activity.uph}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Accuracy: {activity.accuracy}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((activity.throughput / activity.target) * 100, 100)}
                  sx={{ height: 8, borderRadius: 1 }}
                  color={activity.throughput >= activity.target ? 'success' : 'primary'}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Station Performance */}
      <Card elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            Workstation Performance
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Station</TableCell>
                  <TableCell>Zone</TableCell>
                  <TableCell>Throughput</TableCell>
                  <TableCell>UPH</TableCell>
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
                    <TableCell>{station.uph}</TableCell>
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
                        icon={<CheckCircle />}
                        sx={{ height: 20, textTransform: 'capitalize' }}
                      />
                    </TableCell>
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
