"use client";

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, LinearProgress, Typography, Tooltip } from '@mui/material';
import { useScrollContext } from '@/contexts/ScrollContext';

interface Section {
  id: string;
  title: string;
}

interface NarrativeNavigationProps {
  sections: Section[];
}

const NarrativeNavigation: React.FC<NarrativeNavigationProps> = ({ sections }) => {
  const { activeSection, progress } = useScrollContext();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: '-100%', md: '20px' },
        top: '50%',
        transform: 'translateY(-50%)',
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: { xs: 'none', md: 'block' },
        transition: 'right 0.3s ease',
        '&:hover': {
          right: '20px',
        },
        py: 2,
        width: '220px',
      }}
    >
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Progress
        </Typography>
        <LinearProgress variant="determinate" value={progress} color="secondary" sx={{ my: 1 }} />
        <Typography variant="caption" color="text.secondary" align="right" sx={{ display: 'block' }}>
          {Math.round(progress)}%
        </Typography>
      </Box>
      
      <List dense sx={{ py: 0 }}>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <Tooltip title={section.title} placement="left" arrow>
              <ListItemButton
                selected={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
                sx={{
                  borderLeft: '3px solid',
                  borderLeftColor: activeSection === section.id ? 'secondary.main' : 'transparent',
                  transition: 'all 0.3s ease',
                  py: 1.5,
                }}
              >
                <ListItemText 
                  primary={section.title} 
                  primaryTypographyProps={{
                    variant: 'body2',
                    noWrap: true,
                    sx: { 
                      fontWeight: activeSection === section.id ? 500 : 400,
                      transition: 'all 0.3s ease',
                      color: activeSection === section.id ? 'secondary.main' : 'text.primary',
                    }
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NarrativeNavigation; 