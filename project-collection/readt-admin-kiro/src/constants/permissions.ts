/**
 * 权限控制常量
 * Permission Control Constants
 * 
 * 定义系统中的所有权限和角色权限映射
 */

import { UserRole } from '../types/auth.types';

/**
 * 权限常量
 * 格式: RESOURCE:ACTION
 */
export const PERMISSIONS = {
  // 用户管理权限
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  
  // 仪表盘权限
  DASHBOARD_VIEW: 'dashboard:view',
  
  // 系统管理权限
  SYSTEM_SETTINGS: 'system:settings',
} as const;

/**
 * 权限类型
 */
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

/**
 * 角色权限映射
 * 定义每个角色拥有的权限列表
 */
export const RolePermissions: Record<UserRole, Permission[]> = {
  // 管理员：拥有所有权限
  [UserRole.ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.SYSTEM_SETTINGS,
  ],
  
  // 普通用户：可以查看用户和仪表盘，但不能修改
  [UserRole.USER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.DASHBOARD_VIEW,
  ],
  
  // 访客：只能查看仪表盘
  [UserRole.VIEWER]: [
    PERMISSIONS.DASHBOARD_VIEW,
  ],
};

/**
 * 获取角色的所有权限
 * @param role 用户角色
 * @returns 权限列表
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return RolePermissions[role] || [];
}

/**
 * 检查角色是否拥有指定权限
 * @param role 用户角色
 * @param permission 权限
 * @returns 是否拥有权限
 */
export function roleHasPermission(role: UserRole, permission: Permission): boolean {
  return RolePermissions[role]?.includes(permission) || false;
}
