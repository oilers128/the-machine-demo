import { AppBar as MuiAppBar, Toolbar, IconButton, Menu, MenuItem, Divider, ListItemIcon, Box, useTheme, alpha, Avatar, Tooltip } from '@mui/material'
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material'
import { ReactNode, useState, MouseEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { Logo } from '../../Logo'
import { useMicrosoftEntraAvatar } from '@shared/hooks/useMicrosoftEntraAvatar'
import { HubSwitcher } from '../../HubSwitcher'

export interface AppBarProps {
  userMenuItems?: Array<{
    label: string
    icon?: ReactNode
    onClick: () => void
  }>
  onMenuClick?: () => void
}

export const AppBar = ({ userMenuItems, onMenuClick }: AppBarProps) => {
  const theme = useTheme()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { account, avatarUrl, initials, isLoading } = useMicrosoftEntraAvatar()

  const getLandingPage = (): string => {
    const path = location.pathname
    if (path.startsWith('/ops')) {
      return '/ops/command-center'
    }
    return '/dashboard'
  }

  const logoTo = getLandingPage()

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const defaultMenuItems: Array<{ label: string; icon?: ReactNode; onClick: () => void }> = [
    {
      label: 'Profile',
      icon: <AccountCircle fontSize="small" />,
      onClick: handleMenuClose,
    },
  ]

  const menuItems = userMenuItems || defaultMenuItems

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
        borderRadius: 0,
      }}
    >
      <Toolbar>
        {onMenuClick && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Logo size="medium" to={logoTo} sx={{ flexGrow: 0, mr: 2 }} />
        <Box sx={{ flexGrow: 1 }} />
        <HubSwitcher sx={{ mr: 2, display: { xs: 'none', sm: 'flex' } }} />
        <Tooltip title={account?.name || account?.username || 'Account'}>
          <IconButton
            size="large"
            edge="end"
            onClick={handleMenuOpen}
            sx={{ ml: 2, color: theme.palette.text.primary }}
          >
            {isLoading ? (
              <AccountCircle />
            ) : (
              <Avatar
                src={avatarUrl || undefined}
                alt={account?.name || account?.username || 'Account'}
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: avatarUrl ? undefined : alpha(theme.palette.primary.main, 0.85),
                  color: avatarUrl ? undefined : theme.palette.primary.contrastText,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {!avatarUrl && initials.slice(0, 2)}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {menuItems.map((item, index) => (
            <div key={item.label}>
              {index > 0 && <Divider />}
              <MenuItem onClick={item.onClick}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                {item.label}
              </MenuItem>
            </div>
          ))}
        </Menu>
      </Toolbar>
    </MuiAppBar>
  )
}

