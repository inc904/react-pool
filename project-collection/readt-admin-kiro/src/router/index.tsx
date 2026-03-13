/**
 * 路由配置
 * Router Configuration
 *
 * 使用 React Router v7 配置应用路由
 * Configure application routes using React Router v7
 *
 * 验证需求: 1.1, 7.2, 2.1, 2.3
 */

import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { Login, Dashboard, Forbidden } from '@pages/index';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '@components/layout';

/**
 * 路由配置
 *
 * 路由结构:
 * - 公开路由: 不需要认证即可访问
 *   - /login: 登录页面
 *
 * - 受保护路由: 需要认证才能访问，使用 MainLayout 包装
 *   - /dashboard: 仪表盘页面（使用 ProtectedRoute 保护）
 *
 * - 错误页面:
 *   - /403: 无权限访问页面
 *
 * - 重定向:
 *   - /: 重定向到登录页面
 *
 * 验证需求:
 * - 1.1: 用户认证和访问控制
 * - 2.1: 显示包含所有功能模块的侧边导航菜单
 * - 2.3: 在顶部显示用户信息和登出按钮
 * - 7.2: WHEN 用户尝试访问无权限的页面, THE Permission_System SHALL 重定向到403错误页面
 */
export const router = createBrowserRouter([
  // 默认路由 - 重定向到登录页面
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  // 公开路由 - 登录页面
  {
    path: '/login',
    element: <Login />,
  },

  // 受保护路由 - 使用 MainLayout 包装
  {
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },

  // 错误页面 - 403 无权限访问
  {
    path: '/403',
    element: <Forbidden />,
  },
]);

export { ProtectedRoute } from './ProtectedRoute';
export type { ProtectedRouteProps } from './ProtectedRoute';

export default router;
