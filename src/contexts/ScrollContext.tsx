"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type ScrollContextType = {
  activeSection: string;
  progress: number;
  registerSection: (id: string, offset: number) => void;
  sections: { [key: string]: number };
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [sections, setSections] = useState<{ [key: string]: number }>({});

  const registerSection = useCallback((id: string, offset: number) => {
    setSections(prevSections => {
      // Only update if the section hasn't been registered or the offset changed
      if (prevSections[id] !== offset) {
        return {
          ...prevSections,
          [id]: offset
        };
      }
      return prevSections;
    });
  }, []);

  // Create a memoized scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate overall progress (0-100%)
    const calculatedProgress = Math.min(
      100,
      Math.max(0, (window.scrollY / (documentHeight - window.innerHeight)) * 100)
    );
    
    // Only update progress if it has changed significantly (avoid microupdates)
    if (Math.abs(calculatedProgress - progress) > 0.5) {
      setProgress(calculatedProgress);
    }

    // Determine active section
    const sectionIds = Object.keys(sections).sort((a, b) => sections[a] - sections[b]);
    
    let newActiveSection = '';
    for (let i = 0; i < sectionIds.length; i++) {
      const id = sectionIds[i];
      if (scrollPosition >= sections[id]) {
        newActiveSection = id;
      } else {
        break;
      }
    }
    
    // Only update active section if it changed
    if (newActiveSection !== '' && newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [sections, activeSection, progress]);

  useEffect(() => {
    const throttledScrollHandler = () => {
      // Use requestAnimationFrame for better performance
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    // Initial check
    throttledScrollHandler();
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [handleScroll]);

  return (
    <ScrollContext.Provider value={{ activeSection, progress, registerSection, sections }}>
      {children}
    </ScrollContext.Provider>
  );
}; 