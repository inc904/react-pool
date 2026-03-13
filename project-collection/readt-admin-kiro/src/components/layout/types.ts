/**
 * Layout Component Types
 * 布局组件类型定义
 */

import type { ReactNode } from 'react';

/**
 * 菜单项配置
 */
export interface MenuItem {
  /** 菜单项唯一标识 */
  key: string;
  /** 显示标签 */
  label: string;
  /** 路由路径 */
  path: string;
  /** 图标（React节点） */
  icon: ReactNode;
  /** 所需权限（可选） */
  permission?: string;
}
