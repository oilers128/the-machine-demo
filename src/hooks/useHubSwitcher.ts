/**
 * Hook for managing engine switching and user preferences
 * Supports: Design Engine and Intelligence Engine
 */
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { HubType, HUBS } from '../config/hubs'

interface UseHubSwitcherReturn {
  availableHubs: HubType[]
  currentHub: HubType | null
  defaultHub: HubType | null
  showSwitcher: boolean
  switchHub: (hubId: HubType) => void
  setAsDefault: (hubId: HubType) => Promise<void>
  isLoading: boolean
}

/**
 * Hook to manage hub switching functionality
 * 
 * For now, returns mock data. In production, this would:
 * - Fetch available hubs from backend API
 * - Fetch user preferences (default hub)
 * - Update preferences when user sets default
 */
export function useHubSwitcher(): UseHubSwitcherReturn {
  const navigate = useNavigate()
  const location = useLocation()
  const [availableHubs] = useState<HubType[]>([HUBS.DESIGN, HUBS.OPS_INTELLIGENCE])
  const [defaultHub, setDefaultHub] = useState<HubType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Determine current hub from URL path
  const getCurrentHub = (): HubType | null => {
    const path = location.pathname
    if (path.startsWith('/ops')) {
      return HUBS.OPS_INTELLIGENCE
    }
    if (path.startsWith('/design') || path.startsWith('/dashboard') || path.startsWith('/route-distance') || 
        path.startsWith('/modeling') || path.startsWith('/data-invalidator') || path.startsWith('/data-synthesis') ||
        path.startsWith('/capital-expenses') || path.startsWith('/labor-calculator') || path.startsWith('/layout-manager')) {
      return HUBS.DESIGN
    }
    return null
  }

  const currentHub = getCurrentHub()

  // Load user preferences (mock for now)
  useEffect(() => {
    const loadPreferences = async () => {
      setIsLoading(true)
      try {
        // TODO: Replace with actual API call
        // const response = await api.get('/api/user/preferences')
        // setDefaultHub(response.defaultHub)
        
        // For now, check localStorage
        const savedDefault = localStorage.getItem('the-machine-default-hub') as HubType | null
        if (savedDefault && availableHubs.includes(savedDefault)) {
          setDefaultHub(savedDefault)
        }
      } catch (error) {
        console.error('Failed to load hub preferences:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPreferences()
  }, [availableHubs])

  const switchHub = (hubId: HubType) => {
    // Navigate to hub's main route
    if (hubId === HUBS.DESIGN) {
      navigate('/dashboard', { replace: true })
    } else if (hubId === HUBS.OPS_INTELLIGENCE) {
      navigate('/ops/command-center', { replace: true })
    }
  }

  const setAsDefault = async (hubId: HubType) => {
    try {
      // TODO: Replace with actual API call
      // await api.put('/api/user/preferences/default-hub', { hub: hubId })
      
      // For now, save to localStorage
      localStorage.setItem('the-machine-default-hub', hubId)
      setDefaultHub(hubId)
    } catch (error) {
      console.error('Failed to set default hub:', error)
      throw error
    }
  }

  return {
    availableHubs,
    currentHub,
    defaultHub,
    showSwitcher: availableHubs.length > 1,
    switchHub,
    setAsDefault,
    isLoading,
  }
}

