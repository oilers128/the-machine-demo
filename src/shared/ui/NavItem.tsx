import { ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, List, useTheme, Box } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ReactNode, useState, cloneElement, isValidElement } from 'react'
import type { ReactElement } from 'react'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import trafficConeIcon from '../../assets/icons/traffic-cone.png'

export interface NavItemProps {
  text: string
  icon: ReactNode
  selected?: boolean
  onClick?: () => void
  iconColor?: string // Optional custom icon color
  comingSoon?: boolean // Show construction cone icon
  subItems?: Array<{
    text: string
    path: string
    onClick: () => void
    selected?: boolean
  }>
}

export const NavItem = ({ text, icon, selected = false, onClick, iconColor, comingSoon = false, subItems }: NavItemProps) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isExpandable = subItems && subItems.length > 0

  const handleClick = () => {
    if (isExpandable) {
      setOpen(!open)
    } else if (onClick) {
      onClick()
    }
  }

  // Use custom icon color if provided, otherwise default to primary brand color
  const finalIconColor = iconColor || theme.palette.primary.main

  // Clone icon with color prop if it's a valid React element
  const coloredIcon = isValidElement<SvgIconProps>(icon)
    ? cloneElement(icon as ReactElement<SvgIconProps>, {
        htmlColor: finalIconColor,
        color: 'inherit',
      })
    : icon

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton 
          selected={selected} 
          onClick={handleClick}
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: { xs: 44, sm: 48 },
            px: { xs: 1.5, sm: 2 },
            py: { xs: 1, sm: 1.5 },
            opacity: comingSoon ? 0.7 : 1,
            '&:hover': {
              opacity: comingSoon ? 0.85 : 1,
            }
          }}
        >
          <ListItemIcon 
            sx={{ 
              minWidth: 40, 
              color: finalIconColor,
              justifyContent: 'center',
              mr: 1
            }}
          >
            {coloredIcon}
          </ListItemIcon>
          <ListItemText 
            primary={text} 
            sx={{ 
              flex: 1,
              '& .MuiTypography-root': {
                color: comingSoon ? theme.palette.text.secondary : 'inherit',
              }
            }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            {isExpandable && (open ? <ExpandLess /> : <ExpandMore />)}
            {comingSoon && (
              <Box
                component="img"
                src={trafficConeIcon}
                alt="Coming soon"
                sx={{ width: 16, height: 16, color: theme.palette.warning.main }}
              />
            )}
          </Box>
        </ListItemButton>
      </ListItem>
      {isExpandable && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem) => (
              <ListItemButton
                key={subItem.text}
                selected={subItem.selected}
                onClick={subItem.onClick}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={subItem.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}