import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography } from '@mui/material'
import { Card, Logo } from '@shared/ui'

const LoginPage = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/dashboard', { replace: true })
  }, [navigate])

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            padding: { xs: 4, sm: 5 },
            width: '100%',
            maxWidth: 448,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              width: '100%',
            }}
          >
            <Logo size="large" />
            <Typography variant="h4" component="h1">
              The Machine
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Redirecting to dashboard...
          </Typography>
        </Card>
      </Box>
    </Container>
  )
}

export default LoginPage


