"use client";

import React, { useRef, useEffect, ReactNode, useLayoutEffect } from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { useScrollContext } from '@/contexts/ScrollContext';

interface NarrativeSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  visualization?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  reversed?: boolean;
}

const NarrativeSection: React.FC<NarrativeSectionProps> = ({
  id,
  title,
  children,
  visualization,
  backgroundColor = 'background.paper',
  textColor = 'text.primary',
  reversed = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sectionRef = useRef<HTMLDivElement>(null);
  const { registerSection, activeSection } = useScrollContext();
  const isActive = activeSection === id;

  // Use useLayoutEffect for DOM measurements to ensure they happen before paint
  useLayoutEffect(() => {
    // Need a small delay to ensure proper measurement after render
    const timeoutId = setTimeout(() => {
      if (sectionRef.current) {
        const offset = sectionRef.current.offsetTop;
        registerSection(id, offset);
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [id, registerSection]);

  // Re-register on resize
  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        const offset = sectionRef.current.offsetTop;
        registerSection(id, offset);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [id, registerSection]);

  return (
    <Box
      ref={sectionRef}
      id={id}
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor,
        color: textColor,
        py: 8,
        scrollMarginTop: '64px', // Account for fixed navbar if present
        transition: 'all 0.5s ease',
        
        // Paragraph styling for child elements
        '& p': {
          fontSize: '1.05rem',
          lineHeight: 1.7,
          mb: 2.5,
          maxWidth: '100%',
          transition: 'all 0.3s ease',
        },
        
        // Ensure consistent and proper spacing
        '& p:last-of-type': {
          mb: 0,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          width: '100%',
        }}
      >
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontFamily: 'var(--font-serif)',
            mb: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: 'secondary.main',
              transition: 'width 0.4s ease',
            },
            ...(isActive && {
              '&::after': {
                width: '120px',
              }
            })
          }}
        >
          {title}
        </Typography>

        {isMobile ? (
          <Box>
            <Box 
              sx={{ 
                mb: 4,
                opacity: isActive ? 1 : 0.7,
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
              }}
            >
              {children}
            </Box>
            {visualization && (
              <Box 
                sx={{ 
                  mt: 4,
                  opacity: isActive ? 1 : 0.7,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease 0.3s',
                }}
              >
                {visualization}
              </Box>
            )}
          </Box>
        ) : (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: reversed ? 'row-reverse' : 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Box 
              sx={{ 
                flex: '1 1 45%',
                opacity: isActive ? 1 : 0.7,
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
              }}
            >
              {children}
            </Box>
            {visualization && (
              <Box 
                sx={{ 
                  flex: '1 1 55%',
                  opacity: isActive ? 1 : 0.7,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease 0.3s',
                }}
              >
                {visualization}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NarrativeSection; 