/**
 * Operations Insights
 * 
 * Provides a high-level, real-time view of overall warehouse activity.
 * Acts as the "control tower," summarizing the flow of work across the facility
 * and highlighting key daily performance indicators.
 */
import { Box, Typography, Paper, Grid, LinearProgress, Chip } from '@mui/material'
import { Dashboard as DashboardIcon, TrendingUp, TrendingDown, CheckCircle } from '@mui/icons-material'

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
    <Paper sx={{ p: 2.5, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        {icon && (
          <Box sx={{ color: 'primary.main', opacity: 0.7 }}>
            {icon}
          </Box>
        )}
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
      {trend && trendValue && TrendIcon && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
          <TrendIcon sx={{ fontSize: 16, color: trendColor }} />
          <Typography variant="caption" sx={{ color: trendColor, fontWeight: 500 }}>
            {trendValue}
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default function OperationsInsights() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <DashboardIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Operations Insights
        </Typography>
        <Chip label="Live" color="success" size="small" icon={<CheckCircle />} />
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Orders Processed Today"
            value="1,247"
            subtitle="Target: 1,200"
            trend="up"
            trendValue="+3.9% vs plan"
            icon={<DashboardIcon />}
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
            title="On-Time Performance"
            value="98.2%"
            subtitle="Target: 97.0%"
            trend="up"
            trendValue="+1.2% vs plan"
          />
        </Grid>
      </Grid>

      {/* Work in Progress */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Work in Progress
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { label: 'Picking', value: 234, total: 300, color: 'primary' },
                { label: 'Packing', value: 156, total: 200, color: 'secondary' },
                { label: 'Shipping', value: 89, total: 150, color: 'success' },
              ].map((item) => (
                <Box key={item.label} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.value} / {item.total}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(item.value / item.total) * 100}
                    sx={{ height: 8, borderRadius: 1 }}
                    color={item.color as 'primary' | 'secondary' | 'success'}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Current Flow Status
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { area: 'Receiving', status: 'normal', throughput: '125 units/hr' },
                { area: 'Putaway', status: 'normal', throughput: '118 units/hr' },
                { area: 'Picking Zone A', status: 'bottleneck', throughput: '89 units/hr' },
                { area: 'Packing', status: 'normal', throughput: '142 units/hr' },
                { area: 'Shipping', status: 'normal', throughput: '156 units/hr' },
              ].map((item) => (
                <Box
                  key={item.area}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: item.status === 'bottleneck' ? 'warning.main' : 'success.main',
                      }}
                    />
                    <Typography variant="body2">{item.area}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.throughput}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Performance vs Plan */}
      <Paper sx={{ p: 2.5 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Today's Performance vs. Plan
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.metric}
                    </Typography>
                    <Chip
                      label={`${isAbovePlan ? '+' : ''}${(item.actual - item.plan).toLocaleString()} ${item.unit}`}
                      size="small"
                      color={isAbovePlan ? 'success' : 'default'}
                      sx={{ height: 20 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((item.actual / item.plan) * 100, 100)}
                        sx={{ height: 10, borderRadius: 1 }}
                        color={isAbovePlan ? 'success' : 'primary'}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 50, textAlign: 'right' }}>
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
      </Paper>
    </Box>
  )
}

