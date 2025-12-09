/**
 * Hub configuration and constants
 * Defines the two main engines: Design Engine and Intelligence Engine
 */

export const HUBS = {
  DESIGN: 'design',
  OPS_INTELLIGENCE: 'ops_intelligence',
} as const

export type HubType = typeof HUBS[keyof typeof HUBS]

export interface Hub {
  id: HubType
  name: string
  shortName: string
  description: string
  icon: string // Icon name for Material-UI
  color: string
}

export const HUB_DEFINITIONS: Record<HubType, Hub> = {
  [HUBS.DESIGN]: {
    id: HUBS.DESIGN,
    name: 'Design Engine',
    shortName: 'Design',
    description: 'Modeling, route distance, and facility design tools',
    icon: 'Extension',
    color: '#BDD9F2',
  },
  [HUBS.OPS_INTELLIGENCE]: {
    id: HUBS.OPS_INTELLIGENCE,
    name: 'Intelligence Engine',
    shortName: 'Intelligence',
    description: 'Real-time warehouse analytics and operational insights',
    icon: 'Analytics',
    color: '#4CAF50',
  },
}

/**
 * Get hub definition by ID
 */
export function getHub(id: HubType): Hub {
  return HUB_DEFINITIONS[id]
}

/**
 * Get all available hubs
 */
export function getAllHubs(): Hub[] {
  return Object.values(HUB_DEFINITIONS)
}

