// Application constants

/**
 * API配置常量
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30秒
} as const;

/**
 * 认证相关常量
 */
export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
} as const;

/**
 * 导出权限相关常量
 */
export * from './permissions';
