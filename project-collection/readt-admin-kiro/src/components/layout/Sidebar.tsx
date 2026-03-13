/**
 * Sidebar Component
 * 
 * 侧边导航菜单组件
 * Side navigation menu component
 * 
 * 功能:
 * - 根据路由配置生成菜单项
 * - 高亮当前选中菜单项
 * - 支持菜单折叠/展开
 * - 根据用户权限过滤菜单项
 * 
 * 验证需求: 2.1, 2.2, 7.1
 */

import { Link, useLocation } from 'react-router';
import { usePermission } from '@hooks/usePermission';
import type { MenuItem } from './types';

export interface SidebarProps {
  /** 是否折叠 */
  collapsed: boolean;
  /** 菜单项配置 */
  menuItems: MenuItem[];
  /** 移动端是否打开 */
  mobileOpen?: boolean;
  /** 关闭移动端菜单回调 */
  onMobileClose?: () => void;
}

/**
 * Sidebar 组件
 * 
 * @example
 * ```tsx
 * <Sidebar
 *   collapsed={false}
 *   menuItems={menuConfig}
 *   mobileOpen={true}
 *   onMobileClose={() => setMobileOpen(false)}
 * />
 * ```
 * 
 * 验证需求:
 * - 2.1: THE Admin_System SHALL 显示包含所有功能模块的侧边导航菜单
 * - 2.2: WHEN 用户点击菜单项, THE Navigation_Menu SHALL 高亮当前选中项并导航到对应页面
 * - 7.1: THE Permission_System SHALL 根据用户角色显示或隐藏菜单项
 */
export function Sidebar({ collapsed, menuItems, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const { hasPermission } = usePermission();

  /**
   * 检查菜单项是否应该显示
   * 根据用户权限过滤菜单项
   * 
   * 验证需求: 7.1 - 根据用户角色显示或隐藏菜单项
   */
  const shouldShowMenuItem = (item: MenuItem): boolean => {
    // 如果没有权限要求，则显示
    if (!item.permission) {
      return true;
    }
    // 检查用户是否有权限
    return hasPermission(item.permission);
  };

  /**
   * 检查菜单项是否为当前选中项
   * 
   * 验证需求: 2.2 - 高亮当前选中菜单项
   */
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  /**
   * 处理菜单项点击
   * 在移动端点击后关闭菜单
   */
  const handleMenuItemClick = () => {
    if (mobileOpen && onMobileClose) {
      onMobileClose();
    }
  };

  // 过滤出有权限的菜单项
  const visibleMenuItems = menuItems.filter(shouldShowMenuItem);

  return (
    <aside
      className={`
        fixed top-16 bottom-0 left-0 z-40 bg-white border-r border-gray-200 shadow-sm
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${collapsed ? 'lg:w-20' : 'lg:w-64'}
        w-64
      `}
      aria-label="侧边导航"
    >
      <nav className="h-full overflow-y-auto p-4">
        <ul className="space-y-2">
          {visibleMenuItems.map((item) => {
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleMenuItemClick}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg
                    transition-colors duration-200
                    ${active 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                    ${collapsed ? 'lg:justify-center' : ''}
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  {/* 图标 */}
                  <span 
                    className={`
                      shrink-0 text-xl
                      ${active ? 'text-blue-600' : 'text-gray-500'}
                    `}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  
                  {/* 标题 - 折叠时隐藏 */}
                  {!collapsed && (
                    <span className="flex-1 truncate">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
