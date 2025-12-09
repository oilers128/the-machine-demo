import { useMemo } from 'react'
import { isFeatureEnabled, type FeatureKey } from '../../config/featureFlags'

/**
 * React hook to check if a feature is enabled
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const isNewDashboardEnabled = useFeatureFlag(FEATURES.NEW_DASHBOARD)
 *   
 *   if (isNewDashboardEnabled) {
 *     return <NewDashboard />
 *   }
 *   
 *   return <OldDashboard />
 * }
 * ```
 */
export function useFeatureFlag(featureKey: FeatureKey): boolean {
  return useMemo(() => isFeatureEnabled(featureKey), [featureKey])
}

/**
 * React hook to check multiple feature flags at once
 * 
 * @example
 * ```tsx
 * const { newDashboard, experimentalApi } = useFeatureFlags({
 *   newDashboard: FEATURES.NEW_DASHBOARD,
 *   experimentalApi: FEATURES.EXPERIMENTAL_API,
 * })
 * ```
 */
export function useFeatureFlags<T extends Record<string, FeatureKey>>(
  flags: T
): Record<keyof T, boolean> {
  return useMemo(() => {
    const result = {} as Record<keyof T, boolean>
    Object.entries(flags).forEach(([key, featureKey]) => {
      result[key as keyof T] = isFeatureEnabled(featureKey)
    })
    return result
  }, [flags])
}

// Re-export FEATURES for convenience
export { FEATURES } from '../../config/featureFlags'

