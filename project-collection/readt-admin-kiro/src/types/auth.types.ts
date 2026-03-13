/**
 * 认证相关类型定义
 * Authentication Type Definitions
 */

/**
 * 用户角色常量
 */
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  VIEWER: 'viewer'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

/**
 * 用户状态常量
 */
export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
} as const;

export type UserStatus = typeof UserStatus[keyof typeof UserStatus];

/**
 * 用户模型
 */
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

/**
 * 认证令牌
 */
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType: 'Bearer';
}

/**
 * 认证状态
 */
export interface AuthState {
  token: AuthToken | null;
  user: User | null;
  isAuthenticated: boolean;
}

/**
 * 登录凭据
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * 认证响应
 */
export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}
