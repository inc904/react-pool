/**
 * Breadcrumb Property-Based Tests
 * 
 * 属性测试：验证面包屑导航的通用属性
 * Property tests: Verify universal properties of breadcrumb navigation
 * 
 * Feature: react-admin-system
 * Property 7: 面包屑反映当前路由
 * 
 * **Validates: Requirements 2.5**
 */

import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fc from 'fast-check';
import { Breadcrumb } from './Breadcrumb';

const fcConfig = {
  numRuns: 50,
  verbose: true,
};

describe('Property 7: Breadcrumb reflects current route', () => {
  /**
   * 属性：对于任何有效的路由路径，面包屑组件应该生成与该路径层级结构对应的导航链接序列
   * Property: For any valid route path, the breadcrumb component should generate 
   * a navigation link sequence corresponding to the path hierarchy
   */
  it('对于任何路由路径，面包屑应该包含正确数量的层级', () => {
    fc.assert(
      fc.property(
        // 生成有效的路由路径（1-4层深度）
        fc.array(
          fc.stringMatching(/^[a-z][a-z0-9-]*$/),
          { minLength: 1, maxLength: 4 }
        ),
        (pathSegments) => {
          const pathname = `/${pathSegments.join('/')}`;

          const { unmount } = render(
            <MemoryRouter initialEntries={[pathname]}>
              <Breadcrumb />
            </MemoryRouter>
          );

          const breadcrumbItems = screen.getAllByRole('listitem');
          
          // 面包屑数量应该等于路径段数量 + 1（Home）
          const expectedCount = pathSegments.length + 1;
          
          expect(breadcrumbItems.length).toBe(expectedCount);
          
          unmount();
        }
      ),
      fcConfig
    );
  });

  it('对于任何路由路径，最后一个面包屑应该不可点击', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.stringMatching(/^[a-z][a-z0-9-]*$/),
          { minLength: 1, maxLength: 3 }
        ),
        (pathSegments) => {
          const pathname = `/${pathSegments.join('/')}`;

          const { unmount, container } = render(
            <MemoryRouter initialEntries={[pathname]}>
              <Breadcrumb />
            </MemoryRouter>
          );

          const breadcrumbItems = container.querySelectorAll('li');
          const lastItem = breadcrumbItems[breadcrumbItems.length - 1];
          
          // 最后一个面包屑应该是span，不是链接
          const span = lastItem.querySelector('span.text-gray-900');
          expect(span).toBeInTheDocument();
          
          // 最后一个面包屑不应该包含链接
          const links = lastItem.querySelectorAll('a');
          expect(links.length).toBe(0);
          
          unmount();
        }
      ),
      fcConfig
    );
  });

  it('对于任何多层路由，除最后一个外的所有面包屑都应该可点击', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.stringMatching(/^[a-z][a-z0-9-]*$/),
          { minLength: 2, maxLength: 4 }
        ),
        (pathSegments) => {
          const pathname = `/${pathSegments.join('/')}`;

          const { unmount, container } = render(
            <MemoryRouter initialEntries={[pathname]}>
              <Breadcrumb />
            </MemoryRouter>
          );

          const breadcrumbItems = container.querySelectorAll('li');
          
          // 除了最后一个，所有面包屑都应该包含链接
          for (let i = 0; i < breadcrumbItems.length - 1; i++) {
            const item = breadcrumbItems[i];
            const link = item.querySelector('a');
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href');
          }
          
          unmount();
        }
      ),
      fcConfig
    );
  });

  it('对于任何路由路径，面包屑链接应该指向正确的路径', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.stringMatching(/^[a-z][a-z0-9-]*$/),
          { minLength: 1, maxLength: 3 }
        ),
        (pathSegments) => {
          const pathname = `/${pathSegments.join('/')}`;

          const { unmount, container } = render(
            <MemoryRouter initialEntries={[pathname]}>
              <Breadcrumb />
            </MemoryRouter>
          );

          const links = container.querySelectorAll('a');
          
          // 第一个链接应该指向/dashboard（Home）
          if (links.length > 0) {
            expect(links[0]).toHaveAttribute('href', '/dashboard');
          }
          
          // 其他链接应该指向对应的路径
          let currentPath = '';
          for (let i = 0; i < pathSegments.length - 1; i++) {
            currentPath += `/${pathSegments[i]}`;
            // links[i+1] 因为第一个是Home
            if (links[i + 1]) {
              expect(links[i + 1]).toHaveAttribute('href', currentPath);
            }
          }
          
          unmount();
        }
      ),
      fcConfig
    );
  });

  it('对于任何路由路径，面包屑应该始终以Home开始', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.stringMatching(/^[a-z][a-z0-9-]*$/),
          { minLength: 1, maxLength: 4 }
        ),
        (pathSegments) => {
          const pathname = `/${pathSegments.join('/')}`;

          const { unmount, container } = render(
            <MemoryRouter initialEntries={[pathname]}>
              <Breadcrumb />
            </MemoryRouter>
          );

          // 应该始终显示Home图标
          const homeIcon = container.querySelector('li:first-child');
          expect(homeIcon?.textContent).toContain('🏠');
          
          unmount();
        }
      ),
      fcConfig
    );
  });

  it('对于任何多层路由，面包屑项之间应该有分隔符', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.stringMatching(/^[a-z][a-z0-9-]*$/),
          { minLength: 1, maxLength: 4 }
        ),
        (pathSegments) => {
          const pathname = `/${pathSegments.join('/')}`;

          const { unmount, container } = render(
            <MemoryRouter initialEntries={[pathname]}>
              <Breadcrumb />
            </MemoryRouter>
          );

          const separators = container.querySelectorAll('.mx-2.text-gray-400');
          
          // 分隔符数量应该等于路径段数量
          expect(separators.length).toBe(pathSegments.length);
          
          unmount();
        }
      ),
      fcConfig
    );
  });

  it('对于任何路由路径，面包屑应该有正确的可访问性属性', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.stringMatching(/^[a-z][a-z0-9-]*$/),
          { minLength: 0, maxLength: 3 }
        ),
        (pathSegments) => {
          const pathname = pathSegments.length > 0 
            ? `/${pathSegments.join('/')}` 
            : '/dashboard';

          const { unmount, container } = render(
            <MemoryRouter initialEntries={[pathname]}>
              <Breadcrumb />
            </MemoryRouter>
          );

          // 应该有正确的aria-label
          const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
          expect(nav).toBeInTheDocument();
          
          // 应该使用有序列表
          const list = nav?.querySelector('ol');
          expect(list).toBeInTheDocument();
          
          unmount();
        }
      ),
      fcConfig
    );
  });
});
