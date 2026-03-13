/**
 * useAuth 自定义Hook
 * useAuth Custom Hook
 * 
 * 封装认证状态和操作，提供简洁的认证接口
 * Encapsulates authentication state and operations, providing a clean auth interface
 * 
 * 验证需求: 1.1, 1.5
 */

import { useState, useCallback } from 'react';
import { useAuthStore } from '@store/authStore';
import type { LoginCredentials, User, AuthToken } from '@/types/auth.types';

/**
 * useAuth Hook返回值接口
 */
export interface UseAuthReturn {
  /** 当前用户信息 */
  user: User | null;
  /** 访问令牌 */
  token: AuthToken | null;
  /** 是否已认证 */
  isAuthenticated: boolean;
  /** 登录函数 */
  login: (credentials: LoginCredentials) => Promise<void>;
  /** 登出函数 */
  logout: () => Promise<void>;
  /** 加载状态 */
  isLoading: boolean;
  /** 错误信息 */
  error: Error | null;
}

/**
 * useAuth Hook
 * 
 * 提供认证相关的状态和操作
 * 
 * @returns {UseAuthReturn} 认证状态和操作接口
 * 
 * @example
 * ```tsx
 * function LoginPage() {
 *   const { login, isLoading, error, isAuthenticated } = useAuth();
 *   
 *   const handleSubmit = async (credentials) => {
 *     await login(credentials);
 *   };
 *   
 *   if (isAuthenticated) {
 *     return <Navigate to="/dashboard" />;
 *   }
 *   
 *   return <LoginForm onSubmit={handleSubmit} loading={isLoading} error={error} />;
 * }
 * ```
 * 
 * 验证需求:
 * - 1.1: 提供login方法验证凭据并生成访问令牌
 * - 1.5: 提供logout方法清除访问令牌
 */
export function useAuth(): UseAuthReturn {
  // 从authStore获取状态和操作
  const authStore = useAuthStore();
  
  // 本地状态管理加载和错误
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * 登录函数
   * 
   * 验证需求: 1.1 - WHEN 用户提交有效的用户名和密码, THE Auth_Module SHALL 验证凭据并生成访问令牌
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authStore.login(credentials);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('登录失败');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [authStore]);

  /**
   * 登出函数
   * 
   * 验证需求: 1.5 - WHEN 用户点击登出按钮, THE Auth_Module SHALL 清除访问令牌
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authStore.logout();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('登出失败');
      setError(error);
      // 登出失败不抛出错误，因为本地状态已经清除
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authStore]);

  return {
    user: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    login,
    logout,
    isLoading,
    error,
  };
}

export default useAuth;
