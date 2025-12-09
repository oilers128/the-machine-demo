/**
 * Feature Flags Configuration
 * 
 * Features can be enabled/disabled via environment variables.
 * In development, features default to enabled unless explicitly disabled.
 * In production, features default to disabled unless explicitly enabled.
 * 
 * Usage in .env:
 *   VITE_FEATURE_NEW_DASHBOARD=true
 *   VITE_FEATURE_EXPERIMENTAL_API=false
 */

type FeatureFlag = {
  key: string
  name: string
  description?: string
  defaultDev?: boolean
  defaultProd?: boolean
}

// Define all feature flags here
export const FEATURES = {
  // Dashboard modules
  DATA_INVALIDATOR: 'DATA_INVALIDATOR',
  DATA_SYNTHESIS: 'DATA_SYNTHESIS',
  LAYOUT_MANAGER: 'LAYOUT_MANAGER',
  MODELING: 'MODELING',
  LABOR_CALCULATOR: 'LABOR_CALCULATOR',
  CAPITAL_EXPENSES: 'CAPITAL_EXPENSES',
  ROUTE_DISTANCE_CALCULATOR: 'ROUTE_DISTANCE_CALCULATOR',
  
  // Example: New dashboard redesign
  NEW_DASHBOARD: 'NEW_DASHBOARD',
  
  // Example: Experimental API endpoints
  EXPERIMENTAL_API: 'EXPERIMENTAL_API',
  
  // Example: Advanced route distance features
  ADVANCED_ROUTE_FEATURES: 'ADVANCED_ROUTE_FEATURES',
  
  // Add more features as needed
} as const

export type FeatureKey = typeof FEATURES[keyof typeof FEATURES]

// Feature flag definitions with metadata
const featureDefinitions: Record<FeatureKey, FeatureFlag> = {
  // Dashboard modules
  [FEATURES.DATA_INVALIDATOR]: {
    key: FEATURES.DATA_INVALIDATOR,
    name: 'Data Invalidator',
    description: 'Data Invalidator tool for invalidating data entries',
    defaultDev: true,
    defaultProd: false,
  },
  [FEATURES.DATA_SYNTHESIS]: {
    key: FEATURES.DATA_SYNTHESIS,
    name: 'Data Synthesis',
    description: 'Data Synthesis tool for combining and synthesizing data',
    defaultDev: true,
    defaultProd: false,
  },
  [FEATURES.LAYOUT_MANAGER]: {
    key: FEATURES.LAYOUT_MANAGER,
    name: 'Layout Manager',
    description: 'Layout Manager tool for managing facility layouts',
    defaultDev: false,
    defaultProd: false,
  },
  [FEATURES.MODELING]: {
    key: FEATURES.MODELING,
    name: 'Modeling',
    description: 'Modeling section for creating and managing models',
    defaultDev: true,
    defaultProd: false,
  },
  [FEATURES.LABOR_CALCULATOR]: {
    key: FEATURES.LABOR_CALCULATOR,
    name: 'Labor Calculator',
    description: 'Labor Calculator tool for calculating labor costs',
    defaultDev: true,
    defaultProd: false,
  },
  [FEATURES.CAPITAL_EXPENSES]: {
    key: FEATURES.CAPITAL_EXPENSES,
    name: 'Capital Expenses',
    description: 'Capital Expenses tool for managing capital expenditure',
    defaultDev: true,
    defaultProd: false,
  },
  [FEATURES.ROUTE_DISTANCE_CALCULATOR]: {
    key: FEATURES.ROUTE_DISTANCE_CALCULATOR,
    name: 'Route Distance Calculator',
    description: 'Route Distance Calculator for calculating route distances',
    defaultDev: true,
    defaultProd: true, // This one is already in production, so default to enabled
  },
  
  // Example features
  [FEATURES.NEW_DASHBOARD]: {
    key: FEATURES.NEW_DASHBOARD,
    name: 'New Dashboard',
    description: 'Redesigned dashboard with improved UX',
    defaultDev: true,
    defaultProd: false,
  },
  [FEATURES.EXPERIMENTAL_API]: {
    key: FEATURES.EXPERIMENTAL_API,
    name: 'Experimental API',
    description: 'Access to experimental API endpoints',
    defaultDev: true,
    defaultProd: false,
  },
  [FEATURES.ADVANCED_ROUTE_FEATURES]: {
    key: FEATURES.ADVANCED_ROUTE_FEATURES,
    name: 'Advanced Route Features',
    description: 'Advanced features for route distance calculations',
    defaultDev: true,
    defaultProd: false,
  },
}

/**
 * Check if a feature is enabled
 * 
 * Priority:
 * 1. Environment variable (VITE_FEATURE_<KEY>)
 * 2. Default based on environment (dev vs prod)
 * 
 * @param featureKey - The feature key to check
 * @returns true if the feature is enabled, false otherwise
 */
export function isFeatureEnabled(featureKey: FeatureKey): boolean {
  const feature = featureDefinitions[featureKey]
  if (!feature) {
    console.warn(`[FeatureFlags] Unknown feature: ${featureKey}`)
    return false
  }

  const envKey = `VITE_FEATURE_${featureKey}`
  const envValue = import.meta.env[envKey]

  // If explicitly set in environment, use that value
  if (envValue !== undefined) {
    return envValue === 'true' || envValue === '1'
  }

  // Otherwise, use default based on environment
  const isDev = import.meta.env.DEV
  return isDev ? (feature.defaultDev ?? false) : (feature.defaultProd ?? false)
}

/**
 * Get all feature flags and their current status
 * Useful for debugging or admin panels
 */
export function getAllFeatureFlags(): Record<string, { enabled: boolean; definition: FeatureFlag }> {
  const result: Record<string, { enabled: boolean; definition: FeatureFlag }> = {}
  
  Object.values(FEATURES).forEach((key) => {
    result[key] = {
      enabled: isFeatureEnabled(key),
      definition: featureDefinitions[key],
    }
  })
  
  return result
}

/**
 * Get feature flag metadata
 */
export function getFeatureDefinition(featureKey: FeatureKey): FeatureFlag | undefined {
  return featureDefinitions[featureKey]
}

