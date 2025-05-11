'use client'

import { useEffect } from 'react';

/**
 * Hook to suppress specific React 19 ref warnings
 * These warnings appear because Material UI components use ref in a way 
 * that's considered deprecated in React 19
 */
export default function useSuppressRefWarnings() {
  useEffect(() => {
    // Store the original console.error
    const originalConsoleError = console.error;
    
    // Override console.error to filter out specific warnings
    console.error = function(...args) {
      // Check if this is the React 19 ref warning
      if (
        args.length > 0 && 
        typeof args[0] === 'string' && 
        args[0].includes('Accessing element.ref was removed in React 19')
      ) {
        // Suppress the warning
        return;
      }
      
      // Call the original console.error for other errors
      originalConsoleError.apply(console, args);
    };
    
    // Restore original console.error on cleanup
    return () => {
      console.error = originalConsoleError;
    };
  }, []);
} 