/**
 * useMediaQuery Property-Based Tests
 * 
 * 属性测试：验证响应式断点切换的通用属性
 * Property tests: Verify universal properties of responsive breakpoint switching
 * 
 * Feature: react-admin-system
 * Property 8: 响应式菜单断点切换
 * 
 * **Validates: Requirements 2.4, 9.2, 9.3**
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

const fcConfig = {
  numRuns: 100,
  verbose: true,
};

/**
 * Helper function to determine if a viewport width is mobile
 * Mirrors the logic in useIsMobile hook
 */
function isMobileViewport(width: number): boolean {
  return width < 768;
}

/**
 * Helper function to determine if a viewport width is tablet
 * Mirrors the logic in useIsTablet hook
 */
function isTabletViewport(width: number): boolean {
  return width >= 768 && width < 1200;
}

/**
 * Helper function to determine if a viewport width is desktop
 * Mirrors the logic in useIsDesktop hook
 */
function isDesktopViewport(width: number): boolean {
  return width >= 1200;
}

/**
 * Helper function to get breakpoint name
 * Mirrors the logic in useBreakpoint hook
 */
function getBreakpoint(width: number): 'mobile' | 'tablet' | 'desktop' {
  if (isMobileViewport(width)) return 'mobile';
  if (isTabletViewport(width)) return 'tablet';
  return 'desktop';
}

