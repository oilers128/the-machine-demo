import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { Error as ErrorIcon } from '@mui/icons-material'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Safely log error without trying to render it
    try {
      const errorMsg = error instanceof Error ? error.message : String(error)
      const errorStack = error instanceof Error ? error.stack : undefined
      console.error('ErrorBoundary caught an error:', errorMsg, errorStack, errorInfo)
    } catch {
      console.error('ErrorBoundary caught an error (unable to log details)')
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Safely convert error to string - never render Error object directly
      let errorMessage = 'An unexpected error occurred'
      try {
        if (this.state.error instanceof Error) {
          errorMessage = this.state.error.message || String(this.state.error)
        } else if (typeof this.state.error === 'string') {
          errorMessage = this.state.error
        } else if (this.state.error !== null && this.state.error !== undefined) {
          errorMessage = String(this.state.error)
        }
      } catch {
        errorMessage = 'An unexpected error occurred'
      }

      return (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              textAlign: 'center',
            }}
          >
            <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {errorMessage}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
            >
              Reload Page
            </Button>
          </Box>
        </Container>
      )
    }

    return this.props.children
  }
}

