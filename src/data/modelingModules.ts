import type { ModulePlaceholderProps } from '@shared/ui/ModulePlaceholder'

export interface ModelingModule {
  slug: string
  name: string
  placeholder: ModulePlaceholderProps
}

export const modelingOverview: ModulePlaceholderProps = {
  name: 'Modeling',
  whatItDoes: 'Core discrete-event simulation engine that runs warehouse operations scenarios.',
  prerequisites: [
    'Validated data (orders, products, inventory)',
    'Warehouse layout',
    'Equipment specifications and quantities',
    'Process configurations',
  ],
  processSteps: [
    'Initialize warehouse environment with layout and inventory',
    'Load orders to be fulfilled',
    'Simulate equipment movement, picking, packing operations over time',
    'Track resource utilization, bottlenecks, and throughput',
    'Apply operational rules and constraints',
    'Collect detailed performance metrics at each time step',
  ],
  outputs: [
    'Performance metrics (throughput, cycle times, resource utilization)',
    'Bottleneck identification',
    'Animation and visualization of operations',
    'Event logs and timing data',
  ],
}

export const modelingModules: ModelingModule[] = [
  {
    slug: 'fast-pick-analysis',
    name: 'FastPick Analysis',
    placeholder: {
      name: 'FastPick Analysis',
      whatItDoes: 'Optimizes which products should be placed in a high-speed picking zone.',
      prerequisites: [
        'Order history with dates, products, and quantities',
        'Number of SKU slots available in fast-pick area',
        'Reslotting frequency (how often to change which products are in fast-pick)',
      ],
      processSteps: [
        'Analyze order history to identify highest velocity products',
        'Calculate how many orders could be fulfilled from fast-pick zone',
        'Simulate different fast-pick sizes (100 SKUs, 500 SKUs, etc.)',
        'Test different reslotting frequencies (weekly, monthly, etc.)',
        'Calculate efficiency improvements and consolidation opportunities',
        'Identify which products to place in fast-pick for each period',
      ],
      outputs: [
        'Optimal fast-pick size and reslotting frequency',
        'Lists of which SKUs should be in fast-pick for each time period',
        'Projected improvement metrics (orders completed, labor savings)',
        'Summary charts and tables for decision-making',
      ],
    },
  },
  {
    slug: 'affinity-analysis',
    name: 'Affinity Analysis',
    placeholder: {
      name: 'Affinity Analysis',
      whatItDoes: 'Determines which products are frequently ordered together to optimize picking strategies.',
      prerequisites: ['Order detail history showing which SKUs appear on the same orders', 'Order volume parameters'],
      processSteps: [
        'Analyze co-occurrence of products across orders',
        'Build affinity matrices showing which products are ordered together',
        'Simulate pick-to-wall or batch picking strategies',
        'Calculate optimal batch sizes based on product affinity',
        'Determine best allocation of products to picking positions',
        'Evaluate consolidation opportunities',
      ],
      outputs: [
        'Product affinity scores and groupings',
        'Recommended batch sizes for picking',
        'Optimal SKU positioning recommendations',
        'Units-per-facing and efficiency metrics',
      ],
    },
  },
  {
    slug: 'solution-selector',
    name: 'Solution Selector',
    placeholder: {
      name: 'Solution Selector',
      whatItDoes: 'Compares different automation and operational strategies to recommend the best solution.',
      prerequisites: [
        'Operational requirements (orders/hour, throughput targets)',
        'Facility constraints (space, budget)',
        'Available technology options',
      ],
      processSteps: [
        'Input operational parameters and constraints',
        'Generate multiple solution alternatives (manual picking, automation types, hybrid approaches)',
        'Score each solution on multiple criteria',
        'Calculate costs, space requirements, and performance',
        'Rank solutions based on scoring methodology',
      ],
      outputs: [
        'Scored comparison of solution alternatives',
        'Recommendation with justification',
        'Trade-off analysis between cost, performance, and complexity',
      ],
    },
  },
  {
    slug: 'storage-sizing',
    name: 'Storage Sizing',
    placeholder: {
      name: 'Storage Sizing',
      whatItDoes: 'Calculates required storage capacity and slot counts for inventory management.',
      prerequisites: [
        'Inventory data (SKU characteristics, velocities, quantities)',
        'Days-on-hand targets',
        'Container/slot specifications',
        'Storage policies and rules',
      ],
      processSteps: [
        'Analyze inventory profiles and movement patterns',
        'Calculate required slot counts by storage type',
        'Apply min/max inventory rules',
        'Account for replenishment frequency',
        'Simulate inventory levels over time',
        'Size storage areas for different product categories',
      ],
      outputs: [
        'Required slot counts by storage type',
        'Storage space requirements (square footage, cubic capacity)',
        'Inventory level projections',
        'Storage configuration recommendations',
      ],
    },
  },
  {
    slug: 'pick-and-pass',
    name: 'Pick and Pass',
    placeholder: {
      name: 'Pick and Pass',
      whatItDoes: 'Models zone-based picking where orders pass through multiple picking zones.',
      prerequisites: [
        'Order data with line items',
        'Zone definitions and product assignments',
        'Picker counts per zone',
        'Conveyor and material handling specifications',
      ],
      processSteps: [
        'Release orders into the picking system',
        'Build picking batches for each zone',
        'Simulate pickers working in parallel across zones',
        'Pass containers between zones on conveyors',
        'Track picking rates and zone utilization',
        'Handle packing and order completion',
      ],
      outputs: [
        'Zone-by-zone performance metrics',
        'Picker utilization by zone',
        'Order throughput rates',
        'Bottleneck identification by zone',
        'Recommended picker distribution',
      ],
    },
  },
  {
    slug: 'pallet-ant',
    name: 'Pallet Ant',
    placeholder: {
      name: 'Pallet Ant',
      whatItDoes: 'Simulates automated pallet-moving robots (AMRs) for material transport.',
      prerequisites: [
        'Warehouse layout with travel paths',
        'Pallet storage and workstation locations',
        'Robot specifications (speed, capacity, quantity)',
        'Order/pallet movement requirements',
      ],
      processSteps: [
        'Generate pallet movement tasks',
        'Dispatch robots to pallet locations',
        'Simulate robot navigation and traffic management',
        'Transport pallets to destination workstations',
        'Queue pallets at stations for processing',
        'Handle robot charging and availability',
      ],
      outputs: [
        'Robot fleet size requirements',
        'Travel times and distances',
        'Robot utilization metrics',
        'Station queue times and throughput',
        'Traffic congestion identification',
      ],
    },
  },
  {
    slug: 'pick-to-amr',
    name: 'Pick to AMR',
    placeholder: {
      name: 'Pick to AMR',
      whatItDoes: 'Models picking operations where workers pick from static locations into mobile robots.',
      prerequisites: [
        'Pick face layout and product locations',
        'AMR specifications and quantity',
        'Order data with pick requirements',
        'Picker specifications',
      ],
      processSteps: [
        'Route AMRs to picking zones',
        'Assign orders to AMRs and pickers',
        'Simulate pickers walking to locations and picking into AMR',
        'Navigate AMRs between picking positions',
        'Complete orders and route AMRs to packing/sortation',
        'Manage AMR fleet and traffic',
      ],
      outputs: [
        'Required AMR fleet size',
        'Picker productivity metrics',
        'AMR utilization and idle time',
        'Order completion rates',
        'Zone performance analysis',
      ],
    },
  },
  {
    slug: 'amr-put-wall',
    name: 'AMR Put-wall',
    placeholder: {
      name: 'AMR Put-wall',
      whatItDoes: 'Simulates put-wall sortation systems where robots deliver items to be sorted into orders.',
      prerequisites: [
        'Put-wall configuration (number of walls, slots per wall)',
        'Order profiles and volumes',
        'AMR/robot specifications',
        'Product and tote data',
      ],
      processSteps: [
        'Allocate orders to put-wall slots',
        'Build picking batches based on slot assignments',
        'Route robots with picked items to put-walls',
        'Simulate sorting items into order slots',
        'Complete orders and clear slots for new orders',
        'Optimize slot allocation for maximum affinity',
      ],
      outputs: [
        'Put-wall utilization and throughput',
        'Robot requirements and utilization',
        'Order completion times',
        'Slot efficiency metrics',
        'Recommended put-wall configuration',
      ],
    },
  },
  {
    slug: 'pick-path-generator',
    name: 'Pick Path Generator',
    placeholder: {
      name: 'Pick Path Generator',
      whatItDoes: 'Calculates optimal routes for pickers walking through warehouse aisles.',
      prerequisites: [
        'Warehouse layout (aisles, bays, breaks)',
        'Pick locations for orders',
        'Travel speed and pick time parameters',
      ],
      processSteps: [
        'Identify all pick locations for an order',
        'Generate possible paths through aisles',
        'Calculate travel distances considering aisle constraints',
        'Solve traveling salesman problem for optimal route',
        'Account for one-way aisles and cross-aisles',
        'Calculate total pick time including travel and handling',
      ],
      outputs: [
        'Optimized pick paths with turn-by-turn routing',
        'Total pick time and distance',
        'Comparison of routing strategies',
        'Pick path visualization',
      ],
    },
  },
  {
    slug: 'layer-gantry',
    name: 'Layer Gantry',
    placeholder: {
      name: 'Layer Gantry',
      whatItDoes: 'Simulates layer-picking operations using overhead gantry cranes for pallet building.',
      prerequisites: [
        'Order data requiring layer picks',
        'Pallet building specifications',
        'Gantry system parameters (speed, capacity, positions)',
        'Product layer configurations',
      ],
      processSteps: [
        'Queue orders requiring layer picks',
        'Allocate source pallets to gantry positions',
        'Simulate gantry crane movements to pick layers',
        'Build order pallets layer-by-layer',
        'Handle pallet rotation and orientation',
        'Track gantry utilization and throughput',
      ],
      outputs: [
        'Throughput capacity (orders/pallets per hour)',
        'Gantry crane utilization metrics',
        'Order completion times',
        'Recommendations for gantry positions and equipment count',
      ],
    },
  },
]


