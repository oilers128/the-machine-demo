/**
 * Hub Switcher Component
 * Allows users to switch between Design Engine and Intelligence Engine
 */
import {
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material'
import { Extension, Analytics } from '@mui/icons-material'
import { HubType, HUBS, HUB_DEFINITIONS } from '../../../config/hubs'
import { useHubSwitcher } from '../../../hooks/useHubSwitcher'

interface HubSwitcherProps {
  /** Optional custom styling */
  sx?: object
}

const HUB_ICONS: Record<HubType, typeof Extension> = {
  [HUBS.DESIGN]: Extension,
  [HUBS.OPS_INTELLIGENCE]: Analytics,
}

export const HubSwitcher = ({ sx }: HubSwitcherProps) => {
  const theme = useTheme()
  const { availableHubs, currentHub, defaultHub, showSwitcher, switchHub } = useHubSwitcher()

  if (!showSwitcher || !currentHub) {
    return null
  }

  const handleChange = (event: SelectChangeEvent<HubType>) => {
    const newHub = event.target.value as HubType
    switchHub(newHub)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
    >
      <Select
        value={currentHub}
        onChange={handleChange}
        size="small"
        renderValue={(value) => {
          const hub = HUB_DEFINITIONS[value as HubType]
          const Icon = HUB_ICONS[value as HubType]
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon sx={{ color: hub.color, fontSize: 20 }} />
              <span>{hub.name}</span>
            </Box>
          )
        }}
        sx={{
          minWidth: 160,
          '& .MuiSelect-select': {
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.text.primary, 0.23),
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.text.primary, 0.5),
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              minWidth: 200,
            },
          },
        }}
      >
        {availableHubs.map((hubId) => {
          const hub = HUB_DEFINITIONS[hubId]
          const Icon = HUB_ICONS[hubId]
          const isCurrent = hubId === currentHub
          const isDefault = hubId === defaultHub

          return (
            <MenuItem
              key={hubId}
              value={hubId}
              selected={isCurrent}
              sx={{
                py: 1.5,
                px: 2,
              }}
            >
              <ListItemIcon>
                <Icon sx={{ color: hub.color, fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={hub.name}
                secondary={isDefault ? 'Default' : undefined}
                primaryTypographyProps={{
                  fontWeight: isCurrent ? 600 : 400,
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  color: 'text.secondary',
                }}
              />
              {isCurrent && (
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    color: theme.palette.primary.main,
                    fontSize: 16,
                  }}
                >
                  ✓
                </Box>
              )}
            </MenuItem>
          )
        })}
      </Select>
    </Box>
  )
}

