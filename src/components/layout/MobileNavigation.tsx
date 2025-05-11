"use client";

import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Typography, LinearProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useScrollContext } from '@/contexts/ScrollContext';

interface Section {
  id: string;
  title: string;
}

interface MobileNavigationProps {
  sections: Section[];
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ sections }) => {
  const [open, setOpen] = useState(false);
  const { activeSection, progress } = useScrollContext();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <>
      <Box 
        sx={{ 
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'secondary.dark',
            },
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
          size="large"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            maxHeight: '70vh',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Sections</Typography>
          <IconButton edge="end" onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Progress
          </Typography>
          <LinearProgress variant="determinate" value={progress} color="secondary" sx={{ my: 1 }} />
          <Typography variant="caption" color="text.secondary" align="right" sx={{ display: 'block' }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
        
        <List sx={{ px: 1 }}>
          {sections.map((section) => (
            <ListItem key={section.id} disablePadding>
              <ListItemButton
                selected={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
                sx={{
                  borderLeft: '3px solid',
                  borderLeftColor: activeSection === section.id ? 'secondary.main' : 'transparent',
                  borderRadius: '8px',
                  my: 0.5,
                }}
              >
                <ListItemText 
                  primary={section.title} 
                  primaryTypographyProps={{
                    variant: 'body1',
                    sx: { 
                      fontWeight: activeSection === section.id ? 500 : 400,
                      color: activeSection === section.id ? 'secondary.main' : 'text.primary',
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MobileNavigation; 