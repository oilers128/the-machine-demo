import { alpha, createTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

export const iconColors = {
  // Design Engine
  dataInvalidator: '#B42318',
  dataSynthesis: '#155969',
  layoutManager: '#555555',
  modeling: '#BDD9F2',
  laborCalculator: '#186C7E',
  capitalExpenses: '#027A48',
  routeDistanceCalculator: '#E5941C',
  // Intelligence Engine
  commandCenter: '#1E879E',
  equipmentPerformance: '#4CAF50',
  workforcePerformance: '#2196F3',
  inventoryStorage: '#C19A6B',
  alertsDiagnostics: '#FF9800',
  logViewer: '#607D8B',
  aiInsights: '#9C27B0',
} as const

/**
 * Tompkins Solutions Theme
 * 
 * Brand colors and typography based on official Tompkins Solutions brand guidelines.
 * Uses Material Design 3 principles with Tompkins brand colors.
 * 
 * Primary Colors:
 * - Dark Night: #0F4551
 * - Deep Sea: #166273
 * - Teal: #1E879E
 * - Orange: #FFA51F
 * - Sky Blue: #BDD9F2
 * 
 * Background Colors:
 * - Warm 1: #FFFAF4
 * - Warm 2: #FFF6E9
 * - Cool 1: #F3F7F8
 * - Cool 2: #E8EFF1
 * - Powder: #EBF4FB
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    // Primary brand colors
    primary: {
      main: '#1E879E', // Teal (primary brand color)
      light: '#81BCC8', // Teal 200
      dark: '#166273', // Deep Sea
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFA51F', // Orange
      light: '#FFCD82', // Orange 200
      dark: '#CC8419', // Orange 600
      contrastText: '#fff',
    },
    background: {
      default: '#F3F7F8', // Cool 1 (primary background)
      paper: '#FFFFFF', // White for cards/surfaces
    },
    text: {
      primary: '#1B1B1B', // Dark Grey 500
      secondary: '#555555', // Dark Grey 300
    },
    error: {
      main: '#B42318', // Keep standard error color
      light: '#FEF3F2',
      dark: '#B42318',
    },
    success: {
      main: '#027A48', // Keep standard success color
      light: '#ECFDF3',
      dark: '#027A48',
    },
    warning: {
      main: '#FFA51F', // Orange (brand color)
      light: '#FFF6E9', // Warm 2
      dark: '#CC8419', // Orange 600
    },
    info: {
      main: '#1E879E', // Teal
      light: '#BDD9F2', // Sky Blue
      dark: '#166273', // Deep Sea
    },
    // Extended palette colors for custom use
    grey: {
      50: '#F7FAFD', // Light Grey 100
      100: '#EBF4FB', // Powder / Light Grey 400
      200: '#E8EFF1', // Cool 2
      300: '#D3DCE2', // Light Grey 500
      400: '#BCC3C9', // Light Grey 600
      500: '#949494', // Dark Grey 50
      600: '#888888', // Dark Grey 100
      700: '#707070', // Dark Grey 200
      800: '#555555', // Dark Grey 300
      900: '#313131', // Dark Grey 400
    },
  },
  typography: {
    // Tompkins Solutions uses IBM Plex Sans as the primary typeface
    // "A neutral yet friendly Grotesque style typeface"
    fontFamily: [
      '"IBM Plex Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    // Material Design 3 typography scale
    // All text uses IBM Plex Sans per brand guidelines
    h1: {
      fontSize: '3.125rem', // 50px
      lineHeight: 1.2,
      fontWeight: 400,
      letterSpacing: '-0.01562em',
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h2: {
      fontSize: '2.5rem', // 40px
      lineHeight: 1.2,
      fontWeight: 400,
      letterSpacing: '-0.00833em',
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h3: {
      fontSize: '2rem', // 32px
      lineHeight: 1.25,
      fontWeight: 400,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h4: {
      fontSize: '1.75rem', // 28px
      lineHeight: 1.29,
      fontWeight: 400,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h5: {
      fontSize: '1.5rem', // 24px
      lineHeight: 1.33,
      fontWeight: 400,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h6: {
      fontSize: '1.25rem', // 20px
      lineHeight: 1.4,
      fontWeight: 500,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
      fontWeight: 400,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.43,
      fontWeight: 400,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    button: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.75,
      fontWeight: 500,
      textTransform: 'none', // MD3 buttons don't uppercase by default
      letterSpacing: '0.02857em',
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
  },
  shape: {
    // Material Design 3 corner radius guidelines
    borderRadius: 12, // Default for cards and surfaces
  },
  spacing: 8, // 8dp grid system
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: false,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '20px', // MD3 buttons use 20px corner radius
          padding: '10px 24px', // MD3 button padding
          minHeight: '40px', // MD3 minimum touch target
        },
        contained: {
          boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
          '&:hover': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // MD3 standard
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px', // MD3 text field corners
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // MD3 card corners (12dp)
          backgroundImage: 'none', // Remove gradient backgrounds
        },
        elevation1: {
          boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        },
        elevation2: {
          boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        },
        elevation3: {
          boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)',
        },
        elevation4: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
        elevation6: {
          boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '28px', // MD3 navigation item corners
          margin: '0 8px', // MD3 navigation item spacing
          padding: '8px 12px', // MD3 navigation padding
          minHeight: '48px', // MD3 minimum touch target
          '&.Mui-selected': {
            backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08), // Teal selection state (8% opacity)
            color: 'primary.main', // Teal text when selected
            '&:hover': {
              backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12), // Teal hover state (12% opacity)
            },
            '& .MuiListItemIcon-root': {
              color: 'primary.main', // Teal icon when selected
            },
          },
          '&:hover': {
            '& .MuiListItemIcon-root': {
              color: 'primary.main', // Teal icon on hover
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'text.secondary', // Default icon color
          transition: 'color 0.2s ease-in-out',
        },
      },
    },
  },
})

