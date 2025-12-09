/**
 * Inventory & Storage
 * 
 * Real-time view of inventory health, location usage, slotting, and replenishment
 * Includes: totes/bins, AS/RS storage locations, buffer zones, decant areas
 * Metrics: inventory aging, velocity, storage utilization, replenishment needs
 */
import { useState, useMemo } from 'react'
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Tabs, Tab, useTheme } from '@mui/material'
import { Inventory, LocationOn, Storage, Refresh, BarChart } from '@mui/icons-material'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
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
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function InventoryStorage() {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  const zones = [
    { zone: 'Zone A', skus: 1245, units: 45678, utilization: 87, status: 'normal', type: 'AS/RS Storage' },
    { zone: 'Zone B', skus: 892, units: 32145, utilization: 72, status: 'normal', type: 'AS/RS Storage' },
    { zone: 'Zone C', skus: 1567, units: 52341, utilization: 94, status: 'high', type: 'AS/RS Storage' },
    { zone: 'Buffer Zone', skus: 234, units: 8923, utilization: 65, status: 'normal', type: 'Buffer' },
    { zone: 'Decant Area', skus: 156, units: 3456, utilization: 58, status: 'normal', type: 'Decant' },
  ]

  const storageTypes = [
    { type: 'Shuttle', skus: 2345, units: 89234, utilization: 87, status: 'normal' },
    { type: 'Pallet Rack', skus: 1456, units: 45678, utilization: 72, status: 'normal' },
    { type: 'Case Rack', skus: 2890, units: 67890, utilization: 94, status: 'high' },
  ]

  const replenishmentNeeds = [
    { location: 'A-12-34', sku: 'SKU-12345', current: 45, target: 100, priority: 'high' },
    { location: 'B-23-45', sku: 'SKU-23456', current: 12, target: 50, priority: 'critical' },
    { location: 'C-34-56', sku: 'SKU-34567', current: 8, target: 30, priority: 'critical' },
  ]

  // Generate utilization chart data
  const utilizationData = useMemo(() => {
    return zones.map(zone => ({
      zone: zone.zone,
      utilization: zone.utilization,
      units: zone.units / 1000, // Scale down for chart
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
        <Inventory sx={{ fontSize: 32, color: iconColors.inventoryStorage }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Inventory & Storage
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Total SKUs
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {zones.reduce((acc, z) => acc + z.skus, 0).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Across all zones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Total Units
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {zones.reduce((acc, z) => acc + z.units, 0).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                In stock
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
                {Math.round(zones.reduce((acc, z) => acc + z.utilization, 0) / zones.length)}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Location capacity
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Replenishment Needs
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                {replenishmentNeeds.length}
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
          aria-label="inventory storage tabs"
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
            icon={<Inventory />} 
            iconPosition="start"
            label="Overview" 
            id="inventory-tab-0"
            aria-controls="inventory-tabpanel-0"
          />
          <Tab 
            icon={<Storage />} 
            iconPosition="start"
            label="Locations" 
            id="inventory-tab-1"
            aria-controls="inventory-tabpanel-1"
          />
          <Tab 
            icon={<Refresh />} 
            iconPosition="start"
            label="Replenishment" 
            id="inventory-tab-2"
            aria-controls="inventory-tabpanel-2"
          />
          <Tab 
            icon={<BarChart />} 
            iconPosition="start"
            label="Zone Utilization" 
            id="inventory-tab-3"
            aria-controls="inventory-tabpanel-3"
          />
        </Tabs>
      </Card>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                  Storage Type Utilization
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {storageTypes.map((storage) => (
                    <Box key={storage.type} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Storage sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {storage.type}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {storage.skus} SKUs, {storage.units.toLocaleString()} units
                          </Typography>
                          <Chip
                            label={storage.utilization + '%'}
                            size="small"
                            color={storage.utilization > 90 ? 'warning' : storage.utilization > 75 ? 'primary' : 'default'}
                            sx={{ height: 20 }}
                          />
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={storage.utilization}
                        sx={{ height: 8, borderRadius: 1 }}
                        color={storage.utilization > 90 ? 'warning' : storage.utilization > 75 ? 'primary' : 'success'}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                  Inventory Velocity
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {useMemo(() => {
                    const totalSkus = storageTypes.reduce((acc, st) => acc + st.skus, 0)
                    // Calculate velocity based on storage type utilization (higher utilization = faster moving)
                    const fastMoving = Math.round(totalSkus * 0.42) // ~42% - Shuttle typically fast
                    const mediumMoving = Math.round(totalSkus * 0.35) // ~35% - Pallet Rack moderate
                    const slowMoving = totalSkus - fastMoving - mediumMoving // ~23% - Case Rack slower
                    
                    return [
                      {
                        label: 'Fast Moving',
                        skus: fastMoving,
                        percentage: Math.round((fastMoving / totalSkus) * 100),
                        color: 'success' as const,
                        description: 'High turnover • Shuttle storage',
                      },
                      {
                        label: 'Medium Moving',
                        skus: mediumMoving,
                        percentage: Math.round((mediumMoving / totalSkus) * 100),
                        color: 'primary' as const,
                        description: 'Moderate turnover • Pallet Rack',
                      },
                      {
                        label: 'Slow Moving',
                        skus: slowMoving,
                        percentage: Math.round((slowMoving / totalSkus) * 100),
                        color: 'warning' as const,
                        description: 'Low turnover • Case Rack',
                      },
                    ]
                  }, []).map((velocity) => (
                    <Box key={velocity.label}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {velocity.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: `${velocity.color}.main` }}>
                          {velocity.skus.toLocaleString()} SKUs
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={velocity.percentage}
                        sx={{ height: 8, borderRadius: 1 }}
                        color={velocity.color}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {velocity.percentage}% of inventory • {velocity.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Storage Capacity
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {storageTypes.reduce((acc, st) => acc + st.skus, 0).toLocaleString()} SKUs
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Across all storage types
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {Math.round(storageTypes.reduce((acc, st) => acc + st.utilization, 0) / storageTypes.length)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Average utilization
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Locations Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Storage Zone Details
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Zone</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>SKUs</TableCell>
                    <TableCell>Units</TableCell>
                    <TableCell>Utilization</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {zones.map((zone) => (
                    <TableRow key={zone.zone} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{zone.zone}</TableCell>
                      <TableCell>{zone.type}</TableCell>
                      <TableCell>{zone.skus.toLocaleString()}</TableCell>
                      <TableCell>{zone.units.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={zone.utilization}
                            sx={{ width: 60, height: 6, borderRadius: 1 }}
                            color={zone.utilization > 90 ? 'warning' : zone.utilization > 75 ? 'primary' : 'success'}
                          />
                          <Typography variant="body2">{zone.utilization}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={zone.status}
                          size="small"
                          color={zone.status === 'high' ? 'warning' : 'success'}
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

      {/* Replenishment Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Replenishment Needs
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Current</TableCell>
                    <TableCell align="right">Target</TableCell>
                    <TableCell>Gap</TableCell>
                    <TableCell>Priority</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {replenishmentNeeds.map((item) => (
                    <TableRow key={item.location} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                          {item.location}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{item.sku}</TableCell>
                      <TableCell align="right">{item.current}</TableCell>
                      <TableCell align="right">{item.target}</TableCell>
                      <TableCell align="right" sx={{ color: 'error.main', fontWeight: 500 }}>
                        -{item.target - item.current}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.priority}
                          size="small"
                          color={item.priority === 'critical' ? 'error' : 'warning'}
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

      {/* Analytics Tab */}
      <TabPanel value={tabValue} index={3}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Zone Utilization Comparison
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="utilization" fill={theme.palette.primary.main} name="Utilization %" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabPanel>
    </Container>
  )
}
