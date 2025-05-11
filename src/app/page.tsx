"use client";

import { Box, Typography, Paper, Grid, Card, CardContent, Divider, Button, Chip, Link as MuiLink } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import FertilityBarChart from '@/components/charts/FertilityBarChart';
import Link from 'next/link';
import { educationColors } from '@/utils/theme';
import { isLightColor, getAccessibleTextColor } from '@/utils/chartHelpers';

export default function Home() {
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h1" component="h1" gutterBottom fontWeight={600}>
          Educational Attainment & Fertility Rates
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.1rem', maxWidth: '800px', mb: 3 }}>
          Explore the relationship between women's educational attainment and fertility rates across the United States from 2008 to 2023
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
      </Box>

      {/* Design System Highlight */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(to right, rgba(94, 53, 177, 0.05), rgba(94, 53, 177, 0.1))',
          border: '1px solid rgba(94, 53, 177, 0.2)',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PaletteIcon sx={{ mr: 1.5, color: 'secondary.main' }} />
          <Typography variant="h4" component="h2" color="secondary.main">
            Educated Horizons Design System
          </Typography>
        </Box>
        <Typography paragraph>
          Our data visualizations use a custom design system with a blue-to-purple palette that visually represents educational progression, 
          from less than high school to professional/doctorate degrees.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {Object.entries(educationColors).map(([key, color]) => {
            const textColor = getAccessibleTextColor(color);
            return (
              <Chip 
                key={key} 
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                sx={{ 
                  bgcolor: color, 
                  color: textColor,
                  fontWeight: 500,
                  px: 1,
                  '&:hover': { 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 300ms ease',
                }} 
              />
            );
          })}
        </Box>
        <Button 
          component={Link}
          href="/design-system"
          variant="outlined" 
          color="secondary" 
          endIcon={<ArrowForwardIcon />}
        >
          View Design System Documentation
        </Button>
      </Paper>

      <Grid container spacing={3}>
        {/* Our updated chart component */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h4" gutterBottom>
                Fertility Rates by Education Level
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Compare fertility rates across different education groups, with options to view data by year and make comparisons.
              </Typography>
            </Box>
            <Box sx={{ p: { xs: 1, md: 2 } }}>
              <FertilityBarChart showTitle={false} embedded={true} />
            </Box>
          </Paper>
        </Grid>

        {/* Visualization Types */}
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom sx={{ mt: 2 }}>
            Upcoming Visualizations
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 3 }}>
            Explore our data through multiple visualization types, each providing unique insights into the relationship between education and fertility.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BarChartIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h3">
                  Education Comparison
                </Typography>
              </Box>
              <Typography paragraph color="text.secondary">
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
                <Typography variant="h5" component="h3">
                  Trend Analysis
                </Typography>
              </Box>
              <Typography paragraph color="text.secondary">
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
                <Typography variant="h5" component="h3">
                  Geographic View
                </Typography>
              </Box>
              <Typography paragraph color="text.secondary">
                Choropleth maps displaying geographic variations in fertility rates across all 50 states and the District of Columbia.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Findings and Data Sources */}
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>
            About the Project
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }} elevation={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h4" component="h3" color="secondary">
                Key Findings
              </Typography>
            </Box>
            <Typography component="ul" sx={{ pl: 2 }}>
              <Typography component="li" paragraph sx={{ display: 'list-item' }}>
                Higher educational attainment shows a complex relationship with fertility rates
              </Typography>
              <Typography component="li" paragraph sx={{ display: 'list-item' }}>
                Fertility patterns vary significantly by state and region
              </Typography>
              <Typography component="li" paragraph sx={{ display: 'list-item' }}>
                The relationship between education and fertility has evolved over time
              </Typography>
              <Typography component="li" paragraph sx={{ display: 'list-item' }}>
                Educational milestones correspond to significant changes in fertility patterns
              </Typography>
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
            <Typography paragraph>
              This dashboard uses data from the American Community Survey (ACS) Public Use Microdata Sample (PUMS) from 2008-2023.
            </Typography>
            <Typography paragraph>
              The data focus on women aged 15-50 years and their fertility within the past 12 months, categorized by seven education levels.
            </Typography>
            <Typography paragraph>
              <MuiLink href="https://www.census.gov/programs-surveys/acs/microdata.html" target="_blank" rel="noopener noreferrer">
                Learn more about ACS PUMS data →
              </MuiLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
