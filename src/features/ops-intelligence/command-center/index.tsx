/**
 * Command Center
 * 
 * High-level, real-time operational overview ("control tower")
 * Aggregated KPIs, flow metrics, WIP, throughput, SLAs, bottlenecks
 * Pulls from WES order status, WCS task summaries, Data Lake roll-ups
 */
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Container } from '@mui/material'
import { ControlCamera, TrendingUp, TrendingDown } from '@mui/icons-material'
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
            value="1,247"
            subtitle="Target: 1,200"
            trend="up"
            trendValue="+3.9% vs plan"
            icon={<ControlCamera />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Lines Processed"
            value="8,934"
            subtitle="Avg: 7.2 lines/order"
            trend="up"
            trendValue="+5.2% vs plan"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Units Shipped"
            value="12,456"
            subtitle="Last hour: 523 units"
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
                Current Flow Status & Bottlenecks
              </Typography>
              <Box sx={{ flex: 1 }}>
                {[
                  { area: 'Receiving', status: 'normal', throughput: '125 units/hr' },
                  { area: 'Putaway', status: 'normal', throughput: '118 units/hr' },
                  { area: 'Picking Zone A', status: 'bottleneck', throughput: '89 units/hr' },
                  { area: 'Packing', status: 'normal', throughput: '142 units/hr' },
                  { area: 'Shipping', status: 'normal', throughput: '156 units/hr' },
                ].map((item, index) => (
                  <Box
                    key={item.area}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1.5,
                      borderBottom: index < 4 ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: item.status === 'bottleneck' ? 'warning.main' : 'success.main',
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.area}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {item.throughput}
                    </Typography>
                  </Box>
                ))}
              </Box>
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
                  { metric: 'Orders', actual: 1247, plan: 1200, unit: 'orders' },
                  { metric: 'Lines', actual: 8934, plan: 8500, unit: 'lines' },
                  { metric: 'Units', actual: 12456, plan: 12000, unit: 'units' },
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

