/**
 * Workforce Performance
 * 
 * Human-driven activity and workstation performance
 * Includes: picking, packing, replenishment, decanting, induction, exception handling
 * Metrics: UPH, accuracy, workstation throughput, labor allocation, SLA adherence
 */
import { useState, useMemo } from 'react'
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Tabs, Tab, useTheme } from '@mui/material'
import { Speed, Person, AccessTime, CheckCircle, BarChart, TrendingUp, Work } from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { iconColors } from '../../../theme/theme'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`workforce-tabpanel-${index}`}
      aria-labelledby={`workforce-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function WorkforcePerformance() {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  const activities = [
    { activity: 'Replenishment', throughput: 156, target: 150, efficiency: 96, cycleTime: '3.2 min', workers: 4, uph: 39.0, accuracy: 98.5 },
    { activity: 'Decanting', throughput: 124, target: 120, efficiency: 97, cycleTime: '2.5 min', workers: 3, uph: 41.3, accuracy: 99.1 },
    { activity: 'Picking', throughput: 342, target: 320, efficiency: 94, cycleTime: '2.3 min', workers: 12, uph: 28.5, accuracy: 99.2 },
    { activity: 'Packing', throughput: 289, target: 280, efficiency: 98, cycleTime: '1.8 min', workers: 8, uph: 36.1, accuracy: 99.8 },
  ]

  const stations = [
    { station: 'P-001', zone: 'Zone A', throughput: 45, efficiency: 92, uph: 28.5, status: 'active' },
    { station: 'P-002', zone: 'Zone A', throughput: 38, efficiency: 88, uph: 25.3, status: 'active' },
    { station: 'P-003', zone: 'Zone B', throughput: 42, efficiency: 95, uph: 30.1, status: 'active' },
    { station: 'PK-001', zone: 'Packing', throughput: 52, efficiency: 98, uph: 36.2, status: 'active' },
    { station: 'PK-002', zone: 'Packing', throughput: 48, efficiency: 96, uph: 35.8, status: 'active' },
    { station: 'REP-001', zone: 'Replenishment', throughput: 39, efficiency: 94, uph: 39.0, status: 'active' },
  ]

  const users = [
    { userId: 'User A', activity: 'Picking', tasksCompleted: 342, uph: 28.5, accuracy: 99.2, hoursWorked: 12, status: 'active', zone: 'Zone A' },
    { userId: 'User B', activity: 'Picking', tasksCompleted: 298, uph: 24.8, accuracy: 98.5, hoursWorked: 12, status: 'active', zone: 'Zone B' },
    { userId: 'User C', activity: 'Picking', tasksCompleted: 315, uph: 26.3, accuracy: 99.5, hoursWorked: 12, status: 'active', zone: 'Zone A' },
    { userId: 'User D', activity: 'Packing', tasksCompleted: 289, uph: 36.1, accuracy: 99.8, hoursWorked: 8, status: 'active', zone: 'Packing' },
    { userId: 'User E', activity: 'Packing', tasksCompleted: 267, uph: 33.4, accuracy: 99.6, hoursWorked: 8, status: 'active', zone: 'Packing' },
    { userId: 'User F', activity: 'Replenishment', tasksCompleted: 156, uph: 39.0, accuracy: 98.5, hoursWorked: 4, status: 'active', zone: 'Replenishment' },
    { userId: 'User G', activity: 'Decanting', tasksCompleted: 124, uph: 41.3, accuracy: 99.1, hoursWorked: 3, status: 'active', zone: 'Decant' },
    { userId: 'User H', activity: 'Picking', tasksCompleted: 0, uph: 0, accuracy: 0, hoursWorked: 0, status: 'offline', zone: 'Zone B' },
  ]

  // Generate productivity trend data per hour for the last 8 hours
  const productivityData = useMemo(() => {
    const hours = []
    const now = new Date()
    
    for (let i = 7; i >= 0; i--) {
      const hourTime = new Date(now.getTime() - i * 60 * 60 * 1000)
      const hour = hourTime.getHours()
      
      // Generate realistic productivity (higher during peak hours 8-17)
      const baseProductivity = hour >= 8 && hour < 17 ? 320 : 180
      const variation = Math.floor(Math.random() * 60) - 30
      const productivity = Math.max(0, baseProductivity + variation)
      
      hours.push({
        time: `${hour}:00`,
        productivity: productivity,
        target: 250, // Flat target line
      })
    }
    
    return hours
  }, [])

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
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={activity.activity}>
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
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
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

      {/* Tabs Navigation */}
      <Card elevation={1} sx={{ mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="workforce performance tabs"
          sx={{ 
            minHeight: 40,
            borderRadius: '12px 12px 0 0',
            '& .MuiTab-root': {
              minHeight: 40,
              py: 1,
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.common.white,
                bgcolor: theme.palette.primary.main,
              },
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            }
          }}
        >
          <Tab 
            icon={<Speed />} 
            iconPosition="start"
            label="Overview" 
            id="workforce-tab-0"
            aria-controls="workforce-tabpanel-0"
          />
          <Tab 
            icon={<BarChart />} 
            iconPosition="start"
            label="Productivity" 
            id="workforce-tab-1"
            aria-controls="workforce-tabpanel-1"
          />
          <Tab 
            icon={<Work />} 
            iconPosition="start"
            label="Stations" 
            id="workforce-tab-2"
            aria-controls="workforce-tabpanel-2"
          />
          <Tab 
            icon={<TrendingUp />} 
            iconPosition="start"
            label="Trends" 
            id="workforce-tab-3"
            aria-controls="workforce-tabpanel-3"
          />
        </Tabs>
      </Card>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Productivity Trends (Last 8 Hours)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Productivity (units/hr)"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Productivity Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Active Users
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {users.filter(u => u.status === 'active').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Avg UPH
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {users.filter(u => u.status === 'active').length > 0 
                    ? (users.filter(u => u.status === 'active').reduce((acc, u) => acc + u.uph, 0) / users.filter(u => u.status === 'active').length).toFixed(1)
                    : '0'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Avg Accuracy
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {users.filter(u => u.status === 'active').length > 0
                    ? (users.filter(u => u.status === 'active').reduce((acc, u) => acc + u.accuracy, 0) / users.filter(u => u.status === 'active').length).toFixed(1)
                    : '0'}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Total Tasks
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {users.reduce((acc, u) => acc + u.tasksCompleted, 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Individual User Performance
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Zone</TableCell>
                    <TableCell>Tasks Completed</TableCell>
                    <TableCell>UPH</TableCell>
                    <TableCell>Accuracy</TableCell>
                    <TableCell>Hours Worked</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .sort((a, b) => b.tasksCompleted - a.tasksCompleted)
                    .map((user) => (
                      <TableRow key={user.userId} hover>
                        <TableCell sx={{ fontWeight: 600 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person sx={{ fontSize: 18, color: user.status === 'active' ? 'primary.main' : 'text.disabled' }} />
                            {user.userId}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.activity}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20 }}
                          />
                        </TableCell>
                        <TableCell>{user.zone}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{user.tasksCompleted}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={Math.min((user.uph / 45) * 100, 100)}
                              sx={{ width: 60, height: 6, borderRadius: 1 }}
                              color={user.uph >= 35 ? 'success' : user.uph >= 25 ? 'primary' : 'warning'}
                            />
                            <Typography variant="body2">{user.uph}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={user.accuracy}
                              sx={{ width: 60, height: 6, borderRadius: 1 }}
                              color={user.accuracy >= 99 ? 'success' : user.accuracy >= 98 ? 'primary' : 'warning'}
                            />
                            <Typography variant="body2">{user.accuracy}%</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{user.hoursWorked}h</TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            size="small"
                            color={user.status === 'active' ? 'success' : 'default'}
                            icon={user.status === 'active' ? <CheckCircle /> : undefined}
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
      </TabPanel>

      {/* Stations Tab */}
      <TabPanel value={tabValue} index={2}>
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
      </TabPanel>

      {/* Trends Tab */}
      <TabPanel value={tabValue} index={3}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Performance Metrics Comparison
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card elevation={0} sx={{ bgcolor: 'grey.50', p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Average Cycle Times
                  </Typography>
                  {activities.map((activity) => (
                    <Box key={activity.activity} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{activity.activity}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{activity.cycleTime}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card elevation={0} sx={{ bgcolor: 'grey.50', p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Accuracy Rates
                  </Typography>
                  {activities.map((activity) => (
                    <Box key={activity.activity} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{activity.activity}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{activity.accuracy}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={activity.accuracy}
                        sx={{ height: 6, borderRadius: 1 }}
                        color={activity.accuracy >= 99 ? 'success' : activity.accuracy >= 98 ? 'primary' : 'warning'}
                      />
                    </Box>
                  ))}
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

    </Container>
  )
}
