/**
 * useMediaQuery Hook
 * 
 * Custom hook to monitor viewport width changes and match media queries.
 * Provides responsive behavior based on viewport breakpoints.
 * 
 * Requirements: 2.4, 9.2, 9.3
 */

import { useState, useEffect } from 'react';

/**
 * Hook to check if a media query matches
 * 
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1199px)');
 * const isDesktop = useMediaQuery('(min-width: 1200px)');
 * ```
 * 
 * Validates Requirements:
 * - 2.4: WHERE 屏幕宽度小于768像素, THE Navigation_Menu SHALL 切换为可折叠的移动端菜单
 * - 9.2: WHERE 屏幕宽度在768到1199像素之间, THE Admin_System SHALL 使用平板端布局
 * - 9.3: WHERE 屏幕宽度小于768像素, THE Admin_System SHALL 使用移动端布局
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with false for SSR compatibility
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    // Use addEventListener for modern browsers
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks for common responsive scenarios
 */

/**
 * Check if viewport is mobile size (< 768px)
 * 
 * @returns true if viewport width is less than 768px
 * 
 * Validates Requirement 9.3: WHERE 屏幕宽度小于768像素, THE Admin_System SHALL 使用移动端布局
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Check if viewport is tablet size (768px - 1199px)
 * 
 * @returns true if viewport width is between 768px and 1199px
 * 
 * Validates Requirement 9.2: WHERE 屏幕宽度在768到1199像素之间, THE Admin_System SHALL 使用平板端布局
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1199px)');
}

/**
 * Check if viewport is desktop size (>= 1200px)
 * 
 * @returns true if viewport width is 1200px or greater
 * 
 * Validates Requirement 9.1: WHERE 屏幕宽度大于等于1200像素, THE Admin_System SHALL 使用桌面端布局
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1200px)');
}

/**
 * Get current breakpoint name
 * 
 * @returns 'mobile' | 'tablet' | 'desktop'
 */
export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
}
