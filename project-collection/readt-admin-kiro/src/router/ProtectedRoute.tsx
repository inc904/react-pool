/**
 * ProtectedRoute 组件
 * ProtectedRoute Component
 * 
 * 保护需要认证的路由，验证用户身份和权限
 * Protects routes that require authentication, validates user identity and permissions
 * 
 * 验证需求: 1.3, 7.2
 */

import { Navigate } from 'react-router';
import { useAuth } from '@hooks/useAuth';
import { usePermission } from '@hooks/usePermission';

/**
 * ProtectedRoute 组件属性
 */
export interface ProtectedRouteProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 所需权限列表（可选，用于权限检查） */
  requiredPermissions?: string[];
}

/**
 * ProtectedRoute 组件
 * 
 * 功能：
 * 1. 检查用户认证状态
 * 2. 验证用户权限
 * 3. 未认证用户重定向到登录页
 * 4. 无权限用户重定向到 403 错误页
 * 
 * @param {ProtectedRouteProps} props - 组件属性
 * @returns {React.ReactElement} 受保护的路由组件
 * 
 * @example
 * ```tsx
 * // 基本用法 - 仅需要认证
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <Dashboard />
 *   </ProtectedRoute>
 * } />
 * 
 * // 带权限检查 - 需要特定权限
 * <Route path="/users" element={
 *   <ProtectedRoute requiredPermissions={['user:read']}>
 *     <UsersPage />
 *   </ProtectedRoute>
 * } />
 * ```
 * 
 * 验证需求:
 * - 1.3: WHEN 访问令牌过期, THE Auth_Module SHALL 要求用户重新登录
 * - 7.2: WHEN 用户尝试访问无权限的页面, THE Permission_System SHALL 重定向到403错误页面
 */
export function ProtectedRoute({ 
  children, 
  requiredPermissions
}: ProtectedRouteProps): React.ReactElement {
  const { isAuthenticated } = useAuth();
  const { hasAllPermissions } = usePermission();

  // 验证需求 1.3: 检查用户认证状态
  // 未认证用户重定向到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 验证需求 7.2: 权限检查
  // 如果指定了所需权限，检查用户是否拥有所有权限
  if (requiredPermissions && requiredPermissions.length > 0) {
    if (!hasAllPermissions(requiredPermissions)) {
      return <Navigate to="/403" replace />;
    }
  }

  // 认证和权限检查通过，渲染子组件
  return <>{children}</>;
}

export default ProtectedRoute;
