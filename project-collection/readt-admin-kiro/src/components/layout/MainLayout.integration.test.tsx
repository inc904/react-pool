/**
 * MainLayout Integration Tests
 * 
 * 测试MainLayout与Sidebar的集成
 * Tests for MainLayout integration with Sidebar
 * 
 * 验证需求: 2.1, 2.2, 2.4, 7.1, 9.2, 9.3
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Sidebar } from './Sidebar';
import { MainLayout } from './MainLayout';
import { menuConfig } from '@/constants/menuConfig';
import { usePermission } from '@hooks/usePermission';

// Mock hooks - must be at the top level before imports
vi.mock('@hooks/usePermission');
vi.mock('@/store/authStore', () => ({
  useAuthStore: () => ({
    user: { username: 'testuser', email: 'test@example.com' },
    logout: vi.fn(),
  }),
}));
vi.mock('@hooks/useMediaQuery', () => ({
  useIsMobile: vi.fn(() => false),
  useIsTablet: vi.fn(() => false),
  useIsDesktop: vi.fn(() => true),
}));
vi.mock('./Header', () => ({
  Header: ({ onMenuToggle, onMobileMenuToggle }: any) => (
    <header data-testid="mock-header">
      <button onClick={onMenuToggle} aria-label="Toggle sidebar">Toggle</button>
      <button onClick={onMobileMenuToggle} aria-label="Toggle mobile menu">Menu</button>
    </header>
  ),
}));
vi.mock('./Breadcrumb', () => ({
  Breadcrumb: () => <nav data-testid="mock-breadcrumb">Breadcrumb</nav>,
}));

describe('Sidebar with menuConfig Integration', () => {
  beforeEach(() => {
    // Mock permissions - admin has all permissions
    vi.mocked(usePermission).mockReturnValue({
      hasPermission: () => true,
      hasAnyPermission: () => true,
      hasAllPermissions: () => true,
      userRole: 'admin',
    });
  });

  it('应该使用menuConfig渲染菜单项', () => {
    render(
      <MemoryRouter>
        <Sidebar collapsed={false} menuItems={menuConfig} />
      </MemoryRouter>
    );

    // 验证需求 2.1: 显示包含所有功能模块的侧边导航菜单
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('应该为每个菜单项配置正确的权限', () => {
    // Mock: 用户只有dashboard权限
    vi.mocked(usePermission).mockReturnValue({
      hasPermission: (permission: string) => permission === 'dashboard:view',
      hasAnyPermission: () => false,
      hasAllPermissions: () => false,
      userRole: 'viewer',
    });

    render(
      <MemoryRouter>
        <Sidebar collapsed={false} menuItems={menuConfig} />
      </MemoryRouter>
    );

    // 验证需求 7.1: 根据用户角色显示或隐藏菜单项
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Users')).not.toBeInTheDocument();
  });

  it('menuConfig应该包含所有必需的字段', () => {
    menuConfig.forEach(item => {
      expect(item).toHaveProperty('key');
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('path');
      expect(item).toHaveProperty('icon');
      expect(item).toHaveProperty('permission');
    });
  });
});

describe('MainLayout Responsive Behavior', () => {
  beforeEach(() => {
    // Mock permissions - admin has all permissions
    vi.mocked(usePermission).mockReturnValue({
      hasPermission: () => true,
      hasAnyPermission: () => true,
      hasAllPermissions: () => true,
      userRole: 'admin',
    });
  });

  it('应该在桌面端显示固定侧边栏', async () => {
    const { useIsMobile } = await import('@hooks/useMediaQuery');
    vi.mocked(useIsMobile).mockReturnValue(false);

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    // 验证需求 9.1: WHERE 屏幕宽度大于等于1200像素, THE Admin_System SHALL 使用桌面端布局
    const sidebar = screen.getByRole('complementary', { name: /侧边导航/i });
    expect(sidebar).toBeInTheDocument();
  });

  it('应该在移动端自动切换为折叠菜单', async () => {
    const { useIsMobile } = await import('@hooks/useMediaQuery');
    vi.mocked(useIsMobile).mockReturnValue(true);

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    // 验证需求 2.4: WHERE 屏幕宽度小于768像素, THE Navigation_Menu SHALL 切换为可折叠的移动端菜单
    // 验证需求 9.3: WHERE 屏幕宽度小于768像素, THE Admin_System SHALL 使用移动端布局
    const hamburgerButton = screen.getByLabelText(/toggle mobile menu/i);
    expect(hamburgerButton).toBeInTheDocument();
  });

  it('应该在视口宽度变化时自动调整布局', async () => {
    const { useIsMobile } = await import('@hooks/useMediaQuery');
    
    // 初始为桌面端
    vi.mocked(useIsMobile).mockReturnValue(false);
    
    const { rerender } = render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    // 切换到移动端
    vi.mocked(useIsMobile).mockReturnValue(true);
    
    rerender(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    // 验证汉堡菜单按钮出现
    const hamburgerButton = screen.getByLabelText(/toggle mobile menu/i);
    expect(hamburgerButton).toBeInTheDocument();
  });
});
