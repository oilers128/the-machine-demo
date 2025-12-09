import { Box, SxProps, Theme } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  sx?: SxProps<Theme>
  imgSx?: SxProps<Theme>
  to?: string
  onClick?: () => void
}

export const Logo = ({ size = 'medium', sx, imgSx, to, onClick }: LogoProps) => {
  const sizeMap = {
    small: { height: { xs: 32, sm: 40 } },
    medium: { height: { xs: 40, sm: 56 } },
    large: { height: { xs: 48, sm: 72 } },
  }

  const dimensions = sizeMap[size]

  return (
    <Box
      component={to ? RouterLink : 'div'}
      {...(to ? { to } : {})}
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        cursor: to || onClick ? 'pointer' : 'default',
        ...sx,
      }}
    >
      <Box
        component="img"
        src="/TompkinsLogoMain.svg"
        alt="Tompkins Solutions"
        sx={{
          height: dimensions.height,
          width: 'auto',
          maxWidth: { xs: 120, sm: 'none' }, // Constrain width on mobile
          ...imgSx,
        }}
      />
    </Box>
  )
}

