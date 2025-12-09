/**
 * Alerts & Diagnostics
 * 
 * Consolidates operational exceptions and system-level diagnostics into a
 * single view. Helps teams quickly identify issues that require attention—
 * whether operational, device-related, or system-generated.
 */
import { useState } from 'react'
import { Box, Typography, Card, CardContent, Grid, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Tabs, Tab, useTheme, LinearProgress } from '@mui/material'
import { Warning, Info, CheckCircle, Refresh, History, BugReport, Error as ErrorIcon } from '@mui/icons-material'
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
      id={`alerts-tabpanel-${index}`}
      aria-labelledby={`alerts-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function AlertsDiagnostics() {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  const alerts = [
    { id: 'ALT-001', type: 'Routing Error', severity: 'high', source: 'Conveyor CV-001', message: 'Tote blocked at junction J-12', time: '2 min ago', status: 'active' },
    { id: 'ALT-002', type: 'Device Fault', severity: 'critical', source: 'Shuttle SH-003', message: 'Motor temperature exceeded threshold', time: '15 min ago', status: 'active' },
    { id: 'ALT-003', type: 'Short Pick', severity: 'medium', source: 'Picking Zone A', message: 'SKU-12345 not found at location', time: '8 min ago', status: 'resolved' },
    { id: 'ALT-004', type: 'Workflow Interruption', severity: 'medium', source: 'Packing Station PK-002', message: 'Scan failed - manual review required', time: '5 min ago', status: 'active' },
    { id: 'ALT-005', type: 'System Warning', severity: 'low', source: 'Database', message: 'Query response time elevated', time: '1 hour ago', status: 'active' },
    { id: 'ALT-006', type: 'Queue Delay', severity: 'medium', source: 'Shipping Dock', message: 'Queue length exceeded threshold (45 totes)', time: '12 min ago', status: 'active' },
  ]


  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ErrorIcon sx={{ color: 'error.main', fontSize: 18 }} />
      case 'high':
        return <Warning sx={{ color: 'warning.main', fontSize: 18 }} />
      case 'medium':
        return <Info sx={{ color: 'info.main', fontSize: 18 }} />
      default:
        return <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'error'
      case 'high':
        return 'warning'
      case 'medium':
        return 'info'
      default:
        return 'default'
    }
  }

  const activeAlerts = alerts.filter(a => a.status === 'active')
  const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical' || a.severity === 'high')

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
        <Warning sx={{ fontSize: 32, color: iconColors.alertsDiagnostics }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Alerts & Diagnostics
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'error.main' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Critical Alerts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'error.main' }}>
                {criticalAlerts.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Requiring immediate attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'warning.main' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Active Alerts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                {activeAlerts.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total unresolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'success.main' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Resolved Today
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
                {alerts.filter(a => a.status === 'resolved').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                In last 24 hours
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'primary.main' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                System Health
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {Math.round(((alerts.length - activeAlerts.length) / alerts.length) * 100)}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Operational
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
          aria-label="alerts diagnostics tabs"
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
            icon={<Warning />} 
            iconPosition="start"
            label="Overview" 
            id="alerts-tab-0"
            aria-controls="alerts-tabpanel-0"
          />
          <Tab 
            icon={<History />} 
            iconPosition="start"
            label="History" 
            id="alerts-tab-1"
            aria-controls="alerts-tabpanel-1"
          />
          <Tab 
            icon={<BugReport />} 
            iconPosition="start"
            label="Diagnostics" 
            id="alerts-tab-2"
            aria-controls="alerts-tabpanel-2"
          />
        </Tabs>
      </Card>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Active Alerts
              </Typography>
              <Chip
                icon={<Refresh />}
                label="Auto-refresh"
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Alert ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeAlerts.map((alert) => (
                    <TableRow key={alert.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{alert.id}</TableCell>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getSeverityIcon(alert.severity)}
                          <Chip
                            label={alert.severity}
                            size="small"
                            color={getSeverityColor(alert.severity) as 'error' | 'warning' | 'info'}
                            sx={{ height: 20, textTransform: 'capitalize' }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell color="text.secondary">{alert.time}</TableCell>
                      <TableCell>
                        <Chip
                          label={alert.status}
                          size="small"
                          color="error"
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

      {/* History Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Alert History (Last 24 Hours)
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Alert ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{alert.id}</TableCell>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getSeverityIcon(alert.severity)}
                          <Chip
                            label={alert.severity}
                            size="small"
                            color={getSeverityColor(alert.severity) as 'error' | 'warning' | 'info'}
                            sx={{ height: 20, textTransform: 'capitalize' }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell color="text.secondary">{alert.time}</TableCell>
                      <TableCell>
                        <Chip
                          label={alert.status}
                          size="small"
                          color={alert.status === 'active' ? 'error' : 'success'}
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

      {/* Diagnostics Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              System Diagnostics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card elevation={0} sx={{ bgcolor: 'grey.50', p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Alert Types Distribution
                  </Typography>
                  {['Routing Error', 'Device Fault', 'Short Pick', 'Workflow Interruption', 'System Warning', 'Queue Delay'].map((type) => {
                    const count = alerts.filter(a => a.type === type).length
                    return (
                      <Box key={type} sx={{ mb: 1.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">{type}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{count}</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(count / alerts.length) * 100}
                          sx={{ height: 6, borderRadius: 1 }}
                          color="primary"
                        />
                      </Box>
                    )
                  })}
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card elevation={0} sx={{ bgcolor: 'grey.50', p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Severity Breakdown
                  </Typography>
                  {['critical', 'high', 'medium', 'low'].map((severity) => {
                    const count = alerts.filter(a => a.severity === severity).length
                    return (
                      <Box key={severity} sx={{ mb: 1.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getSeverityIcon(severity)}
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{severity}</Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{count}</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(count / alerts.length) * 100}
                          sx={{ height: 6, borderRadius: 1 }}
                          color={getSeverityColor(severity) as 'error' | 'warning' | 'info'}
                        />
                      </Box>
                    )
                  })}
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>
    </Container>
  )
}
