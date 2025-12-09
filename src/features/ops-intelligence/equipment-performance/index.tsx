/**
 * Equipment Performance
 * 
 * Monitoring of all automated equipment and PLC-driven subsystems
 * Includes: shuttles, AS/RS, AMRs, ports, pusher/sorter, print & apply
 * Metrics: cycle times, queue lengths, machine throughput, error rates, downtime
 */
import { useState, useMemo } from 'react'
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Tabs, Tab, useTheme, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { PrecisionManufacturing, CheckCircle, Warning, Error, BarChart, Build, CompareArrows, Timer } from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts'
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
      id={`equipment-tabpanel-${index}`}
      aria-labelledby={`equipment-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function EquipmentPerformance() {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)
  const [throughputFilter, setThroughputFilter] = useState<string>('shuttle')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleThroughputFilterChange = (_event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter !== null) {
      setThroughputFilter(newFilter)
    }
  }
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

  // Generate task data per 15-minute interval for the last 8 hours (32 intervals)
  const taskData = useMemo(() => {
    const intervals = []
    const now = new Date()
    
    for (let i = 31; i >= 0; i--) {
      const intervalTime = new Date(now.getTime() - i * 15 * 60 * 1000)
      const hour = intervalTime.getHours()
      const minute = intervalTime.getMinutes()
      
      // Generate realistic task counts (higher during peak hours 8-17)
      // Shuttle systems: ~10-25 tasks per 15min per shuttle, AMRs: ~5-20 tasks per 15min per AMR
      const isPeakHours = hour >= 8 && hour < 17
      let baseTasks: number
      let goalValue: number
      
      if (throughputFilter === 'shuttle') {
        // Shuttle systems are faster: 6 shuttles × 12-20 tasks per 15min = 72-120 tasks
        baseTasks = isPeakHours ? 100 : 60
        goalValue = 75 // Goal for shuttle systems (achievable most of the time)
      } else {
        // AMRs: 5 AMRs × 8-15 tasks per 15min = 40-75 tasks
        baseTasks = isPeakHours ? 65 : 40
        goalValue = 50 // Goal for AMR systems (achievable most of the time)
      }
      
      const variation = Math.floor(Math.random() * 30) - 15
      const tasks = Math.max(0, Math.round(baseTasks + variation))
      
      // Round minutes to nearest 15-minute interval (00, 15, 30, 45)
      const roundedMinute = Math.floor(minute / 15) * 15
      
      intervals.push({
        time: `${hour.toString().padStart(2, '0')}:${roundedMinute.toString().padStart(2, '0')}`,
        tasks,
        goal: goalValue,
        timestamp: intervalTime,
      })
    }
    
    return intervals
  }, [throughputFilter])

  // Cycle time data by equipment type
  const cycleTimeChartData = useMemo(() => {
    const typeMap = new Map<string, { total: number, count: number }>()
    equipment.forEach(eq => {
      if (eq.status !== 'offline' && eq.cycleTime !== 'N/A') {
        const cycleTimeSeconds = parseFloat(eq.cycleTime.replace('s', ''))
        const existing = typeMap.get(eq.type) || { total: 0, count: 0 }
        typeMap.set(eq.type, {
          total: existing.total + cycleTimeSeconds,
          count: existing.count + 1
        })
      }
    })
    return Array.from(typeMap.entries()).map(([type, data]) => ({
      type,
      avgCycleTime: parseFloat((data.total / data.count).toFixed(1)),
    }))
  }, [])

  // Cycle time summary by type
  const cycleTimeSummary = useMemo(() => {
    const typeMap = new Map<string, { total: number, count: number, min: number, max: number }>()
    equipment.forEach(eq => {
      if (eq.status !== 'offline' && eq.cycleTime !== 'N/A') {
        const cycleTimeSeconds = parseFloat(eq.cycleTime.replace('s', ''))
        const existing = typeMap.get(eq.type) || { total: 0, count: 0, min: Infinity, max: 0 }
        typeMap.set(eq.type, {
          total: existing.total + cycleTimeSeconds,
          count: existing.count + 1,
          min: Math.min(existing.min, cycleTimeSeconds),
          max: Math.max(existing.max, cycleTimeSeconds)
        })
      }
    })
    return Array.from(typeMap.entries()).map(([type, data]) => ({
      type,
      avg: (data.total / data.count).toFixed(1),
      min: data.min.toFixed(1),
      max: data.max.toFixed(1),
    }))
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
        <PrecisionManufacturing sx={{ fontSize: 32, color: iconColors.equipmentPerformance }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Equipment Performance
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
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

      {/* Tabs Navigation */}
      <Card elevation={1} sx={{ mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="equipment performance tabs"
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
            icon={<PrecisionManufacturing />} 
            iconPosition="start"
            label="Overview" 
            id="equipment-tab-0"
            aria-controls="equipment-tabpanel-0"
          />
          <Tab 
            icon={<BarChart />} 
            iconPosition="start"
            label="Throughput" 
            id="equipment-tab-1"
            aria-controls="equipment-tabpanel-1"
          />
          <Tab 
            icon={<CompareArrows />} 
            iconPosition="start"
            label="Performance" 
            id="equipment-tab-2"
            aria-controls="equipment-tabpanel-2"
          />
          <Tab 
            icon={<Build />} 
            iconPosition="start"
            label="Maintenance" 
            id="equipment-tab-3"
            aria-controls="equipment-tabpanel-3"
          />
          <Tab 
            icon={<Timer />} 
            iconPosition="start"
            label="Cycle Times" 
            id="equipment-tab-4"
            aria-controls="equipment-tabpanel-4"
          />
        </Tabs>
      </Card>

      {/* Overview Tab - Equipment Details Table */}
      <TabPanel value={tabValue} index={0}>
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
      </TabPanel>

      {/* Throughput Tab - Task Graph */}
      <TabPanel value={tabValue} index={1}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Tasks Per 15-Minute Interval
              </Typography>
              <ToggleButtonGroup
                value={throughputFilter}
                exclusive
                onChange={handleThroughputFilterChange}
                aria-label="equipment filter"
                size="small"
              >
                <ToggleButton value="amr" aria-label="AMR">
                  AMR
                </ToggleButton>
                <ToggleButton value="shuttle" aria-label="shuttle systems">
                  Shuttle
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ width: '100%', height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taskData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval="preserveStartEnd"
                  />
                  <YAxis label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                    labelFormatter={(label) => `Time: ${label}`}
                    formatter={(value: number) => [`${value} tasks`, 'Tasks']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                    name="Tasks"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="goal" 
                    stroke={theme.palette.secondary.main}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name={throughputFilter === 'shuttle' ? 'Goal (75)' : 'Goal (50)'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {Math.round(taskData.reduce((acc, d) => acc + d.tasks, 0) / taskData.length)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Avg Tasks/Interval
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {Math.max(...taskData.map(d => d.tasks))}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Peak Tasks
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {taskData.reduce((acc, d) => acc + d.tasks, 0)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Tasks (8h)
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Performance Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Equipment Type Performance
            </Typography>
            
            {/* Comparison Chart */}
            <Box sx={{ width: '100%', height: 400, mb: 3 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={useMemo(() => {
                  const types = ['Shuttle System', 'AMR', 'Print & Apply']
                  return types.map(type => {
                    const typeEquipment = equipment.filter(eq => eq.type === type)
                    const avgUtilization = typeEquipment.length > 0
                      ? Math.round(typeEquipment.reduce((acc, eq) => acc + eq.utilization, 0) / typeEquipment.length)
                      : 0
                    const avgThroughput = typeEquipment.length > 0
                      ? Math.round(typeEquipment.reduce((acc, eq) => acc + parseInt(eq.throughput), 0) / typeEquipment.length)
                      : 0
                    return {
                      type: type.replace(' System', ''),
                      utilization: avgUtilization,
                      throughput: avgThroughput,
                    }
                  })
                }, [equipment])}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis yAxisId="left" label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Throughput (tasks/hr)', angle: 90, position: 'insideRight' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                    formatter={(value: number, name: string) => [
                      name === 'utilization' ? `${value}%` : `${value} tasks/hr`,
                      name === 'utilization' ? 'Avg Utilization' : 'Avg Throughput'
                    ]}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="utilization" fill={theme.palette.primary.main} name="Avg Utilization" />
                  <Bar yAxisId="right" dataKey="throughput" fill={theme.palette.secondary.main} name="Avg Throughput" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </Box>

            {/* Comparison Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Equipment Type</TableCell>
                    <TableCell align="right">Count</TableCell>
                    <TableCell align="right">Avg Utilization</TableCell>
                    <TableCell align="right">Avg Throughput</TableCell>
                    <TableCell align="right">Total Throughput</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {useMemo(() => {
                    const types = ['Shuttle System', 'AMR', 'Print & Apply']
                    return types.map(type => {
                      const typeEquipment = equipment.filter(eq => eq.type === type)
                      const operational = typeEquipment.filter(eq => eq.status === 'operational').length
                      const avgUtilization = typeEquipment.length > 0
                        ? Math.round(typeEquipment.reduce((acc, eq) => acc + eq.utilization, 0) / typeEquipment.length)
                        : 0
                      const avgThroughput = typeEquipment.length > 0
                        ? Math.round(typeEquipment.reduce((acc, eq) => acc + parseInt(eq.throughput), 0) / typeEquipment.length)
                        : 0
                      const totalThroughput = typeEquipment.reduce((acc, eq) => acc + parseInt(eq.throughput), 0)
                      
                      return {
                        type,
                        count: typeEquipment.length,
                        operational,
                        avgUtilization,
                        avgThroughput,
                        totalThroughput,
                      }
                    })
                  }, [equipment]).map((item) => (
                    <TableRow key={item.type} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{item.type}</TableCell>
                      <TableCell align="right">{item.count}</TableCell>
                      <TableCell align="right">{item.avgUtilization}%</TableCell>
                      <TableCell align="right">{item.avgThroughput.toLocaleString()}/hr</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>{item.totalThroughput.toLocaleString()}/hr</TableCell>
                      <TableCell>
                        <Chip
                          label={`${item.operational}/${item.count} operational`}
                          size="small"
                          color={item.operational === item.count ? 'success' : 'warning'}
                          sx={{ height: 20 }}
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

      {/* Maintenance Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {/* Maintenance Schedule */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                  Upcoming Maintenance
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { id: 'SH-003', type: 'Shuttle System', maintenance: 'Preventive', due: '2 hours', priority: 'high', reason: 'Motor temperature trending upward' },
                    { id: 'AMR-02', type: 'AMR', maintenance: 'Repair', due: 'Immediate', priority: 'critical', reason: 'Offline - requires attention' },
                    { id: 'SH-006', type: 'Shuttle System', maintenance: 'Routine', due: 'Tomorrow', priority: 'medium', reason: 'Scheduled inspection' },
                  ].map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: item.priority === 'critical' ? 'error.main' : item.priority === 'high' ? 'warning.main' : 'divider',
                        borderRadius: 1,
                        bgcolor: item.priority === 'critical' ? 'error.light' : item.priority === 'high' ? 'warning.light' : 'background.paper',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {item.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.type}
                          </Typography>
                        </Box>
                        <Chip
                          label={item.priority}
                          size="small"
                          color={item.priority === 'critical' ? 'error' : item.priority === 'high' ? 'warning' : 'default'}
                          sx={{ height: 20, textTransform: 'capitalize' }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Type:</strong> {item.maintenance}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Due:</strong> {item.due}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.reason}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Health Scores */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                  Equipment Health Scores
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {equipment
                    .filter(eq => eq.status !== 'offline')
                    .map((item) => {
                      // Calculate health score based on utilization and status
                      const healthScore = item.status === 'operational' 
                        ? Math.min(100, item.utilization + (item.queueLength < 5 ? 10 : 0))
                        : item.status === 'degraded' ? 50 : 0
                      
                      return (
                        <Box key={item.id}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.id}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {healthScore}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={healthScore}
                            sx={{ height: 8, borderRadius: 1 }}
                            color={healthScore >= 80 ? 'success' : healthScore >= 50 ? 'warning' : 'error'}
                          />
                        </Box>
                      )
                    })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Cycle Times Tab */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                  Cycle Time Comparison by Equipment Type
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={cycleTimeChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis label={{ value: 'Cycle Time (seconds)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgCycleTime" fill={theme.palette.primary.main} name="Avg Cycle Time (s)" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                  Cycle Time Summary
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {cycleTimeSummary.map((summary) => (
                    <Box key={summary.type}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {summary.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avg: {summary.avg}s | Min: {summary.min}s | Max: {summary.max}s
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card elevation={1}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                  Detailed Cycle Times
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Equipment ID</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Cycle Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Throughput</TableCell>
                        <TableCell>Queue Length</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {equipment
                        .filter(eq => eq.status !== 'offline')
                        .sort((a, b) => {
                          const aTime = a.cycleTime === 'N/A' ? Infinity : parseFloat(a.cycleTime.replace('s', ''))
                          const bTime = b.cycleTime === 'N/A' ? Infinity : parseFloat(b.cycleTime.replace('s', ''))
                          return aTime - bTime
                        })
                        .map((item) => (
                          <TableRow key={item.id} hover>
                            <TableCell sx={{ fontWeight: 500 }}>{item.id}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {item.cycleTime}
                                </Typography>
                                {item.cycleTime !== 'N/A' && (
                                  <Chip
                                    label={parseFloat(item.cycleTime.replace('s', '')) <= 2.5 ? 'Fast' : parseFloat(item.cycleTime.replace('s', '')) <= 3.5 ? 'Normal' : 'Slow'}
                                    size="small"
                                    color={parseFloat(item.cycleTime.replace('s', '')) <= 2.5 ? 'success' : parseFloat(item.cycleTime.replace('s', '')) <= 3.5 ? 'primary' : 'warning'}
                                    sx={{ height: 20 }}
                                  />
                                )}
                              </Box>
                            </TableCell>
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
                            <TableCell>{item.throughput}</TableCell>
                            <TableCell>
                              <Chip
                                label={item.queueLength}
                                size="small"
                                color={item.queueLength === 0 ? 'success' : item.queueLength < 5 ? 'primary' : 'warning'}
                                sx={{ height: 20 }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  )
}

