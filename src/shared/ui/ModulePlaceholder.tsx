import { Box, Typography, Paper, Chip, useTheme } from '@mui/material'
import type { ChipProps } from '@mui/material'

export interface ModuleDetailSection {
  title: string
  whatItDoes?: string
  prerequisites?: string[]
  process?: string[]
  outputs?: string[]
}

export interface ModulePlaceholderProps {
  name: string
  description?: string
  expectedFeatures?: string[]
  whatItDoes?: string
  prerequisites?: string[]
  processSteps?: string[]
  outputs?: string[]
  sections?: ModuleDetailSection[]
  statusLabel?: string
  statusColor?: ChipProps['color']
}

const renderList = (items?: string[]) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <Box component="ul" sx={{ pl: 3, mb: 0 }}>
      {items.map((item, index) => (
        <Typography
          key={index}
          component="li"
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  )
}

export const ModulePlaceholder = ({
  name,
  description,
  expectedFeatures,
  whatItDoes,
  prerequisites,
  processSteps,
  outputs,
  sections,
  statusLabel = 'Coming Soon',
  statusColor = 'warning',
}: ModulePlaceholderProps) => {
  const theme = useTheme()

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Chip label={statusLabel} color={statusColor} sx={{ mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          {name}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {description}
          </Typography>
        )}
      </Box>

      {whatItDoes && (
        <Paper sx={{ p: 3, mb: 3, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" gutterBottom>
            What it does
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {whatItDoes}
          </Typography>
        </Paper>
      )}

      {prerequisites && prerequisites.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" gutterBottom>
            Prerequisites
          </Typography>
          {renderList(prerequisites)}
        </Paper>
      )}

      {processSteps && processSteps.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" gutterBottom>
            Process
          </Typography>
          {renderList(processSteps)}
        </Paper>
      )}

      {outputs && outputs.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" gutterBottom>
            Output
          </Typography>
          {renderList(outputs)}
        </Paper>
      )}

      {expectedFeatures && expectedFeatures.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" gutterBottom>
            What to Expect
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            When this module goes live, you'll be able to:
          </Typography>
          {renderList(expectedFeatures)}
        </Paper>
      )}

      {sections && sections.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {sections.map((section, index) => (
            <Paper key={section.title} sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {index + 1}. {section.title}
              </Typography>
              {section.whatItDoes && (
                <Typography variant="body1" color="text.primary" paragraph>
                  <strong>What it does:</strong> {section.whatItDoes}
                </Typography>
              )}
              {section.prerequisites && section.prerequisites.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Prerequisites
                  </Typography>
                  {renderList(section.prerequisites)}
                </Box>
              )}
              {section.process && section.process.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Process
                  </Typography>
                  {renderList(section.process)}
                </Box>
              )}
              {section.outputs && section.outputs.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Output
                  </Typography>
                  {renderList(section.outputs)}
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  )
}
