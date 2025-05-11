import { createTheme } from '@mui/material/styles';
import { Shadows } from '@mui/material/styles/shadows';

// Educated Horizons Color Palette
export const educationColors = {
  lessThanHighSchool: '#B0BEC5', // Blue Grey - Lightest
  highSchoolDiploma: '#78909C',  // Blue Grey
  someCollege: '#64B5F6',        // Light Blue
  associatesDegree: '#42A5F5',   // Blue
  bachelorsDegree: '#2962FF',    // Deep Indigo
  mastersDegree: '#5E35B1',      // Deep Purple
  professionalDoctorate: '#311B92', // Dark Violet
};

// Declare module augmentation for custom palette colors
declare module '@mui/material/styles' {
  interface Palette {
    education: typeof educationColors;
    choropleth: {
      min: string;
      max: string;
    };
  }
  interface PaletteOptions {
    education?: Partial<typeof educationColors>;
    choropleth?: {
      min: string;
      max: string;
    };
  }
}

// Determine if a color is light or dark
const isLightColor = (color: string): boolean => {
  // Remove the # if present
  const hex = color.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness (using common formula)
  // Colors with brightness > 155 are considered light
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

// Create a theme instance with the Educated Horizons design system
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2962FF', // Using Deep Indigo (Bachelor's Degree) as primary
      light: '#64B5F6',
      dark: '#1976d2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5E35B1', // Using Deep Purple (Master's Degree) as secondary
      light: '#7E57C2',
      dark: '#4527A0',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#03a9f4',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#F8F9FA', // Very Light Grey
      paper: '#FFFFFF',
    },
    text: {
      primary: '#263238',   // Blue Grey 900
      secondary: '#455A64', // Blue Grey 700
    },
    // Education colors for data visualization
    education: educationColors,
    // Colors for choropleth maps (teal gradient)
    choropleth: {
      min: '#E0F2F1', // Lightest teal
      max: '#00695C', // Darkest teal
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    h1: {
      fontFamily: "'Source Serif Pro', serif",
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontFamily: "'Source Serif Pro', serif",
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontFamily: "'Source Serif Pro', serif",
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontFamily: "'Source Serif Pro', serif",
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shadows: Array(25).fill('none') as Shadows,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8F9FA',
          color: '#263238',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 300ms ease',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(38, 50, 56, 0.95)',
          padding: '8px 12px',
          fontSize: '0.75rem',
          borderRadius: '6px',
        },
        arrow: {
          color: 'rgba(38, 50, 56, 0.95)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: 'all 300ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)',
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#263238',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'background-color 300ms ease',
        },
      },
    },
  },
});

export default theme; 