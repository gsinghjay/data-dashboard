"use client";

import { Box, Typography, Paper, Grid, Card, CardContent, Divider } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import FertilityBarChart from '@/components/charts/FertilityBarChart';

export default function Home() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600} color="text.primary">
          Educational Attainment & Fertility Rates
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore the relationship between women's educational attainment and fertility rates across the United States from 2008 to 2023
        </Typography>
        <Divider sx={{ mt: 2, mb: 4 }} />
      </Box>

      <Grid container spacing={3}>
        {/* Our new chart component */}
        <Grid item xs={12}>
          <FertilityBarChart />
        </Grid>

        {/* Visualization Placeholder */}
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 3, 
              background: 'linear-gradient(to right, rgba(33, 150, 243, 0.05), rgba(33, 150, 243, 0.1))',
              border: '1px solid rgba(33, 150, 243, 0.2)',
            }}
            elevation={0}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BarChartIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" color="primary">
                Interactive Visualizations
              </Typography>
            </Box>
            <Typography variant="body1" color="text.primary">
              This dashboard will display interactive visualizations showing the correlation between education levels and fertility rates.
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
                <Typography variant="h6" component="h3" color="text.primary">
                  Education Comparison
                </Typography>
              </Box>
              <Typography paragraph color="text.primary">
                Bar charts showing fertility rates by educational attainment
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" component="h3" color="text.primary">
                  Trend Analysis
                </Typography>
              </Box>
              <Typography paragraph color="text.primary">
                Line charts tracking fertility trends over time (2008-2023)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PublicIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" component="h3" color="text.primary">
                  Geographic View
                </Typography>
              </Box>
              <Typography paragraph color="text.primary">
                Choropleth maps displaying geographic variations across states
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Findings and Data Sources */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }} elevation={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h6" component="h3" color="secondary">
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
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }} elevation={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h6" component="h3" color="secondary">
                Data Sources
              </Typography>
            </Box>
            <Typography paragraph color="text.primary">
              This dashboard uses data from the American Community Survey (ACS) Public Use Microdata Sample (PUMS) from 2008-2023.
            </Typography>
            <Typography paragraph color="text.primary">
              The data focus on women aged 15-50 years and their fertility within the past 12 months.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
