/**
 * Unit tests for useMediaQuery hook
 * 
 * Tests viewport width monitoring and responsive breakpoint detection
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { 
  useMediaQuery, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  useBreakpoint 
} from './useMediaQuery';

describe('useMediaQuery', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>;
  let listeners: Array<(event: MediaQueryListEvent) => void> = [];

  beforeEach(() => {
    listeners = [];
    
    // Mock window.matchMedia
    matchMediaMock = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          listeners.push(handler);
        }
      }),
      removeEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          const index = listeners.indexOf(handler);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        }
      }),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    listeners = [];
  });

  describe('useMediaQuery', () => {
    it('should return false initially when media query does not match', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'));
      
      expect(result.current).toBe(false);
    });

    it('should return true when media query matches', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'));
      
      expect(result.current).toBe(true);
    });

    it('should call matchMedia with correct query', () => {
      const query = '(min-width: 1200px)';
      
      renderHook(() => useMediaQuery(query));
      
      expect(matchMediaMock).toHaveBeenCalledWith(query);
    });

    it('should add event listener on mount', () => {
      const addEventListenerSpy = vi.fn();
      
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addEventListener: addEventListenerSpy,
        removeEventListener: vi.fn(),
      });

      renderHook(() => useMediaQuery('(max-width: 767px)'));
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = vi.fn();
      
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerSpy,
      });

      const { unmount } = renderHook(() => useMediaQuery('(max-width: 767px)'));
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });
  });

  describe('useIsMobile', () => {
    it('should return true for mobile viewport (< 768px)', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useIsMobile());
      
      expect(result.current).toBe(true);
    });

    it('should return false for non-mobile viewport (>= 768px)', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useIsMobile());
      
      expect(result.current).toBe(false);
    });

    it('should use correct media query for mobile breakpoint', () => {
      renderHook(() => useIsMobile());
      
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 767px)');
    });
  });

  describe('useIsTablet', () => {
    it('should return true for tablet viewport (768px - 1199px)', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(min-width: 768px) and (max-width: 1199px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useIsTablet());
      
      expect(result.current).toBe(true);
    });

    it('should return false for non-tablet viewport', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(min-width: 768px) and (max-width: 1199px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useIsTablet());
      
      expect(result.current).toBe(false);
    });

    it('should use correct media query for tablet breakpoint', () => {
      renderHook(() => useIsTablet());
      
      expect(matchMediaMock).toHaveBeenCalledWith('(min-width: 768px) and (max-width: 1199px)');
    });
  });

  describe('useIsDesktop', () => {
    it('should return true for desktop viewport (>= 1200px)', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(min-width: 1200px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useIsDesktop());
      
      expect(result.current).toBe(true);
    });

    it('should return false for non-desktop viewport', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(min-width: 1200px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useIsDesktop());
      
      expect(result.current).toBe(false);
    });

    it('should use correct media query for desktop breakpoint', () => {
      renderHook(() => useIsDesktop());
      
      expect(matchMediaMock).toHaveBeenCalledWith('(min-width: 1200px)');
    });
  });

  describe('useBreakpoint', () => {
    it('should return "mobile" for mobile viewport', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query === '(max-width: 767px)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      const { result } = renderHook(() => useBreakpoint());
      
      expect(result.current).toBe('mobile');
    });

    it('should return "tablet" for tablet viewport', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query === '(min-width: 768px) and (max-width: 1199px)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      const { result } = renderHook(() => useBreakpoint());
      
      expect(result.current).toBe('tablet');
    });

    it('should return "desktop" for desktop viewport', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      const { result } = renderHook(() => useBreakpoint());
      
      expect(result.current).toBe('desktop');
    });
  });

  describe('Edge cases', () => {
    it('should handle exactly 768px boundary (should be tablet, not mobile)', () => {
      // At exactly 768px, mobile query (max-width: 767px) should be false
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query !== '(max-width: 767px)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      const { result: mobileResult } = renderHook(() => useIsMobile());
      
      expect(mobileResult.current).toBe(false);
    });

    it('should handle exactly 1200px boundary (should be desktop)', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query === '(min-width: 1200px)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      const { result: desktopResult } = renderHook(() => useIsDesktop());
      
      expect(desktopResult.current).toBe(true);
    });
  });
});
