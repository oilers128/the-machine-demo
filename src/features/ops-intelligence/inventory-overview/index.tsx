/**
 * Inventory Overview
 * 
 * Provides clear insight into inventory levels, locations, and availability
 * throughout the warehouse. Focuses on where inventory sits, what it contains,
 * and how effectively space is being utilized.
 */
import { Box, Typography, Paper, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Inventory, LocationOn, Warning } from '@mui/icons-material'

export default function InventoryOverview() {
  const zones = [
    { zone: 'Zone A', skus: 1245, units: 45678, utilization: 87, status: 'normal' },
    { zone: 'Zone B', skus: 892, units: 32145, utilization: 72, status: 'normal' },
    { zone: 'Zone C', skus: 1567, units: 52341, utilization: 94, status: 'high' },
    { zone: 'Cold Storage', skus: 234, units: 8923, utilization: 65, status: 'normal' },
  ]

  const lowStock = [
    { sku: 'SKU-12345', description: 'Widget A', location: 'A-12-34', current: 45, min: 50, status: 'low' },
    { sku: 'SKU-23456', description: 'Widget B', location: 'B-23-45', current: 12, min: 25, status: 'critical' },
    { sku: 'SKU-34567', description: 'Widget C', location: 'C-34-56', current: 8, min: 15, status: 'critical' },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Inventory sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Inventory Overview
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total SKUs
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {zones.reduce((acc, z) => acc + z.skus, 0).toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Across all zones
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total Units
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {zones.reduce((acc, z) => acc + z.units, 0).toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              In stock
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Avg Utilization
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {Math.round(zones.reduce((acc, z) => acc + z.utilization, 0) / zones.length)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Location capacity
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Low Stock Alerts
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
              {lowStock.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Requiring attention
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Zone Utilization */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Zone Utilization
            </Typography>
            <Box sx={{ mt: 2 }}>
              {zones.map((zone) => (
                <Box key={zone.zone} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {zone.zone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {zone.skus} SKUs, {zone.units.toLocaleString()} units
                      </Typography>
                      <Chip
                        label={zone.utilization + '%'}
                        size="small"
                        color={zone.utilization > 90 ? 'warning' : zone.utilization > 75 ? 'primary' : 'default'}
                        sx={{ height: 20 }}
                      />
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={zone.utilization}
                    sx={{ height: 8, borderRadius: 1 }}
                    color={zone.utilization > 90 ? 'warning' : zone.utilization > 75 ? 'primary' : 'success'}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Low Stock Items
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell align="right">Current</TableCell>
                    <TableCell align="right">Min</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lowStock.map((item) => (
                    <TableRow key={item.sku} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{item.sku}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                          {item.location}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{item.current}</TableCell>
                      <TableCell align="right">{item.min}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          color={item.status === 'critical' ? 'error' : 'warning'}
                          icon={<Warning />}
                          sx={{ height: 20, textTransform: 'capitalize' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
