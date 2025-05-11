import { createTheme } from '@mui/material/styles';

// Create a theme instance with a single color scheme
const theme = createTheme({
  palette: {
    mode: 'light', // Explicitly set light mode
    primary: {
      main: '#2196f3', // Bright blue, good for primary actions and headers
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057', // Pink/red, good for highlights and accents
      light: '#ff4081',
      dark: '#c51162',
    },
    error: {
      main: '#f44336', // Standard error color
    },
    warning: {
      main: '#ff9800', // Orange for warnings
    },
    info: {
      main: '#03a9f4', // Light blue for information
    },
    success: {
      main: '#4caf50', // Green for success
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffffff',   // White for cards/paper elements
    },
    text: {
      primary: '#212121',   // Near black for primary text
      secondary: '#757575', // Medium gray for secondary text
    },
    // Colors for data visualization
    charts: {
      primary: '#2196f3',
      secondary: '#f50057',
      tertiary: '#4caf50',
      quaternary: '#ff9800',
      quinary: '#9c27b0',
      senary: '#00bcd4',
      septenary: '#ff5722',
      octonary: '#795548',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Declare the charts module to avoid TypeScript errors
declare module '@mui/material/styles' {
  interface Palette {
    charts: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      quinary: string;
      senary: string;
      septenary: string;
      octonary: string;
    };
  }
  interface PaletteOptions {
    charts?: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
      quaternary?: string;
      quinary?: string;
      senary?: string;
      septenary?: string;
      octonary?: string;
    };
  }
}

export default theme; 