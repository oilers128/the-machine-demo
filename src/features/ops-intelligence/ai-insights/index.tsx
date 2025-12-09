/**
 * AI Insights
 * 
 * Predictive and prescriptive intelligence layer
 * Includes: anomaly detection, predictive equipment failure, SLA risk forecasting
 * Optimization suggestions for labor, routing, replenishment, and automation expansion
 */
import { Box, Typography, Card, CardContent, Grid, Chip, List, ListItem, ListItemIcon, ListItemText, Divider, Container } from '@mui/material'
import { Psychology, TrendingUp, Warning, Lightbulb } from '@mui/icons-material'
import { iconColors } from '../../../theme/theme'

export default function AIInsights() {
  const predictions = [
    { type: 'Equipment Failure', equipment: 'SH-003', prediction: 'Motor temperature trending upward', risk: 'high', timeframe: '4-6 hours', action: 'Schedule preventive maintenance' },
    { type: 'SLA Risk', order: 'ORD-12345', prediction: 'Order at risk of missing SLA', risk: 'medium', timeframe: '2 hours', action: 'Prioritize order processing' },
    { type: 'Bottleneck', area: 'Picking Zone A', prediction: 'Queue length expected to exceed threshold', risk: 'medium', timeframe: '1 hour', action: 'Reallocate labor resources' },
  ]

  const optimizations = [
    { category: 'Labor', suggestion: 'Reallocate 2 workers from Zone B to Zone A to address bottleneck', impact: 'high', estimatedImprovement: '+15% throughput' },
    { category: 'Routing', suggestion: 'Optimize tote routing to reduce junction J-12 congestion', impact: 'medium', estimatedImprovement: '+8% efficiency' },
    { category: 'Replenishment', suggestion: 'Advance replenishment for SKU-12345 to prevent stockout', impact: 'high', estimatedImprovement: 'Prevent 3-hour downtime' },
  ]

  const anomalies = [
    { type: 'Anomaly Detected', description: 'Unusual spike in cycle time for SH-003', detected: '15 min ago', severity: 'medium' },
    { type: 'Pattern Change', description: 'Throughput in Zone A decreased 20% vs. historical average', detected: '1 hour ago', severity: 'low' },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'error'
      case 'medium':
        return 'warning'
      case 'low':
        return 'info'
      default:
        return 'default'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'error'
      case 'medium':
        return 'warning'
      case 'low':
        return 'info'
      default:
        return 'default'
    }
  }

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
        <Psychology sx={{ fontSize: 32, color: iconColors.aiInsights }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          AI Insights
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'error.main' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Active Predictions
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {predictions.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Requiring attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'primary.main' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Optimization Opportunities
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {optimizations.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Available suggestions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'warning.main' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Anomalies Detected
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {anomalies.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                In last 24 hours
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'success.main' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Model Accuracy
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                94.2%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Prediction confidence
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Predictions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                <TrendingUp sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Predictive Insights
                </Typography>
              </Box>
              <List>
                {predictions.map((pred, index) => (
                  <Box key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Warning sx={{ color: pred.risk === 'high' ? 'error.main' : 'warning.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {pred.type}
                            </Typography>
                            <Chip
                              label={pred.risk}
                              size="small"
                              color={getRiskColor(pred.risk) as 'error' | 'warning' | 'info'}
                              sx={{ height: 18 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {pred.prediction}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Timeframe: {pred.timeframe} • Action: {pred.action}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < predictions.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Optimizations */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                <Lightbulb sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Optimization Suggestions
                </Typography>
              </Box>
              <List>
                {optimizations.map((opt, index) => (
                  <Box key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Lightbulb sx={{ color: opt.impact === 'high' ? 'error.main' : 'warning.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {opt.category}
                            </Typography>
                            <Chip
                              label={opt.impact}
                              size="small"
                              color={getImpactColor(opt.impact) as 'error' | 'warning' | 'info'}
                              sx={{ height: 18 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {opt.suggestion}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Estimated improvement: {opt.estimatedImprovement}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < optimizations.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Anomaly Detection */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
            <Warning sx={{ color: 'warning.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Anomaly Detection
            </Typography>
          </Box>
          <List>
            {anomalies.map((anomaly, index) => (
              <Box key={index}>
                <ListItem>
                  <ListItemIcon>
                    <Warning sx={{ color: anomaly.severity === 'medium' ? 'warning.main' : 'info.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {anomaly.type}
                        </Typography>
                        <Chip
                          label={anomaly.severity}
                          size="small"
                          color={anomaly.severity === 'medium' ? 'warning' : 'info'}
                          sx={{ height: 18 }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {anomaly.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Detected: {anomaly.detected}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < anomalies.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  )
}
