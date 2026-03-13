/**
 * 认证服务
 * Authentication Service
 * 
 * 提供用户认证相关的API调用功能
 * Provides API calls for user authentication
 */

import { apiClient } from '@services/apiClient';
import type { LoginCredentials, AuthResponse } from '@/types/auth.types';

/**
 * 认证服务类
 */
class AuthService {
  /**
   * 用户登录
   * @param credentials - 登录凭据（用户名和密码）
   * @returns Promise<AuthResponse> - 认证响应（令牌、用户信息、过期时间）
   * 
   * 验证需求: 1.1, 1.2
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // 登录请求跳过认证（因为还没有令牌）
    return await apiClient.post<AuthResponse>('/auth/login', credentials, { skipAuth: true });
  }

  /**
   * 用户登出
   * @returns Promise<void>
   * 
   * 验证需求: 1.5
   */
  async logout(): Promise<void> {
    await apiClient.post<void>('/auth/logout');
  }

  /**
   * 刷新访问令牌
   * @returns Promise<string> - 新的访问令牌
   * 
   * 验证需求: 1.3
   */
  async refreshToken(): Promise<string> {
    const response = await apiClient.post<{ token: string }>('/auth/refresh');
    return response.token;
  }

  /**
   * 验证令牌有效性
   * @param token - 访问令牌
   * @returns boolean - 令牌是否有效
   * 
   * 验证需求: 1.3
   */
  validateToken(token: string): boolean {
    if (!token || token.trim() === '') {
      return false;
    }

    try {
      // 解析JWT令牌（简化版本，实际应该使用jwt-decode库）
      const parts = token.split('.');
      if (parts.length !== 3) {
        return false;
      }

      // 解码payload
      const payload = JSON.parse(atob(parts[1]));
      
      // 检查过期时间
      if (payload.exp) {
        const expirationTime = payload.exp * 1000; // 转换为毫秒
        const currentTime = Date.now();
        return currentTime < expirationTime;
      }

      // 如果没有过期时间，认为令牌有效
      return true;
    } catch {
      // 解析失败，令牌无效
      return false;
    }
  }
}

// 导出单例实例
export const authService = new AuthService();
export default authService;
