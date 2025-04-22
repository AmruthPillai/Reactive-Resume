import { useEffect } from 'react';

// Add TypeScript declarations for the global mouse position
declare global {
  interface Window {
    mousePosX?: number;
    mousePosY?: number;
    mouseTrackerInitialized?: boolean;
    isScrolling?: boolean;
    scrollTimeout?: NodeJS.Timeout;
    forceAllowScroll?: boolean;
  }
}

/**
 * Hook to track mouse position globally
 * This allows components to know the cursor position even before they're hovered
 */
export const useGlobalMousePosition = () => {
  useEffect(() => {
    // Only initialize once
    if (window.mouseTrackerInitialized) return;
    
    window.mouseTrackerInitialized = true;
    window.mousePosX = 0;
    window.mousePosY = 0;
    window.isScrolling = false;
    
    const trackMousePosition = (e: MouseEvent) => {
      // Always track mouse position even during scrolling
      window.mousePosX = e.clientX;
      window.mousePosY = e.clientY;
    };
    
    window.addEventListener('mousemove', trackMousePosition, { passive: true });
    
    // Initialize the global scroll detection if not already done
    if (!window.forceAllowScroll) {
      window.forceAllowScroll = true;
      
      // Global detection of scrolling state
      const detectScrolling = () => {
        window.isScrolling = true;
        
        if (window.scrollTimeout) clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          window.isScrolling = false;
        }, 300);
      };
      
      window.addEventListener('wheel', detectScrolling, { passive: true, capture: false });
      window.addEventListener('scroll', detectScrolling, { passive: true, capture: false });
    }
    
    return () => {
      // Don't remove the listener on component unmount
      // We want this to persist for all cards
    };
  }, []);
  
  /**
   * Check if an element is currently being hovered
   * Note: Even during scrolling we return true for hover checks,
   * but components should check window.isScrolling to disable visual effects
   */
  const isElementHovered = (element: HTMLElement | null): boolean => {
    if (!element || typeof window.mousePosX === 'undefined' || typeof window.mousePosY === 'undefined') return false;
    
    const rect = element.getBoundingClientRect();
    return (
      window.mousePosX >= rect.left &&
      window.mousePosX <= rect.right &&
      window.mousePosY >= rect.top &&
      window.mousePosY <= rect.bottom
    );
  };
  
  return {
    isElementHovered
  };
}; 