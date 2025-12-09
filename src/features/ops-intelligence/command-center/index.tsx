/**
 * Command Center
 * 
 * High-level, real-time operational overview ("control tower")
 * Aggregated KPIs, flow metrics, WIP, throughput, SLAs, bottlenecks
 * Pulls from WES order status, WCS task summaries, Data Lake roll-ups
 */
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ControlCamera, TrendingUp, TrendingDown, LocationOn } from '@mui/icons-material'
import { iconColors } from '../../../theme/theme'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon?: React.ReactNode
}

const MetricCard = ({ title, value, subtitle, trend, trendValue, icon }: MetricCardProps) => {
  const trendColor = trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary'
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null

  return (
    <Card 
      elevation={1}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          elevation: 3,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: 'primary.main', opacity: 0.7 }}>
              {icon}
            </Box>
          )}
        </Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
            textAlign: 'center',
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              display: 'block', 
              mb: 1,
              textAlign: 'center',
            }}
          >
            {subtitle}
          </Typography>
        )}
        {trend && trendValue && TrendIcon && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 0.5, 
              mt: 'auto',
            }}
          >
            <TrendIcon sx={{ fontSize: 16, color: trendColor }} />
            <Typography variant="caption" sx={{ color: trendColor, fontWeight: 500 }}>
              {trendValue}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default function CommandCenter() {
  const agedOrders = [
    { orderId: 'ORD-12345', sku: 'SKU-12345', age: 2, priority: 'medium', location: 'A-12-34', units: 2, status: 'pending' },
    { orderId: 'ORD-12346', sku: 'SKU-23456', age: 1, priority: 'low', location: 'B-23-45', units: 4, status: 'pending' },
    { orderId: 'ORD-12347', sku: 'SKU-34567', age: 1, priority: 'low', location: 'C-34-56', units: 3, status: 'in-progress' },
    { orderId: 'ORD-12348', sku: 'SKU-45678', age: 2, priority: 'medium', location: 'A-15-22', units: 5, status: 'pending' },
    { orderId: 'ORD-12349', sku: 'SKU-56789', ageHours: 11, priority: 'low', location: 'B-08-11', units: 3, status: 'in-progress' },
    { orderId: 'ORD-12350', sku: 'SKU-67890', ageHours: 11, priority: 'low', location: 'C-22-33', units: 4, status: 'pending' },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2, 
          mb: 4 
        }}
      >
        <ControlCamera sx={{ fontSize: 32, color: iconColors.commandCenter }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Command Center
        </Typography>
      </Box>

      {/* KPI Cards - Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Orders Processed Today"
            value="12,263"
            subtitle="Target: 12,000"
            trend="up"
            trendValue="+2.2% vs plan"
            icon={<ControlCamera />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Lines Processed"
            value="28,205"
            subtitle="Avg: 2.3 lines/order"
            trend="up"
            trendValue="+5.2% vs plan"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Units Shipped"
            value="39,243"
            subtitle="Avg: 3.2 units/order"
            trend="up"
            trendValue="+2.1% vs plan"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="SLA Adherence"
            value="98.2%"
            subtitle="Target: 97.0%"
            trend="up"
            trendValue="+1.2% vs plan"
          />
        </Grid>
      </Grid>

      {/* Row 2 - Work in Progress & Flow Status */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            elevation={1}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                Work in Progress
              </Typography>
              <Box sx={{ flex: 1 }}>
                {[
                  { label: 'Picking', value: 234, total: 300, color: 'primary' },
                  { label: 'Packing', value: 156, total: 200, color: 'secondary' },
                  { label: 'Shipping', value: 89, total: 150, color: 'success' },
                ].map((item, index) => (
                  <Box key={item.label} sx={{ mb: index < 2 ? 3 : 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.value} / {item.total}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(item.value / item.total) * 100}
                      sx={{ height: 10, borderRadius: 1 }}
                      color={item.color as 'primary' | 'secondary' | 'success'}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            elevation={1}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                Aged Orders
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Total Aged Orders
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {agedOrders.length}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Critical (7+ days)
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
                        {agedOrders.filter(o => {
                          const age = (o.age ?? 0) || ((o.ageHours ?? 0) / 24)
                          return age >= 7
                        }).length}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Units</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agedOrders
                      .sort((a, b) => {
                        const ageA = (a.age ?? 0) || ((a.ageHours ?? 0) / 24)
                        const ageB = (b.age ?? 0) || ((b.ageHours ?? 0) / 24)
                        return ageB - ageA
                      })
                      .slice(0, 5)
                      .map((order) => {
                        const ageValue = (order.age ?? 0) || ((order.ageHours ?? 0) / 24)
                        const ageDisplay = order.ageHours !== undefined
                          ? `${order.ageHours} hours`
                          : `${order.age ?? 0} days`
                        const chipColor = ageValue >= 7 ? 'error' : ageValue >= 5 ? 'warning' : ageValue >= 2 ? 'warning' : 'default'
                        
                        return (
                          <TableRow key={order.orderId} hover>
                            <TableCell sx={{ fontWeight: 500 }}>{order.orderId}</TableCell>
                            <TableCell>
                              <Chip
                                label={ageDisplay}
                                size="small"
                                color={chipColor as 'error' | 'warning' | 'default'}
                                sx={{ height: 20 }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={order.priority}
                                size="small"
                                color={order.priority === 'critical' ? 'error' : order.priority === 'high' ? 'warning' : 'default'}
                                sx={{ height: 20, textTransform: 'capitalize' }}
                              />
                            </TableCell>
                            <TableCell>{order.units}</TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Row 3 - Performance vs Plan */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                Today's Performance vs. Plan
              </Typography>
              <Grid container spacing={3}>
                {[
                  { metric: 'Orders', actual: 12263, plan: 12000, unit: 'orders' },
                  { metric: 'Lines', actual: 28205, plan: 27600, unit: 'lines' },
                  { metric: 'Units', actual: 39243, plan: 38400, unit: 'units' },
                ].map((item) => {
                  const percent = ((item.actual / item.plan) * 100).toFixed(1)
                  const isAbovePlan = item.actual >= item.plan
                  return (
                    <Grid size={{ xs: 12, md: 4 }} key={item.metric}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {item.metric}
                          </Typography>
                          <Chip
                            label={`${isAbovePlan ? '+' : ''}${(item.actual - item.plan).toLocaleString()} ${item.unit}`}
                            size="small"
                            color={isAbovePlan ? 'success' : 'default'}
                            sx={{ height: 24, fontWeight: 500 }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                          <Box sx={{ flex: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={Math.min((item.actual / item.plan) * 100, 100)}
                              sx={{ height: 12, borderRadius: 1 }}
                              color={isAbovePlan ? 'success' : 'primary'}
                            />
                          </Box>
                          <Typography variant="body1" sx={{ fontWeight: 600, minWidth: 55, textAlign: 'right' }}>
                            {percent}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            Actual: {item.actual.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Plan: {item.plan.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

