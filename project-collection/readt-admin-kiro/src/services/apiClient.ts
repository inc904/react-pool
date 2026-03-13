/**
 * API客户端
 * API Client
 * 
 * 提供统一的HTTP请求客户端，包含认证、错误处理和超时配置
 * Provides unified HTTP client with authentication, error handling, and timeout configuration
 * 
 * 验证需求: 8.1, 8.2, 8.3, 8.4
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios';
import { getToken } from '@utils/storage';
import { showError, showWarning } from '@utils/notification';

/**
 * API配置
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_TIMEOUT = 30000; // 30秒超时 - 验证需求: 8.4

/**
 * 请求配置接口
 */
export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean; // 是否跳过认证（用于登录等公开接口）
}

/**
 * API响应接口
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * API错误接口
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

/**
 * 创建API客户端实例
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    // 创建Axios实例
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 设置请求拦截器
    this.setupRequestInterceptor();

    // 设置响应拦截器
    this.setupResponseInterceptor();
  }

  /**
   * 设置请求拦截器
   * 
   * 验证需求: 8.1 - THE API_Client SHALL 在所有请求头中包含访问令牌
   */
  private setupRequestInterceptor(): void {
    this.client.interceptors.request.use(
      (config) => {
        // 检查是否跳过认证
        const skipAuth = (config as RequestConfig).skipAuth;
        
        if (!skipAuth) {
          // 从本地存储获取令牌
          const token = getToken();
          
          // 如果令牌存在，添加到请求头
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * 设置响应拦截器
   * 
   * 验证需求: 8.2, 8.3, 8.4, 10.2
   */
  private setupResponseInterceptor(): void {
    this.client.interceptors.response.use(
      // 成功响应处理
      (response) => {
        return response;
      },
      // 错误响应处理
      async (error: AxiosError) => {
        // 处理网络错误（无响应）
        if (!error.response) {
          if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            // 验证需求: 8.4 - WHEN 网络请求超过30秒, THE API_Client SHALL 取消请求并显示超时错误
            const message = '请求超时，请稍后重试';
            showError(message);
            console.error('Request timeout:', error.message);
            return Promise.reject({
              code: 'TIMEOUT',
              message,
              originalError: error,
            });
          }

          // 其他网络错误
          const message = '网络连接失败，请检查您的网络设置';
          showError(message);
          console.error('Network error:', error.message);
          return Promise.reject({
            code: 'NETWORK_ERROR',
            message,
            originalError: error,
          });
        }

        const { status } = error.response;

        // 根据状态码处理不同错误
        switch (status) {
          case 401:
            // 验证需求: 8.2 - WHEN API返回401状态码, THE API_Client SHALL 清除令牌并重定向到登录页面
            showWarning('会话已过期，请重新登录');
            console.error('Unauthorized: Token invalid or expired');
            this.handle401Error();
            return Promise.reject({
              code: 'UNAUTHORIZED',
              message: '会话已过期，请重新登录',
              status: 401,
              originalError: error,
            });

          case 403:
            // 权限不足
            showError('您没有权限访问此资源');
            console.error('Forbidden: Insufficient permissions');
            return Promise.reject({
              code: 'FORBIDDEN',
              message: '您没有权限访问此资源',
              status: 403,
              originalError: error,
            });

          case 404:
            // 资源不存在
            showError('请求的资源不存在');
            console.error('Not Found: Resource does not exist');
            return Promise.reject({
              code: 'NOT_FOUND',
              message: '请求的资源不存在',
              status: 404,
              originalError: error,
            });

          case 500:
          case 502:
          case 503:
          case 504:
            // 验证需求: 8.3 - WHEN API返回500状态码, THE API_Client SHALL 显示服务器错误提示
            showError('服务器暂时不可用，请稍后重试');
            console.error('Server error:', status);
            return Promise.reject({
              code: 'SERVER_ERROR',
              message: '服务器暂时不可用，请稍后重试',
              status,
              originalError: error,
            });

          default:
            // 其他错误 - 验证需求: 10.2 显示错误提示消息并说明失败原因
            {
              const responseData = error.response.data as { message?: string } | undefined;
              const errorMessage = responseData?.message || error.message || '操作失败';
              showError(errorMessage);
              console.error('API error:', status, errorMessage);
              return Promise.reject({
                code: 'API_ERROR',
                message: errorMessage,
                status,
                originalError: error,
              });
            }
        }
      }
    );
  }

  /**
   * 处理401错误
   * 清除认证状态并重定向到登录页面
   * 
   * 验证需求: 8.2
   */
  private handle401Error(): void {
    // 动态导入authStore以避免循环依赖
    import('@store/authStore').then(({ useAuthStore }) => {
      const authStore = useAuthStore.getState();
      authStore.clearAuth();
      
      // 重定向到登录页面
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    });
  }

  /**
   * GET请求
   * @param url - 请求URL
   * @param config - 请求配置
   * @returns Promise<T> - 响应数据
   */
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * POST请求
   * @param url - 请求URL
   * @param data - 请求数据
   * @param config - 请求配置
   * @returns Promise<T> - 响应数据
   */
  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT请求
   * @param url - 请求URL
   * @param data - 请求数据
   * @param config - 请求配置
   * @returns Promise<T> - 响应数据
   */
  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE请求
   * @param url - 请求URL
   * @param config - 请求配置
   * @returns Promise<T> - 响应数据
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * PATCH请求
   * @param url - 请求URL
   * @param data - 请求数据
   * @param config - 请求配置
   * @returns Promise<T> - 响应数据
   */
  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * 获取原始Axios实例（用于高级用法）
   */
  getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

// 导出单例实例
export const apiClient = new ApiClient();
export default apiClient;
