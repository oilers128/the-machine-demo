/**
 * PageLayout
 * 
 * Standardized page layout component following MUI best practices
 * Provides consistent Container, centered header, and proper spacing
 */
import { Box, Typography, Container } from '@mui/material'
import { ReactNode } from 'react'

interface PageLayoutProps {
  /** Page title */
  title: string
  /** Icon to display next to title */
  icon: ReactNode
  /** Optional badge/chip to display next to title */
  badge?: ReactNode
  /** Page content */
  children: ReactNode
}

export default function PageLayout({ title, icon, badge, children }: PageLayoutProps) {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2, 
          mb: 4 
        }}
      >
        {icon}
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {badge}
      </Box>
      {children}
    </Container>
  )
}




