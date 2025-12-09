import { ReactNode } from 'react'
import { useFeatureFlag, FEATURES } from '../hooks/useFeatureFlag'
import type { FeatureKey } from '../../config/featureFlags'

interface FeatureFlagProps {
  /**
   * The feature key to check
   */
  feature: FeatureKey
  /**
   * Content to render when feature is enabled
   */
  children: ReactNode
  /**
   * Optional fallback content when feature is disabled
   */
  fallback?: ReactNode
}

/**
 * Component to conditionally render content based on feature flags
 * 
 * @example
 * ```tsx
 * <FeatureFlag feature={FEATURES.NEW_DASHBOARD}>
 *   <NewDashboard />
 * </FeatureFlag>
 * 
 * <FeatureFlag 
 *   feature={FEATURES.EXPERIMENTAL_API}
 *   fallback={<OldComponent />}
 * >
 *   <NewComponent />
 * </FeatureFlag>
 * ```
 */
export function FeatureFlag({ feature, children, fallback = null }: FeatureFlagProps) {
  const isEnabled = useFeatureFlag(feature)
  
  if (isEnabled) {
    return <>{children}</>
  }
  
  return <>{fallback}</>
}

// Re-export FEATURES for convenience
export { FEATURES }

