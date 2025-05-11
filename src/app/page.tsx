"use client";

import { Box, Typography, Paper, Grid, Card, CardContent, Divider, Button } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import PaletteIcon from '@mui/icons-material/Palette';
import { useState } from 'react';
import FertilityBarChart from '@/components/charts/FertilityBarChart';
import DesignSystemShowcase from '@/components/common/DesignSystemShowcase';

export default function Home() {
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom fontWeight={600} color="text.primary">
          Educational Attainment & Fertility Rates
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Explore the relationship between women's educational attainment and fertility rates across the United States from 2008 to 2023
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            startIcon={<PaletteIcon />} 
            onClick={() => setShowDesignSystem(!showDesignSystem)}
            variant={showDesignSystem ? "contained" : "outlined"}
            color="secondary"
            sx={{ mb: 1 }}
          >
            {showDesignSystem ? "Hide Design System" : "Show Design System"}
          </Button>
        </Box>
        <Divider sx={{ mb: 4 }} />
      </Box>

      {/* Design System Showcase (conditionally rendered) */}
      {showDesignSystem && (
        <DesignSystemShowcase />
      )}

      <Grid container spacing={3}>
        {/* Our updated chart component */}
        <Grid item xs={12}>
          <FertilityBarChart />
        </Grid>

        {/* Visualization Placeholder */}
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 3, 
              background: 'linear-gradient(to right, rgba(41, 98, 255, 0.05), rgba(41, 98, 255, 0.1))',
              border: '1px solid rgba(41, 98, 255, 0.2)',
            }}
            elevation={0}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BarChartIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h4" component="h2" color="primary">
                Interactive Visualizations
              </Typography>
            </Box>
            <Typography variant="body1" color="text.primary">
              This dashboard displays interactive visualizations showing the correlation between education levels and fertility rates.
              Use the filters to explore data by year, state, and education level.
            </Typography>
          </Paper>
        </Grid>

        {/* Visualization Types */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BarChartIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" color="text.primary">
                  Education Comparison
                </Typography>
              </Box>
              <Typography paragraph color="text.primary">
                Bar charts showing fertility rates by educational attainment, from less than high school to professional/doctorate degrees.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" color="text.primary">
                  Trend Analysis
                </Typography>
              </Box>
              <Typography paragraph color="text.primary">
                Line charts tracking fertility trends over time (2008-2023), showing how the relationship between education and fertility has evolved.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PublicIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" color="text.primary">
                  Geographic View
                </Typography>
              </Box>
              <Typography paragraph color="text.primary">
                Choropleth maps displaying geographic variations in fertility rates across all 50 states and the District of Columbia.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Findings and Data Sources */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }} elevation={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h4" component="h3" color="secondary">
                Key Findings
              </Typography>
            </Box>
            <Typography paragraph color="text.primary">
              • Higher educational attainment tends to correlate with lower fertility rates
            </Typography>
            <Typography paragraph color="text.primary">
              • Fertility patterns vary significantly by state and region
            </Typography>
            <Typography paragraph color="text.primary">
              • The relationship between education and fertility has evolved over time
            </Typography>
            <Typography paragraph color="text.primary">
              • Educational milestones correspond to significant changes in fertility patterns
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }} elevation={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h4" component="h3" color="secondary">
                Data Sources
              </Typography>
            </Box>
            <Typography paragraph color="text.primary">
              This dashboard uses data from the American Community Survey (ACS) Public Use Microdata Sample (PUMS) from 2008-2023.
            </Typography>
            <Typography paragraph color="text.primary">
              The data focus on women aged 15-50 years and their fertility within the past 12 months, categorized by seven education levels.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
