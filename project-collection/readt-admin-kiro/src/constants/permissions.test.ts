/**
 * 权限常量测试
 * Permission Constants Tests
 */

import { describe, it, expect } from 'vitest';
import { 
  PERMISSIONS, 
  RolePermissions, 
  getRolePermissions, 
  roleHasPermission 
} from './permissions';
import { UserRole } from '../types/auth.types';

describe('Permission Constants', () => {
  describe('PERMISSIONS', () => {
    it('应该定义所有必需的权限常量', () => {
      expect(PERMISSIONS.USER_CREATE).toBe('user:create');
      expect(PERMISSIONS.USER_READ).toBe('user:read');
      expect(PERMISSIONS.USER_UPDATE).toBe('user:update');
      expect(PERMISSIONS.USER_DELETE).toBe('user:delete');
      expect(PERMISSIONS.DASHBOARD_VIEW).toBe('dashboard:view');
      expect(PERMISSIONS.SYSTEM_SETTINGS).toBe('system:settings');
    });
  });

  describe('RolePermissions', () => {
    it('管理员应该拥有所有权限', () => {
      const adminPermissions = RolePermissions[UserRole.ADMIN];
      
      expect(adminPermissions).toContain(PERMISSIONS.USER_CREATE);
      expect(adminPermissions).toContain(PERMISSIONS.USER_READ);
      expect(adminPermissions).toContain(PERMISSIONS.USER_UPDATE);
      expect(adminPermissions).toContain(PERMISSIONS.USER_DELETE);
      expect(adminPermissions).toContain(PERMISSIONS.DASHBOARD_VIEW);
      expect(adminPermissions).toContain(PERMISSIONS.SYSTEM_SETTINGS);
    });

    it('普通用户应该只有读取权限', () => {
      const userPermissions = RolePermissions[UserRole.USER];
      
      expect(userPermissions).toContain(PERMISSIONS.USER_READ);
      expect(userPermissions).toContain(PERMISSIONS.DASHBOARD_VIEW);
      expect(userPermissions).not.toContain(PERMISSIONS.USER_CREATE);
      expect(userPermissions).not.toContain(PERMISSIONS.USER_UPDATE);
      expect(userPermissions).not.toContain(PERMISSIONS.USER_DELETE);
      expect(userPermissions).not.toContain(PERMISSIONS.SYSTEM_SETTINGS);
    });

    it('访客应该只能查看仪表盘', () => {
      const viewerPermissions = RolePermissions[UserRole.VIEWER];
      
      expect(viewerPermissions).toContain(PERMISSIONS.DASHBOARD_VIEW);
      expect(viewerPermissions).not.toContain(PERMISSIONS.USER_READ);
      expect(viewerPermissions).not.toContain(PERMISSIONS.USER_CREATE);
      expect(viewerPermissions).not.toContain(PERMISSIONS.USER_UPDATE);
      expect(viewerPermissions).not.toContain(PERMISSIONS.USER_DELETE);
      expect(viewerPermissions).not.toContain(PERMISSIONS.SYSTEM_SETTINGS);
    });
  });

  describe('getRolePermissions', () => {
    it('应该返回管理员的所有权限', () => {
      const permissions = getRolePermissions(UserRole.ADMIN);
      expect(permissions.length).toBeGreaterThan(0);
      expect(permissions).toContain(PERMISSIONS.USER_CREATE);
    });

    it('应该返回普通用户的权限', () => {
      const permissions = getRolePermissions(UserRole.USER);
      expect(permissions).toContain(PERMISSIONS.USER_READ);
      expect(permissions).toContain(PERMISSIONS.DASHBOARD_VIEW);
    });

    it('应该返回访客的权限', () => {
      const permissions = getRolePermissions(UserRole.VIEWER);
      expect(permissions).toContain(PERMISSIONS.DASHBOARD_VIEW);
      expect(permissions.length).toBe(1);
    });
  });

  describe('roleHasPermission', () => {
    it('管理员应该拥有用户创建权限', () => {
      expect(roleHasPermission(UserRole.ADMIN, PERMISSIONS.USER_CREATE)).toBe(true);
    });

    it('普通用户不应该拥有用户创建权限', () => {
      expect(roleHasPermission(UserRole.USER, PERMISSIONS.USER_CREATE)).toBe(false);
    });

    it('访客不应该拥有用户读取权限', () => {
      expect(roleHasPermission(UserRole.VIEWER, PERMISSIONS.USER_READ)).toBe(false);
    });

    it('访客应该拥有仪表盘查看权限', () => {
      expect(roleHasPermission(UserRole.VIEWER, PERMISSIONS.DASHBOARD_VIEW)).toBe(true);
    });
  });
});
