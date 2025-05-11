import { educationColors } from './theme';

/**
 * Maps education group names from the database to the correct color from the "Educated Horizons" palette
 * @param educationGroup - The name of the education group as stored in the database
 * @returns The corresponding color hex code
 */
export const getEducationColor = (educationGroup: string): string => {
  const mapping: Record<string, string> = {
    'Less than High School': educationColors.lessThanHighSchool,
    'High School Diploma': educationColors.highSchoolDiploma,
    'Some College': educationColors.someCollege,
    'Associate\'s Degree': educationColors.associatesDegree,
    'Bachelor\'s Degree': educationColors.bachelorsDegree,
    'Master\'s Degree': educationColors.mastersDegree,
    'Professional/Doctorate Degree': educationColors.professionalDoctorate,
  };

  return mapping[educationGroup] || '#CCCCCC'; // Fallback color if not found
};

/**
 * Get all education colors in an array ordered by display order
 * @returns Array of color hex codes
 */
export const getOrderedEducationColors = (): string[] => {
  return [
    educationColors.lessThanHighSchool,
    educationColors.highSchoolDiploma,
    educationColors.someCollege,
    educationColors.associatesDegree,
    educationColors.bachelorsDegree,
    educationColors.mastersDegree,
    educationColors.professionalDoctorate,
  ];
};

/**
 * Returns the array of education group names in the correct display order
 * @returns Array of education group names
 */
export const getOrderedEducationGroups = (): string[] => {
  return [
    'Less than High School',
    'High School Diploma',
    'Some College',
    'Associate\'s Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Professional/Doctorate Degree'
  ];
};

/**
 * Determine if a color is light or dark to select appropriate text color
 * @param color Hex color
 * @returns true if the color is light, false if dark
 */
