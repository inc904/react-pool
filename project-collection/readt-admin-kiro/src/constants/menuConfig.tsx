/**
 * 菜单配置
 * Menu Configuration
 * 
 * 定义系统的导航菜单项
 * Defines the system's navigation menu items
 */

import type { MenuItem } from '@components/layout/types';
import { PERMISSIONS } from './permissions';

/**
 * 菜单配置
 * 
 * 每个菜单项包含:
 * - key: 唯一标识
 * - label: 显示文本
 * - path: 路由路径
 * - icon: 图标（使用emoji或图标组件）
 * - permission: 所需权限（可选）
 * 
 * 验证需求:
 * - 2.1: 显示包含所有功能模块的侧边导航菜单
 * - 7.1: 根据用户角色显示或隐藏菜单项
 */
export const menuConfig: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: '📊',
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },
  {
    key: 'users',
    label: 'Users',
    path: '/users',
    icon: '👥',
    permission: PERMISSIONS.USER_READ,
  },
];

export default menuConfig;
