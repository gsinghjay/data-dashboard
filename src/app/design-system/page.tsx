"use client";

import { Box, Typography, Divider, Breadcrumbs, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PaletteIcon from '@mui/icons-material/Palette';
import NextLink from 'next/link';
import DesignSystemShowcase from '@/components/common/DesignSystemShowcase';

export default function DesignSystemPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link 
            component={NextLink} 
            href="/"
            underline="hover" 
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            <PaletteIcon sx={{ mr: 0.5 }} fontSize="small" />
            Design System
          </Typography>
        </Breadcrumbs>

        <Typography variant="h1" component="h1" gutterBottom>
          Educated Horizons Design System
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 800 }}>
          This design system provides consistent colors, typography, and component styles for the Educational Attainment and Fertility Rate Dashboard. It uses a blue-to-purple color progression to visually represent educational milestones.
        </Typography>
        <Divider sx={{ mt: 2, mb: 4 }} />
      </Box>

      <DesignSystemShowcase />
    </>
  );
} 