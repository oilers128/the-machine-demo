import { Box, Toolbar, Container } from '@mui/material'
import { ReactNode } from 'react'

export interface MainContentProps {
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}

export const MainContent = ({ 
  children, 
  maxWidth = 'lg'
}: MainContentProps) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Toolbar />
      <Container maxWidth={maxWidth}>
        {children}
      </Container>
    </Box>
  )
}
