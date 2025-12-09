import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@pages/LoginPage'
import Dashboard, { DashboardHome } from '@pages/Dashboard'
import { RouteDistanceCalculator, RouteDistanceDatabase } from '@features/route-distance'
import DataInvalidatorFeature from '@features/data-invalidator'
import DataSynthesisFeature from '@features/data-synthesis'
import LayoutManagerFeature from '@features/layout-manager'
import ModelingOverview, { modelingModuleRoutes } from '@features/modeling'
import LaborCalculatorFeature from '@features/labor-calculator'
import CapitalExpensesFeature from '@features/capital-expenses'
import {
  CommandCenter,
  EquipmentPerformance,
  WorkforcePerformance,
  InventoryStorage,
  AlertsDiagnostics,
  LogViewer,
  AIInsights,
} from '@features/ops-intelligence'
import { isFeatureEnabled, FEATURES as FEATURE_KEYS } from '../../config/featureFlags'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={<Dashboard />}
        >
          <Route index element={<Navigate to="/ops/command-center" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="data-invalidator" element={<DataInvalidatorFeature />} />
          <Route path="data-synthesis" element={<DataSynthesisFeature />} />
          {isFeatureEnabled(FEATURE_KEYS.LAYOUT_MANAGER) && (
            <Route path="layout-manager" element={<LayoutManagerFeature />} />
          )}
          <Route path="modeling" element={<ModelingOverview />} />
          {modelingModuleRoutes.map((route) => (
            <Route key={route.path} path={`modeling/${route.path}`} element={route.element} />
          ))}
          <Route path="labor-calculator" element={<LaborCalculatorFeature />} />
          <Route path="capital-expenses" element={<CapitalExpensesFeature />} />
          <Route path="route-distance" element={<RouteDistanceCalculator />} />
          <Route path="route-distance/database" element={<RouteDistanceDatabase />} />
          {/* Intelligence Engine routes */}
          <Route path="ops" element={<Navigate to="/ops/command-center" replace />} />
          <Route path="ops/command-center" element={<CommandCenter />} />
          <Route path="ops/equipment-performance" element={<EquipmentPerformance />} />
          <Route path="ops/workforce-performance" element={<WorkforcePerformance />} />
          <Route path="ops/inventory-storage" element={<InventoryStorage />} />
          <Route path="ops/alerts-diagnostics" element={<AlertsDiagnostics />} />
          <Route path="ops/log-viewer" element={<LogViewer />} />
          <Route path="ops/ai-insights" element={<AIInsights />} />
          <Route path="*" element={<Navigate to="/ops/command-center" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


