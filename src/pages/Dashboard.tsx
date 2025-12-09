import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Box } from '@mui/material'
import {
  Block,
  Merge,
  ViewModule,
  Extension,
  Calculate,
  AttachMoney,
  Route as RouteIcon,
  Logout,
  PrecisionManufacturing,
  Speed,
  Inventory,
  Warning,
  ControlCamera,
  Description,
  Psychology,
} from '@mui/icons-material'
import { AppBar, Sidebar, MainContent } from '@shared/ui'
import { useFeatureFlags, FEATURES } from '@shared/hooks/useFeatureFlag'
import { modelingModules } from '../data/modelingModules'
import { iconColors } from '../theme/theme'
import { HUBS } from '../config/hubs'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const featureFlags = useFeatureFlags({
    dataInvalidator: FEATURES.DATA_INVALIDATOR,
    dataSynthesis: FEATURES.DATA_SYNTHESIS,
    layoutManager: FEATURES.LAYOUT_MANAGER,
    modeling: FEATURES.MODELING,
    laborCalculator: FEATURES.LABOR_CALCULATOR,
    capitalExpenses: FEATURES.CAPITAL_EXPENSES,
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Determine current hub from URL
  const getCurrentHub = (): typeof HUBS.DESIGN | typeof HUBS.OPS_INTELLIGENCE => {
    const path = location.pathname
    if (path.startsWith('/ops')) {
      return HUBS.OPS_INTELLIGENCE
    }
    return HUBS.DESIGN
  }

  const currentHub = getCurrentHub()

  // Design Engine menu items
  const designHubMenuItems = [
    { 
      text: 'Data Invalidator', 
      path: '/data-invalidator', 
      icon: <Block />,
          iconColor: iconColors.dataInvalidator,
      comingSoon: true,
      enabled: featureFlags.dataInvalidator,
    },
    { 
      text: 'Data Synthesis', 
      path: '/data-synthesis', 
      icon: <Merge />,
          iconColor: iconColors.dataSynthesis,
      comingSoon: true,
      enabled: featureFlags.dataSynthesis,
    },
    { 
      text: 'Capital Expenses', 
      path: '/capital-expenses', 
      icon: <AttachMoney />,
          iconColor: iconColors.capitalExpenses,
      comingSoon: true,
      enabled: featureFlags.capitalExpenses,
    },
    { 
      text: 'Labor Calculator', 
      path: '/labor-calculator', 
      icon: <Calculate />,
          iconColor: iconColors.laborCalculator,
      comingSoon: true,
      enabled: featureFlags.laborCalculator,
    },
    {
      text: 'Modeling',
      path: '/modeling', 
      icon: <Extension />,
          iconColor: iconColors.modeling,
      comingSoon: true,
      enabled: featureFlags.modeling,
      subItems: modelingModules.map((module) => ({
        text: module.name,
        path: `/modeling/${module.slug}`,
      })),
    },
    { 
      text: 'Route Distance Calculator', 
      path: '/route-distance', 
      icon: <RouteIcon />,
          iconColor: iconColors.routeDistanceCalculator,
      comingSoon: false,
    },
    { 
      text: 'Layout Manager', 
      path: '/layout-manager', 
      icon: <ViewModule />,
          iconColor: iconColors.layoutManager,
      comingSoon: true,
      enabled: featureFlags.layoutManager,
    },
  ]

  // Intelligence Engine menu items
  const opsIntelligenceMenuItems = [
    {
      text: 'Command Center',
      path: '/ops/command-center',
      icon: <ControlCamera />,
      iconColor: iconColors.commandCenter,
      comingSoon: false,
      enabled: true,
    },
    {
      text: 'Equipment Performance',
      path: '/ops/equipment-performance',
      icon: <PrecisionManufacturing />,
      iconColor: iconColors.equipmentPerformance,
      comingSoon: false,
      enabled: true,
    },
    {
      text: 'Workforce Performance',
      path: '/ops/workforce-performance',
      icon: <Speed />,
      iconColor: iconColors.workforcePerformance,
      comingSoon: false,
      enabled: true,
    },
    {
      text: 'Inventory & Storage',
      path: '/ops/inventory-storage',
      icon: <Inventory />,
      iconColor: iconColors.inventoryStorage,
      comingSoon: false,
      enabled: true,
    },
    {
      text: 'Alerts & Diagnostics',
      path: '/ops/alerts-diagnostics',
      icon: <Warning />,
      iconColor: iconColors.alertsDiagnostics,
      comingSoon: false,
      enabled: true,
    },
    {
      text: 'Log Viewer',
      path: '/ops/log-viewer',
      icon: <Description />,
      iconColor: iconColors.logViewer,
      comingSoon: false,
      enabled: true,
    },
    {
      text: 'AI Insights',
      path: '/ops/ai-insights',
      icon: <Psychology />,
      iconColor: iconColors.aiInsights,
      comingSoon: false,
      enabled: true,
    },
  ]

  // Select menu items based on current hub
  const menuItems = currentHub === HUBS.OPS_INTELLIGENCE ? opsIntelligenceMenuItems : designHubMenuItems

  const handleLogout = () => {
    navigate('/login', { replace: true })
  }

  const sidebarItems = menuItems
    .filter((item) => item.enabled !== false)
    .map((item) => {
      const hasSubItems = 'subItems' in item && item.subItems !== undefined
      return {
        text: item.text,
        path: item.path,
        icon: item.icon,
        iconColor: item.iconColor,
        comingSoon: item.comingSoon || false,
        selected: location.pathname === item.path || (hasSubItems && item.subItems.some((sub: { path: string }) => location.pathname === sub.path)),
        onClick: hasSubItems ? undefined : () => navigate(item.path),
        subItems: hasSubItems ? item.subItems.map((subItem: { text: string; path: string }) => ({
          text: subItem.text,
          path: subItem.path,
          selected: location.pathname === subItem.path,
          onClick: () => navigate(subItem.path),
        })) : undefined,
      }
    })

  return (
    <Box 
      sx={{ 
        display: 'flex',
        width: '100%',
        overflowX: 'hidden', // Prevent horizontal scroll
      }}
    >
      <AppBar
        userMenuItems={[
          {
            label: 'Logout',
            icon: <Logout fontSize="small" />,
            onClick: handleLogout,
          },
        ]}
        onMenuClick={handleDrawerToggle}
      />
      <Sidebar 
        items={sidebarItems}
        mobileOpen={mobileOpen}
        onMobileClose={handleDrawerToggle}
      />
      <MainContent>
        <Outlet />
      </MainContent>
    </Box>
  )
}

export const DashboardHome = () => {
  return (
    <Box>
    </Box>
  )
}


export default Dashboard


