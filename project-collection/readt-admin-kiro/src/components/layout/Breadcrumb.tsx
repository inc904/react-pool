/**
 * Breadcrumb Component
 * 
 * 面包屑导航组件，根据当前路由生成导航路径
 * Breadcrumb navigation component that generates navigation path based on current route
 * 
 * Features:
 * - Automatically generates breadcrumb items from current route path
 * - Supports click navigation to parent routes
 * - Displays home icon for root level
 * - Shows current page as non-clickable text
 * 
 * 验证需求: 2.5
 * Validates: Requirements 2.5
 */

import { Link, useLocation } from 'react-router-dom';
import { menuConfig } from '@/constants/menuConfig';

interface BreadcrumbItem {
  label: string;
  path: string;
}

/**
 * 根据路径生成面包屑项
 * Generate breadcrumb items from path
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/dashboard' }
  ];

  // 如果是首页，只返回首页
  if (pathname === '/' || pathname === '/dashboard') {
    return breadcrumbs;
  }

  // 分割路径
  const pathSegments = pathname.split('/').filter(Boolean);

  // 为每个路径段生成面包屑项
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // 从菜单配置中查找匹配的菜单项
    const menuItem = menuConfig.find(item => item.path === currentPath);
    
    if (menuItem) {
      breadcrumbs.push({
        label: menuItem.label,
        path: menuItem.path
      });
    } else {
      // 如果没有找到菜单项，使用路径段作为标签（首字母大写）
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        label,
        path: currentPath
      });
    }
  });

  return breadcrumbs;
}

export function Breadcrumb() {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isHome = index === 0;

          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              
              {isLast ? (
                // 当前页面 - 不可点击
                <span className="text-gray-900 font-medium">
                  {isHome ? '🏠' : item.label}
                </span>
              ) : (
                // 父级页面 - 可点击
                <Link
                  to={item.path}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {isHome ? '🏠' : item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
