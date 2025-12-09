import { Drawer, Toolbar, Box, List, Divider, useMediaQuery, useTheme } from '@mui/material'
import type { ReactNode } from 'react'
import { NavItem } from '../../NavItem'

export interface SidebarProps {
  width?: number
  mobileOpen?: boolean
  onMobileClose?: () => void
  items: Array<{
    text: string
    path: string
    icon: ReactNode
    iconColor?: string
    comingSoon?: boolean
    selected?: boolean
    onClick?: () => void
    subItems?: Array<{
      text: string
      path: string
      onClick: () => void
      selected?: boolean
    }>
  }>
}

const drawerWidth = 240

export const Sidebar = ({ 
  width = drawerWidth, 
  mobileOpen = false,
  onMobileClose,
  items 
}: SidebarProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleItemClick = (itemOnClick?: () => void) => {
    if (itemOnClick) {
      itemOnClick()
      if (isMobile && onMobileClose) {
        onMobileClose()
      }
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Box sx={{ overflow: 'auto', pb: 2 }}>
        <List sx={{ px: { xs: 0.5, sm: 0 } }}>
          {items.map((item) => (
            <NavItem
              key={item.text}
              text={item.text}
              icon={item.icon}
              iconColor={item.iconColor}
              comingSoon={item.comingSoon || false}
              selected={item.selected || false}
              onClick={item.onClick ? () => handleItemClick(item.onClick) : undefined}
              subItems={item.subItems?.map(subItem => ({
                ...subItem,
                onClick: () => {
                  subItem.onClick()
                  if (isMobile && onMobileClose) {
                    onMobileClose()
                  }
                }
              }))}
            />
          ))}
        </List>
      </Box>
    </div>
  )

  const container = typeof window !== 'undefined' ? () => window.document.body : undefined

  return (
    <Box
      component="nav"
      sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
      aria-label="navigation"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}
