/**
 * usePermission Hook 测试
 * usePermission Hook Tests
 * 
 * 验证需求: 7.1, 7.2
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePermission } from './usePermission';
import { useAuthStore } from '@store/authStore';
import { PERMISSIONS } from '@/constants/permissions';
import { UserRole } from '@/types/auth.types';
import type { User } from '@/types/auth.types';

// Mock the auth store
vi.mock('@store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('usePermission Hook', () => {
  const mockAdminUser: User = {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  const mockRegularUser: User = {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    role: UserRole.USER,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  const mockViewerUser: User = {
    id: '3',
    username: 'viewer',
    email: 'viewer@example.com',
    role: UserRole.VIEWER,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('hasPermission', () => {
    it('管理员应该拥有用户创建权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockAdminUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.USER_CREATE)).toBe(true);
    });

    it('管理员应该拥有所有权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockAdminUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.USER_CREATE)).toBe(true);
      expect(result.current.hasPermission(PERMISSIONS.USER_READ)).toBe(true);
      expect(result.current.hasPermission(PERMISSIONS.USER_UPDATE)).toBe(true);
      expect(result.current.hasPermission(PERMISSIONS.USER_DELETE)).toBe(true);
      expect(result.current.hasPermission(PERMISSIONS.DASHBOARD_VIEW)).toBe(true);
      expect(result.current.hasPermission(PERMISSIONS.SYSTEM_SETTINGS)).toBe(true);
    });

    it('普通用户不应该拥有用户创建权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.USER_CREATE)).toBe(false);
    });

    it('普通用户应该拥有用户读取权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.USER_READ)).toBe(true);
      expect(result.current.hasPermission(PERMISSIONS.DASHBOARD_VIEW)).toBe(true);
    });

    it('访客不应该拥有用户读取权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockViewerUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.USER_READ)).toBe(false);
    });

    it('访客应该拥有仪表盘查看权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockViewerUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.DASHBOARD_VIEW)).toBe(true);
    });

    it('未登录用户不应该拥有任何权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(null);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.USER_READ)).toBe(false);
      expect(result.current.hasPermission(PERMISSIONS.DASHBOARD_VIEW)).toBe(false);
    });
  });

  describe('hasAnyPermission', () => {
    it('管理员应该拥有任意一个管理权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockAdminUser);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAnyPermission([
          PERMISSIONS.USER_CREATE,
          PERMISSIONS.USER_UPDATE,
          PERMISSIONS.USER_DELETE,
        ])
      ).toBe(true);
    });

    it('普通用户应该拥有读取权限中的任意一个', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAnyPermission([
          PERMISSIONS.USER_READ,
          PERMISSIONS.USER_CREATE,
        ])
      ).toBe(true);
    });

    it('普通用户不应该拥有任何管理权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAnyPermission([
          PERMISSIONS.USER_CREATE,
          PERMISSIONS.USER_UPDATE,
          PERMISSIONS.USER_DELETE,
        ])
      ).toBe(false);
    });

    it('访客只应该拥有仪表盘查看权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockViewerUser);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAnyPermission([
          PERMISSIONS.DASHBOARD_VIEW,
          PERMISSIONS.USER_READ,
        ])
      ).toBe(true);

      expect(
        result.current.hasAnyPermission([
          PERMISSIONS.USER_READ,
          PERMISSIONS.USER_CREATE,
        ])
      ).toBe(false);
    });

    it('空权限数组应该返回false', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockAdminUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasAnyPermission([])).toBe(false);
    });

    it('未登录用户不应该拥有任何权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(null);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAnyPermission([
          PERMISSIONS.USER_READ,
          PERMISSIONS.DASHBOARD_VIEW,
        ])
      ).toBe(false);
    });
  });

  describe('hasAllPermissions', () => {
    it('管理员应该拥有所有管理权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockAdminUser);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAllPermissions([
          PERMISSIONS.USER_CREATE,
          PERMISSIONS.USER_UPDATE,
          PERMISSIONS.USER_DELETE,
        ])
      ).toBe(true);
    });

    it('普通用户不应该拥有所有管理权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAllPermissions([
          PERMISSIONS.USER_READ,
          PERMISSIONS.USER_CREATE,
        ])
      ).toBe(false);
    });

    it('普通用户应该拥有所有读取权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAllPermissions([
          PERMISSIONS.USER_READ,
          PERMISSIONS.DASHBOARD_VIEW,
        ])
      ).toBe(true);
    });

    it('访客不应该拥有多个权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockViewerUser);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAllPermissions([
          PERMISSIONS.DASHBOARD_VIEW,
          PERMISSIONS.USER_READ,
        ])
      ).toBe(false);
    });

    it('空权限数组应该返回false', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockAdminUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasAllPermissions([])).toBe(false);
    });

    it('未登录用户不应该拥有任何权限', () => {
      vi.mocked(useAuthStore).mockReturnValue(null);

      const { result } = renderHook(() => usePermission());

      expect(
        result.current.hasAllPermissions([PERMISSIONS.DASHBOARD_VIEW])
      ).toBe(false);
    });
  });

  describe('userRole', () => {
    it('应该返回管理员角色', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockAdminUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.userRole).toBe(UserRole.ADMIN);
    });

    it('应该返回普通用户角色', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.userRole).toBe(UserRole.USER);
    });

    it('应该返回访客角色', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockViewerUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.userRole).toBe(UserRole.VIEWER);
    });

    it('未登录用户应该返回null', () => {
      vi.mocked(useAuthStore).mockReturnValue(null);

      const { result } = renderHook(() => usePermission());

      expect(result.current.userRole).toBe(null);
    });
  });

  describe('验证需求 7.1: 根据用户角色显示或隐藏菜单项', () => {
    it('管理员应该能看到所有菜单项', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockAdminUser);

      const { result } = renderHook(() => usePermission());

      // 管理员可以访问用户管理
      expect(result.current.hasPermission(PERMISSIONS.USER_CREATE)).toBe(true);
      expect(result.current.hasPermission(PERMISSIONS.USER_READ)).toBe(true);
      
      // 管理员可以访问仪表盘
      expect(result.current.hasPermission(PERMISSIONS.DASHBOARD_VIEW)).toBe(true);
      
      // 管理员可以访问系统设置
      expect(result.current.hasPermission(PERMISSIONS.SYSTEM_SETTINGS)).toBe(true);
    });

    it('普通用户不应该看到用户管理菜单', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      // 普通用户不能创建、更新、删除用户
      expect(result.current.hasPermission(PERMISSIONS.USER_CREATE)).toBe(false);
      expect(result.current.hasPermission(PERMISSIONS.USER_UPDATE)).toBe(false);
      expect(result.current.hasPermission(PERMISSIONS.USER_DELETE)).toBe(false);
      
      // 但可以查看用户列表
      expect(result.current.hasPermission(PERMISSIONS.USER_READ)).toBe(true);
      
      // 可以访问仪表盘
      expect(result.current.hasPermission(PERMISSIONS.DASHBOARD_VIEW)).toBe(true);
    });
  });

  describe('验证需求 7.2: 无权限访问重定向', () => {
    it('普通用户尝试访问用户管理功能应该被拒绝', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockRegularUser);

      const { result } = renderHook(() => usePermission());

      // 检查是否有用户管理权限
      const canManageUsers = result.current.hasAnyPermission([
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_DELETE,
      ]);

      expect(canManageUsers).toBe(false);
    });

    it('访客尝试访问用户列表应该被拒绝', () => {
      vi.mocked(useAuthStore).mockReturnValue(mockViewerUser);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.USER_READ)).toBe(false);
    });

    it('未登录用户尝试访问任何受保护页面应该被拒绝', () => {
      vi.mocked(useAuthStore).mockReturnValue(null);

      const { result } = renderHook(() => usePermission());

      expect(result.current.hasPermission(PERMISSIONS.DASHBOARD_VIEW)).toBe(false);
      expect(result.current.hasPermission(PERMISSIONS.USER_READ)).toBe(false);
    });
  });
});
