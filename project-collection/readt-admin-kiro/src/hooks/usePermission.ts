/**
 * usePermission 自定义Hook
 * usePermission Custom Hook
 * 
 * 提供权限检查功能，根据用户角色判断权限
 * Provides permission checking functionality based on user role
 * 
 * 验证需求: 7.1, 7.2
 */

import { useMemo } from 'react';
import { useAuthStore } from '@store/authStore';
import { getRolePermissions, type Permission } from '@/constants/permissions';
import type { UserRole } from '@/types/auth.types';

/**
 * usePermission Hook返回值接口
 */
export interface UsePermissionReturn {
  /** 检查是否拥有指定权限 */
  hasPermission: (permission: string) => boolean;
  /** 检查是否拥有任意一个权限 */
  hasAnyPermission: (permissions: string[]) => boolean;
  /** 检查是否拥有所有权限 */
  hasAllPermissions: (permissions: string[]) => boolean;
  /** 当前用户角色 */
  userRole: UserRole | null;
}

/**
 * usePermission Hook
 * 
 * 提供权限检查相关的方法
 * 
 * @returns {UsePermissionReturn} 权限检查接口
 * 
 * @example
 * ```tsx
 * function UserManagementPage() {
 *   const { hasPermission, hasAnyPermission } = usePermission();
 *   
 *   const canCreateUser = hasPermission('user:create');
 *   const canManageUsers = hasAnyPermission(['user:create', 'user:update', 'user:delete']);
 *   
 *   return (
 *     <div>
 *       {canCreateUser && <Button>添加用户</Button>}
 *       {canManageUsers && <UserTable />}
 *     </div>
 *   );
 * }
 * ```
 * 
 * 验证需求:
 * - 7.1: THE Permission_System SHALL 根据用户角色显示或隐藏菜单项
 * - 7.2: WHEN 用户尝试访问无权限的页面, THE Permission_System SHALL 重定向到403错误页面
 */
export function usePermission(): UsePermissionReturn {
  // 从authStore获取当前用户
  const user = useAuthStore((state) => state.user);
  
  // 获取用户角色
  const userRole = user?.role || null;
  
  // 获取用户的所有权限（使用useMemo优化性能）
  const userPermissions = useMemo(() => {
    if (!userRole) {
      return [];
    }
    return getRolePermissions(userRole);
  }, [userRole]);

  /**
   * 检查是否拥有指定权限
   * 
   * @param permission - 权限字符串（如 'user:create'）
   * @returns 是否拥有该权限
   * 
   * 验证需求: 7.1 - 根据用户角色显示或隐藏功能
   */
  const hasPermission = (permission: string): boolean => {
    if (!userRole) {
      return false;
    }
    return userPermissions.includes(permission as Permission);
  };

  /**
   * 检查是否拥有任意一个权限
   * 
   * @param permissions - 权限字符串数组
   * @returns 是否拥有至少一个权限
   * 
   * 验证需求: 7.1 - 根据用户角色显示或隐藏功能
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!userRole || permissions.length === 0) {
      return false;
    }
    return permissions.some(permission => 
      userPermissions.includes(permission as Permission)
    );
  };

  /**
   * 检查是否拥有所有权限
   * 
   * @param permissions - 权限字符串数组
   * @returns 是否拥有所有权限
   * 
   * 验证需求: 7.2 - 验证用户是否有权访问特定功能
   */
  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!userRole || permissions.length === 0) {
      return false;
    }
    return permissions.every(permission => 
      userPermissions.includes(permission as Permission)
    );
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    userRole,
  };
}

export default usePermission;
