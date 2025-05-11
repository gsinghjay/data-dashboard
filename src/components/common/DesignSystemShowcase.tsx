"use client";

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  Divider,
  Tooltip,
  useTheme,
  Chip,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel
} from '@mui/material';
import { educationColors } from '@/utils/theme';
import { 
  isLightColor, 
  getAccessibleTextColor, 
  getAccessiblePattern,
  chartStyles
} from '@/utils/chartHelpers';

/**
 * A component that showcases the "Educated Horizons" design system
 * Displays color palette, typography, and component styles
 */
const DesignSystemShowcase: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h1" gutterBottom>
        Educated Horizons Design System
      </Typography>

      <Typography variant="h2" sx={{ mt: 6, mb: 3 }}>
        Color Palette
      </Typography>
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Education Groups
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(educationColors).map(([key, color]) => {
            const textColor = getAccessibleTextColor(color);
            return (
              <Grid item xs={6} sm={4} md={3} lg={3} key={key}>
                <Box 
                  sx={{ 
                    bgcolor: color, 
                    height: 80, 
                    width: '100%', 
                    borderRadius: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 1.5,
                    transition: `transform ${chartStyles.animation.short}ms ease`,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: textColor,
                      fontWeight: 500,
                    }}
                  >
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: `${textColor}`,
                      opacity: 0.8,
                    }}
                  >
                    {color}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          UI Colors
        </Typography>
        <Grid container spacing={2}>
          {[
            { name: 'Primary', color: theme.palette.primary.main, key: 'primary' },
            { name: 'Secondary', color: theme.palette.secondary.main, key: 'secondary' },
            { name: 'Background', color: theme.palette.background.default, key: 'background' },
            { name: 'Paper', color: theme.palette.background.paper, key: 'paper' },
            { name: 'Text Primary', color: theme.palette.text.primary, key: 'textPrimary' },
            { name: 'Text Secondary', color: theme.palette.text.secondary, key: 'textSecondary' },
            { name: 'Error', color: theme.palette.error.main, key: 'error' },
            { name: 'Success', color: theme.palette.success.main, key: 'success' },
          ].map(item => {
            const textColor = getAccessibleTextColor(item.color);
            return (
              <Grid item xs={6} sm={3} md={3} key={item.key}>
                <Box 
                  sx={{ 
                    bgcolor: item.color, 
                    height: 70, 
                    width: '100%', 
                    borderRadius: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 1.5,
                  }}
                >
                  <Typography variant="caption" sx={{ color: textColor, fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: textColor, opacity: 0.8 }}>
                    {item.color}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Choropleth Map Colors
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                height: 60, 
                borderRadius: 1,
                display: 'flex',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              {Array.from({ length: 7 }).map((_, i) => {
                const step = i / 6;
                const r = parseInt(theme.palette.choropleth.min.slice(1, 3), 16);
                const g = parseInt(theme.palette.choropleth.min.slice(3, 5), 16);
                const b = parseInt(theme.palette.choropleth.min.slice(5, 7), 16);
                
                const r2 = parseInt(theme.palette.choropleth.max.slice(1, 3), 16);
                const g2 = parseInt(theme.palette.choropleth.max.slice(3, 5), 16);
                const b2 = parseInt(theme.palette.choropleth.max.slice(5, 7), 16);
                
                const rNew = Math.round(r + step * (r2 - r));
                const gNew = Math.round(g + step * (g2 - g));
                const bNew = Math.round(b + step * (b2 - b));
                
                const color = `#${rNew.toString(16).padStart(2, '0')}${gNew.toString(16).padStart(2, '0')}${bNew.toString(16).padStart(2, '0')}`;
                const textColor = getAccessibleTextColor(color);
                
                return (
                  <Box 
                    key={i} 
                    sx={{ 
                      flex: 1, 
                      bgcolor: color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: textColor }}>
                      {i+1}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
              Geographic intensity scale from {theme.palette.choropleth.min} to {theme.palette.choropleth.max}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h2" sx={{ mt: 6, mb: 3 }}>
        Typography
      </Typography>
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Source Serif Pro</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h1" gutterBottom>h1. Heading</Typography>
            <Typography variant="h2" gutterBottom>h2. Heading</Typography>
            <Typography variant="h3" gutterBottom>h3. Heading</Typography>
            <Typography variant="h4" gutterBottom>h4. Heading</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Inter</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom>h5. Heading</Typography>
            <Typography variant="h6" gutterBottom>h6. Heading</Typography>
            <Typography variant="subtitle1" gutterBottom>subtitle1. A little smaller subtitle.</Typography>
            <Typography variant="subtitle2" gutterBottom>subtitle2. An even smaller subtitle.</Typography>
            <Typography variant="body1" gutterBottom>body1. Default paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. The fox jumped over the lazy dog.</Typography>
            <Typography variant="body2" gutterBottom>body2. Smaller paragraph text often used for secondary content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            <Typography variant="button" display="block" gutterBottom>button text</Typography>
            <Typography variant="caption" display="block" gutterBottom>caption text</Typography>
            <Typography variant="overline" display="block" gutterBottom>overline text</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h2" sx={{ mt: 6, mb: 3 }}>
        UI Components
      </Typography>
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Buttons & Interactive Elements</Typography>
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button variant="contained" color="primary">Primary Button</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary">Secondary Button</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">Outlined Button</Button>
            </Grid>
            <Grid item>
              <Button variant="text" color="primary">Text Button</Button>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Chip label="Default Chip" />
            </Grid>
            <Grid item>
              <Chip label="Primary Chip" color="primary" />
            </Grid>
            <Grid item>
              <Chip label="Secondary Chip" color="secondary" />
            </Grid>
            <Grid item>
              <Chip label="Clickable Chip" onClick={() => {}} />
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Switch"
          />
        </Box>
        
        <Typography variant="h4" gutterBottom>Cards</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card Title
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Card Subtitle
                </Typography>
                <Typography variant="body2">
                  Cards are used to group related content and actions about a single subject.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Lists</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <List>
              <ListItem>
                <ListItemText primary="List Item 1" secondary="Description of item 1" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="List Item 2" secondary="Description of item 2" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="List Item 3" secondary="Description of item 3" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h2" sx={{ mt: 6, mb: 3 }}>
        Visualization Styles
      </Typography>
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Chart Specifications</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom>Bar Charts</Typography>
              <Typography variant="body2">
                • Colors: Education palette<br />
                • Axes: Minimal gridlines (#ECEFF1)<br />
                • Labels: Clear, consistent formatting<br />
                • Tooltips: On hover with detailed data
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom>Line Charts</Typography>
              <Typography variant="body2">
                • Colors: Education palette<br />
                • Line weight: {chartStyles.size.lineWidth}px<br />
                • Markers: Small circles on hover<br />
                • Annotations: For key events<br />
                • Legend: Interactive, toggleable
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom>Choropleth Maps</Typography>
              <Typography variant="body2">
                • Colors: Teal gradient<br />
                • Borders: Darker shade or neutral<br />
                • Scale: 5-7 discrete steps<br />
                • Tooltips: On hover with state details<br />
                • Selection: Clear visual indication
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Accessibility Features</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom>Color Blindness Considerations</Typography>
              <Typography variant="body2" paragraph>
                Alternative encodings when colors alone aren't enough:
              </Typography>
              <Grid container spacing={1}>
                {Object.entries(educationColors).slice(0, 4).map(([key, color]) => (
                  <Grid item xs={6} key={key + "-pattern"}>
                    <Tooltip title={`Pattern for ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}>
                      <Box 
                        sx={{ 
                          height: 40, 
                          background: getAccessiblePattern(color, 'lines'),
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="caption" sx={{ 
                          color: getAccessibleTextColor(color),
                          backgroundColor: 'rgba(255,255,255,0.5)',
                          px: 1,
                          borderRadius: 0.5
                        }}>
                          Pattern
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom>Interactive Elements</Typography>
              <Typography variant="body2">
                • Minimum touch target size: {chartStyles.accessibility.minTouchTarget}×{chartStyles.accessibility.minTouchTarget}px<br />
                • Animation duration: {chartStyles.animation.standard}ms<br />
                • Contrast ratio: ≥{chartStyles.accessibility.minContrastRatio}:1 for text<br />
                • Focus indicators: Visible on keyboard navigation<br />
                • ARIA attributes: For screen reader support
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DesignSystemShowcase; 