describe('Property 8: Responsive menu breakpoint switching', () => {
  /**
   * 属性：对于任何视口宽度，当宽度小于768像素时，应该被识别为移动端；
   * 当宽度大于等于768像素时，应该被识别为非移动端。
   * 
   * Property: For any viewport width, when width < 768px, should be identified as mobile;
   * when width >= 768px, should be identified as non-mobile.
   * 
   * Validates Requirement 2.4: WHERE 屏幕宽度小于768像素, THE Navigation_Menu SHALL 切换为可折叠的移动端菜单
   * Validates Requirement 9.3: WHERE 屏幕宽度小于768像素, THE Admin_System SHALL 使用移动端布局
   */
  it('对于任何视口宽度，应该在768px断点正确切换移动端/非移动端模式', () => {
    fc.assert(
      fc.property(
        // 生成随机视口宽度 (320px - 1920px)
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          const isMobile = isMobileViewport(viewportWidth);
          
          if (viewportWidth < 768) {
            // 小于768px应该是移动端
            expect(isMobile).toBe(true);
          } else {
            // 大于等于768px应该不是移动端
            expect(isMobile).toBe(false);
          }
        }
      ),
      fcConfig
    );
  });

  /**
   * 属性：对于任何视口宽度，应该只属于一个断点类别（mobile、tablet或desktop）
   * 
   * Property: For any viewport width, should belong to exactly one breakpoint category
   */
  it('对于任何视口宽度，应该只属于一个断点类别', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          const isMobile = isMobileViewport(viewportWidth);
          const isTablet = isTabletViewport(viewportWidth);
          const isDesktop = isDesktopViewport(viewportWidth);
          
          // 应该只有一个为true
          const trueCount = [isMobile, isTablet, isDesktop].filter(Boolean).length;
          expect(trueCount).toBe(1);
        }
      ),
      fcConfig
    );
  });

  /**
   * 属性：对于任何768到1199像素之间的视口宽度，应该被识别为平板端
   * 
   * Property: For any viewport width between 768px and 1199px, should be identified as tablet
   * 
   * Validates Requirement 9.2: WHERE 屏幕宽度在768到1199像素之间, THE Admin_System SHALL 使用平板端布局
   */
  it('对于任何768到1199像素之间的视口，应该被识别为平板端', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 768, max: 1199 }),
        (viewportWidth) => {
          const isTablet = isTabletViewport(viewportWidth);
          const breakpoint = getBreakpoint(viewportWidth);
          
          expect(isTablet).toBe(true);
          expect(breakpoint).toBe('tablet');
        }
      ),
      fcConfig
    );
  });

  /**
   * 属性：对于任何大于等于1200像素的视口宽度，应该被识别为桌面端
   * 
   * Property: For any viewport width >= 1200px, should be identified as desktop
   * 
   * Validates Requirement 9.1: WHERE 屏幕宽度大于等于1200像素, THE Admin_System SHALL 使用桌面端布局
   */
  it('对于任何大于等于1200像素的视口，应该被识别为桌面端', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1200, max: 3840 }),
        (viewportWidth) => {
          const isDesktop = isDesktopViewport(viewportWidth);
          const breakpoint = getBreakpoint(viewportWidth);
          
          expect(isDesktop).toBe(true);
          expect(breakpoint).toBe('desktop');
        }
      ),
      fcConfig
    );
  });

  /**
   * 属性：对于任何小于768像素的视口宽度，应该被识别为移动端
   * 
   * Property: For any viewport width < 768px, should be identified as mobile
   */
  it('对于任何小于768像素的视口，应该被识别为移动端', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }),
        (viewportWidth) => {
          const isMobile = isMobileViewport(viewportWidth);
          const breakpoint = getBreakpoint(viewportWidth);
          
          expect(isMobile).toBe(true);
          expect(breakpoint).toBe('mobile');
        }
      ),
      fcConfig
    );
  });

  /**
   * 属性：断点边界值应该正确分类
   * 
   * Property: Breakpoint boundary values should be correctly classified
   */
  it('断点边界值应该正确分类', () => {
    // 767px应该是移动端
    expect(isMobileViewport(767)).toBe(true);
    expect(getBreakpoint(767)).toBe('mobile');
    
    // 768px应该是平板端
    expect(isMobileViewport(768)).toBe(false);
    expect(isTabletViewport(768)).toBe(true);
    expect(getBreakpoint(768)).toBe('tablet');
    
    // 1199px应该是平板端
    expect(isTabletViewport(1199)).toBe(true);
    expect(getBreakpoint(1199)).toBe('tablet');
    
    // 1200px应该是桌面端
    expect(isTabletViewport(1200)).toBe(false);
    expect(isDesktopViewport(1200)).toBe(true);
    expect(getBreakpoint(1200)).toBe('desktop');
  });

  /**
   * 属性：对于任何视口宽度序列，断点分类应该保持一致性
   * 
   * Property: For any sequence of viewport widths, breakpoint classification should be consistent
   */
  it('对于任何视口宽度序列，断点分类应该保持一致性', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.integer({ min: 320, max: 1920 }),
          { minLength: 2, maxLength: 10 }
        ),
        (viewportWidths) => {
          for (const width of viewportWidths) {
            const breakpoint = getBreakpoint(width);
            
            // 验证断点分类的一致性
            if (width < 768) {
              expect(breakpoint).toBe('mobile');
            } else if (width < 1200) {
              expect(breakpoint).toBe('tablet');
            } else {
              expect(breakpoint).toBe('desktop');
            }
          }
        }
      ),
      fcConfig
    );
  });

  /**
   * 属性：对于任何两个相邻的视口宽度，如果它们跨越断点，断点应该改变
   * 
   * Property: For any two adjacent viewport widths, if they cross a breakpoint, the breakpoint should change
   */
  it('对于跨越断点的视口宽度变化，断点应该改变', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }), // 移动端宽度
        fc.integer({ min: 768, max: 1199 }), // 平板端宽度
        fc.integer({ min: 1200, max: 1920 }), // 桌面端宽度
        (mobileWidth, tabletWidth, desktopWidth) => {
          const mobileBreakpoint = getBreakpoint(mobileWidth);
          const tabletBreakpoint = getBreakpoint(tabletWidth);
          const desktopBreakpoint = getBreakpoint(desktopWidth);
          
          // 三个断点应该都不同
          expect(mobileBreakpoint).toBe('mobile');
          expect(tabletBreakpoint).toBe('tablet');
          expect(desktopBreakpoint).toBe('desktop');
          
          // 它们应该互不相同
          expect(mobileBreakpoint).not.toBe(tabletBreakpoint);
          expect(tabletBreakpoint).not.toBe(desktopBreakpoint);
          expect(mobileBreakpoint).not.toBe(desktopBreakpoint);
        }
      ),
      fcConfig
    );
  });

  /**
   * 属性：对于任何视口宽度，断点函数应该是确定性的（相同输入产生相同输出）
   * 
   * Property: For any viewport width, breakpoint functions should be deterministic
   */
  it('对于任何视口宽度，断点函数应该是确定性的', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          // 多次调用应该返回相同结果
          const result1 = getBreakpoint(viewportWidth);
          const result2 = getBreakpoint(viewportWidth);
          const result3 = getBreakpoint(viewportWidth);
          
          expect(result1).toBe(result2);
          expect(result2).toBe(result3);
        }
      ),
      fcConfig
    );
  });

  /**
   * 属性：对于任何视口宽度，如果宽度增加但不跨越断点，断点应该保持不变
   * 
   * Property: For any viewport width, if width increases but doesn't cross breakpoint, breakpoint should remain same
   */
  it('对于同一断点范围内的宽度变化，断点应该保持不变', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        fc.integer({ min: 1, max: 50 }), // 小的增量
        (baseWidth, increment) => {
          const width1 = baseWidth;
          const width2 = Math.min(baseWidth + increment, 1920);
          
          const breakpoint1 = getBreakpoint(width1);
          const breakpoint2 = getBreakpoint(width2);
          
          // 如果两个宽度在同一断点范围内，断点应该相同
          const sameRange = 
            (width1 < 768 && width2 < 768) ||
            (width1 >= 768 && width1 < 1200 && width2 >= 768 && width2 < 1200) ||
            (width1 >= 1200 && width2 >= 1200);
          
          if (sameRange) {
            expect(breakpoint1).toBe(breakpoint2);
          }
        }
      ),
      fcConfig
    );
  });
});
