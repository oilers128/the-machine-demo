/**
 * Inventory & Storage
 * 
 * Real-time view of inventory health, location usage, slotting, and replenishment
 * Includes: totes/bins, AS/RS storage locations, buffer zones, decant areas
 * Metrics: inventory aging, velocity, storage utilization, replenishment needs
 */
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@mui/material'
import { Inventory, LocationOn, Storage } from '@mui/icons-material'
import { iconColors } from '../../../theme/theme'

export default function InventoryStorage() {
  const zones = [
    { zone: 'Zone A', skus: 1245, units: 45678, utilization: 87, status: 'normal', type: 'AS/RS Storage' },
    { zone: 'Zone B', skus: 892, units: 32145, utilization: 72, status: 'normal', type: 'AS/RS Storage' },
    { zone: 'Zone C', skus: 1567, units: 52341, utilization: 94, status: 'high', type: 'AS/RS Storage' },
    { zone: 'Buffer Zone', skus: 234, units: 8923, utilization: 65, status: 'normal', type: 'Buffer' },
    { zone: 'Decant Area', skus: 156, units: 3456, utilization: 58, status: 'normal', type: 'Decant' },
  ]

  const replenishmentNeeds = [
    { location: 'A-12-34', sku: 'SKU-12345', current: 45, target: 100, priority: 'high' },
    { location: 'B-23-45', sku: 'SKU-23456', current: 12, target: 50, priority: 'critical' },
    { location: 'C-34-56', sku: 'SKU-34567', current: 8, target: 30, priority: 'critical' },
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

      {/* Zone Utilization */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                Storage Zone Utilization
              </Typography>
              <Box sx={{ mt: 2 }}>
                {zones.map((zone) => (
                  <Box key={zone.zone} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Storage sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {zone.zone}
                        </Typography>
                        <Chip label={zone.type} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.65rem' }} />
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
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                Replenishment Needs
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Location</TableCell>
                      <TableCell>SKU</TableCell>
                      <TableCell align="right">Current</TableCell>
                      <TableCell align="right">Target</TableCell>
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
        </Grid>
      </Grid>
    </Container>
  )
}
