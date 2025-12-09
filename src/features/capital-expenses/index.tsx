import { ModulePlaceholder } from '@shared/ui/ModulePlaceholder'

const CapitalExpensesFeature = () => (
  <ModulePlaceholder
    name="Capital Expenses"
    whatItDoes="Estimates equipment and infrastructure costs for warehouse solutions."
    prerequisites={[
      'Solution design and equipment specifications',
      'Equipment counts (robots, conveyors, workstations)',
      'Facility requirements',
    ]}
    processSteps={[
      'Catalog all required equipment',
      'Apply unit costs to equipment quantities',
      'Calculate installation and integration costs',
      'Add facility infrastructure costs',
      'Sum total capital investment',
      'Generate cost breakdown by category',
    ]}
    outputs={[
      'Total capital expense (CapEx) estimate',
      'Cost breakdown by equipment type',
      'Return on investment (ROI) analysis inputs',
      'Budget justification documentation',
    ]}
  />
)

export default CapitalExpensesFeature