export const isLightColor = (color: string): boolean => {
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

/**
 * Get the appropriate text color based on background color for accessibility
 * @param backgroundColor Hex color
 * @returns White for dark backgrounds, black for light backgrounds
 */
export const getAccessibleTextColor = (backgroundColor: string): string => {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF';
};

/**
 * Get a color for a choropleth map gradient based on a value
 * @param value - The value to map to a color
 * @param min - The minimum value in the range
 * @param max - The maximum value in the range
 * @param colors - The color palette to use (default: teal gradient)
 * @returns A color hex code
 */
export const getChoroplethColor = (
  value: number, 
  min: number, 
  max: number, 
  colors: { min: string, max: string } = { min: '#E0F2F1', max: '#00695C' }
): string => {
  // Normalize the value to a range of 0-1
  const normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  
  // Convert hex colors to RGB
  const fromRGB = hexToRgb(colors.min);
  const toRGB = hexToRgb(colors.max);
  
  if (!fromRGB || !toRGB) return colors.min;
  
  // Interpolate between the colors
  const r = Math.round(fromRGB.r + normalizedValue * (toRGB.r - fromRGB.r));
  const g = Math.round(fromRGB.g + normalizedValue * (toRGB.g - fromRGB.g));
  const b = Math.round(fromRGB.b + normalizedValue * (toRGB.b - fromRGB.b));
  
  return rgbToHex(r, g, b);
};

/**
 * Get a discrete color scale for choropleth maps 
 * @param steps - Number of discrete steps
 * @param colors - The color palette to use (default: teal gradient)
 * @returns An array of hex color codes
 */
export const getChoroplethColorScale = (
  steps: number = 7,
  colors: { min: string, max: string } = { min: '#E0F2F1', max: '#00695C' }
): string[] => {
  const scale: string[] = [];
  
  for (let i = 0; i < steps; i++) {
    const normalizedValue = i / (steps - 1);
    const fromRGB = hexToRgb(colors.min);
    const toRGB = hexToRgb(colors.max);
    
    if (!fromRGB || !toRGB) {
      scale.push(colors.min);
      continue;
    }
    
    const r = Math.round(fromRGB.r + normalizedValue * (toRGB.r - fromRGB.r));
    const g = Math.round(fromRGB.g + normalizedValue * (toRGB.g - fromRGB.g));
    const b = Math.round(fromRGB.b + normalizedValue * (toRGB.b - fromRGB.b));
    
    scale.push(rgbToHex(r, g, b));
  }
  
  return scale;
};

/**
 * Get a color with adjusted opacity
 * @param color - The base color (hex)
 * @param opacity - The opacity value (0-1)
 * @returns Hex color with opacity
 */
export const getColorWithOpacity = (color: string, opacity: number): string => {
  const hexOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `${color}${hexOpacity}`;
};

/**
 * Add visual patterns for accessibility (for colorblind users)
 * @param color - Base color
 * @param patternType - Type of pattern ('dots', 'lines', 'diagonal', etc.)
 * @returns CSS value for background
 */
export const getAccessiblePattern = (color: string, patternType: 'dots' | 'lines' | 'diagonal' | 'crosshatch' = 'lines'): string => {
  const baseColor = color;
  const patternColor = adjustColorLightness(color, isLightColor(color) ? -15 : 15);
  
  switch (patternType) {
    case 'dots':
      return `repeating-radial-gradient(circle at 10px 10px, ${patternColor} 0, ${patternColor} 2px, ${baseColor} 2px, ${baseColor} 15px)`;
    case 'lines':
      return `repeating-linear-gradient(90deg, ${baseColor}, ${baseColor} 10px, ${patternColor} 10px, ${patternColor} 12px)`;
    case 'diagonal':
      return `repeating-linear-gradient(45deg, ${baseColor}, ${baseColor} 10px, ${patternColor} 10px, ${patternColor} 15px)`;
    case 'crosshatch':
      return `repeating-linear-gradient(45deg, ${baseColor}, ${baseColor} 10px, ${patternColor} 10px, ${patternColor} 15px), 
              repeating-linear-gradient(-45deg, ${baseColor}, ${baseColor} 10px, ${patternColor} 10px, ${patternColor} 15px)`;
    default:
      return baseColor;
  }
};

/**
 * Generate a sequential palette for visualization
 * @param baseColor - The base color to build the palette from
 * @param steps - Number of color steps to generate
 * @returns Array of hex color codes
 */
export const generateSequentialPalette = (baseColor: string, steps: number): string[] => {
  const palette: string[] = [];
  
  for (let i = 0; i < steps; i++) {
    // Adjust lightness from lightest to darkest
    const lightness = 85 - (i * (70 / (steps - 1)));
    palette.push(adjustColorLightness(baseColor, lightness));
  }
  
  return palette;
};

/**
 * Adjust the lightness of a color
 * @param color - Hex color
 * @param lightness - Target lightness (0-100)
 * @returns Adjusted hex color
 */
export const adjustColorLightness = (color: string, lightness: number): string => {
  // Convert hex to HSL
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Adjust lightness
  hsl.l = Math.max(0, Math.min(100, lightness)) / 100;
  
  // Convert back to RGB
  const adjustedRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  
  // Convert to hex
  return rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
};

/**
 * Chart style constants
 */
export const chartStyles = {
  // Animation durations in ms
  animation: {
    short: 300,
    standard: 400,
    complex: 500,
  },
  // Margins for charts
  margin: {
    top: 20,
    right: 30,
    bottom: 40,
    left: 50,
  },
  // Colors for UI elements
  ui: {
    axes: '#ECEFF1', // Light grey for grid lines
    tooltip: 'rgba(38, 50, 56, 0.9)', // Dark blue grey with opacity
  },
  // Sizes for chart elements
  size: {
    barWidth: 0.7, // Bar width as percentage of available space (0-1)
    lineWidth: 2.5, // Line width in pixels
    dotRadius: 4, // Dot/circle radius in pixels
    tooltipRadius: 44, // Minimum size for tooltip target area (44x44px)
  },
  // Font sizes for chart text
  fontSize: {
    axisLabel: '14px',
    dataLabel: '12px',
    tooltip: '12px',
    legend: '14px',
  },
  // Accessibility targets
  accessibility: {
    minContrastRatio: 4.5, // WCAG AA standard for text
    minTouchTarget: 44, // Minimum 44x44px touch target
  }
};

// Helper functions for color conversion
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

// Convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  // Convert RGB to [0, 1] range
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return { h, s, l };
};

// Convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}; 