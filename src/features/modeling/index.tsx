import { ModulePlaceholder } from '@shared/ui/ModulePlaceholder'
import { modelingOverview, modelingModules } from '../../data/modelingModules'

export const ModelingOverview = () => <ModulePlaceholder {...modelingOverview} />

export const modelingModuleRoutes = modelingModules.map((module) => ({
  path: module.slug,
  name: module.name,
  element: <ModulePlaceholder {...module.placeholder} />,
}))

export default ModelingOverview

