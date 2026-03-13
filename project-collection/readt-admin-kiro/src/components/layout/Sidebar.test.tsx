/**
 * Sidebar Component Tests
 * 
 * 测试侧边导航菜单组件的功能
 * Tests for the Sidebar navigation menu component
 * 
 * 验证需求: 2.1, 2.2, 7.1
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import type { MenuItem } from './types';
import { usePermission } from '@hooks/usePermission';

// Mock usePermission hook
vi.mock('@hooks/usePermission');

describe('Sidebar Component', () => {
  const mockMenuItems: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: '📊',
      permission: 'dashboard:view',
    },
    {
      key: 'users',
      label: 'Users',
      path: '/users',
      icon: '👥',
      permission: 'user:read',
    },
    {
      key: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: '⚙️',
      permission: 'system:settings',
    },
  ];

  beforeEach(() => {
    // Default: user has all permissions
    vi.mocked(usePermission).mockReturnValue({
      hasPermission: () => true,
      hasAnyPermission: () => true,
      hasAllPermissions: () => true,
      userRole: 'admin',
    });
  });

  describe('Menu Item Rendering', () => {
    it('应该渲染所有有权限的菜单项', () => {
      render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      // 验证需求 2.1: 显示包含所有功能模块的侧边导航菜单
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('应该显示菜单项的图标', () => {
      render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      expect(screen.getByText('📊')).toBeInTheDocument();
      expect(screen.getByText('👥')).toBeInTheDocument();
      expect(screen.getByText('⚙️')).toBeInTheDocument();
    });

    it('折叠时应该只显示图标', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar collapsed={true} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      // 图标应该可见
      expect(screen.getByText('📊')).toBeInTheDocument();
      
      // 侧边栏应该有折叠样式类
      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveClass('lg:w-20');
    });
  });

  describe('Active Menu Item Highlighting', () => {
    it('应该高亮当前路由对应的菜单项', () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </MemoryRouter>
      );

      // 验证需求 2.2: 高亮当前选中菜单项
      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('aria-current', 'page');
      expect(dashboardLink).toHaveClass('bg-blue-50', 'text-blue-600');
    });

    it('非当前路由的菜单项不应该高亮', () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </MemoryRouter>
      );

      const usersLink = screen.getByRole('link', { name: /users/i });
      expect(usersLink).not.toHaveAttribute('aria-current');
      expect(usersLink).not.toHaveClass('bg-blue-50');
    });

    it('路由变化时应该更新高亮状态', () => {
      // 测试Dashboard路由
      const { unmount: unmount1 } = render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </MemoryRouter>
      );

      // 初始状态：Dashboard高亮
      const dashboardLink1 = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink1).toHaveAttribute('aria-current', 'page');
      
      const usersLink1 = screen.getByRole('link', { name: /users/i });
      expect(usersLink1).not.toHaveAttribute('aria-current');

      unmount1();

      // 切换路由到Users
      render(
        <MemoryRouter initialEntries={['/users']}>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </MemoryRouter>
      );

      // 验证需求 2.2: 导航到对应页面后更新高亮
      const usersLink2 = screen.getByRole('link', { name: /users/i });
      expect(usersLink2).toHaveAttribute('aria-current', 'page');
      
      const dashboardLink2 = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink2).not.toHaveAttribute('aria-current');
    });
  });

  describe('Permission-based Filtering', () => {
    it('应该只显示用户有权限的菜单项', () => {
      // Mock: 用户只有dashboard:view权限
      vi.mocked(usePermission).mockReturnValue({
        hasPermission: (permission: string) => permission === 'dashboard:view',
        hasAnyPermission: () => false,
        hasAllPermissions: () => false,
        userRole: 'viewer',
      });

      render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      // 验证需求 7.1: 根据用户角色显示或隐藏菜单项
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('Users')).not.toBeInTheDocument();
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });

    it('应该隐藏用户无权限的菜单项', () => {
      // Mock: 用户没有system:settings权限
      vi.mocked(usePermission).mockReturnValue({
        hasPermission: (permission: string) => permission !== 'system:settings',
        hasAnyPermission: () => true,
        hasAllPermissions: () => false,
        userRole: 'user',
      });

      render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      // 验证需求 7.1: 隐藏无权限的菜单项
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });

    it('没有permission字段的菜单项应该始终显示', () => {
      const menuWithPublicItem: MenuItem[] = [
        ...mockMenuItems,
        {
          key: 'about',
          label: 'About',
          path: '/about',
          icon: 'ℹ️',
          // 没有permission字段
        },
      ];

      // Mock: 用户没有任何权限
      vi.mocked(usePermission).mockReturnValue({
        hasPermission: () => false,
        hasAnyPermission: () => false,
        hasAllPermissions: () => false,
        userRole: 'viewer',
      });

      render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={menuWithPublicItem} />
        </BrowserRouter>
      );

      // 公开菜单项应该显示
      expect(screen.getByText('About')).toBeInTheDocument();
      // 需要权限的菜单项不应该显示
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });
  });

  describe('Collapse Functionality', () => {
    it('折叠状态应该改变侧边栏宽度', () => {
      const { container, rerender } = render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveClass('lg:w-64');

      // 切换到折叠状态
      rerender(
        <BrowserRouter>
          <Sidebar collapsed={true} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      expect(sidebar).toHaveClass('lg:w-20');
    });
  });

  describe('Mobile Behavior', () => {
    it('移动端打开时应该显示侧边栏', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} mobileOpen={true} />
        </BrowserRouter>
      );

      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveClass('translate-x-0');
    });

    it('移动端关闭时应该隐藏侧边栏', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} mobileOpen={false} />
        </BrowserRouter>
      );

      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveClass('-translate-x-full');
    });

    it('点击菜单项后应该关闭移动端菜单', async () => {
      const user = userEvent.setup();
      const onMobileClose = vi.fn();

      render(
        <BrowserRouter>
          <Sidebar
            collapsed={false}
            menuItems={mockMenuItems}
            mobileOpen={true}
            onMobileClose={onMobileClose}
          />
        </BrowserRouter>
      );

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      await user.click(dashboardLink);

      expect(onMobileClose).toHaveBeenCalledTimes(1);
    });

    it('移动端关闭时点击菜单项不应该调用onMobileClose', async () => {
      const user = userEvent.setup();
      const onMobileClose = vi.fn();

      render(
        <BrowserRouter>
          <Sidebar
            collapsed={false}
            menuItems={mockMenuItems}
            mobileOpen={false}
            onMobileClose={onMobileClose}
          />
        </BrowserRouter>
      );

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      await user.click(dashboardLink);

      // 移动端未打开，不应该调用关闭回调
      expect(onMobileClose).not.toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('点击菜单项应该导航到对应路径', () => {
      render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      // 验证需求 2.2: 导航到对应页面
      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');

      const usersLink = screen.getByRole('link', { name: /users/i });
      expect(usersLink).toHaveAttribute('href', '/users');
    });
  });

  describe('Accessibility', () => {
    it('应该有正确的ARIA标签', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveAttribute('aria-label', '侧边导航');
    });

    it('当前页面的链接应该有aria-current属性', () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </MemoryRouter>
      );

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('aria-current', 'page');
    });

    it('图标应该有aria-hidden属性', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('空菜单项数组应该不报错', () => {
      expect(() => {
        render(
          <BrowserRouter>
            <Sidebar collapsed={false} menuItems={[]} />
          </BrowserRouter>
        );
      }).not.toThrow();
    });

    it('所有菜单项都无权限时应该显示空导航', () => {
      vi.mocked(usePermission).mockReturnValue({
        hasPermission: () => false,
        hasAnyPermission: () => false,
        hasAllPermissions: () => false,
        userRole: null,
      });

      render(
        <BrowserRouter>
          <Sidebar collapsed={false} menuItems={mockMenuItems} />
        </BrowserRouter>
      );

      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Users')).not.toBeInTheDocument();
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });
  });
});
