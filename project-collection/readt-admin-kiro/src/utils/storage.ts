/**
 * 本地存储工具函数
 * Local Storage Utility Functions
 * 
 * 验证需求: 1.4 - THE Auth_Module SHALL 在本地存储中安全保存访问令牌
 */

const TOKEN_KEY = 'auth_token';

/**
 * 保存令牌到本地存储
 * @param token - 访问令牌字符串
 */
export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save token to localStorage:', error);
    throw new Error('无法保存令牌到本地存储');
  }
}

/**
 * 从本地存储读取令牌
 * @returns 令牌字符串，如果不存在则返回null
 */
export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to read token from localStorage:', error);
    return null;
  }
}

/**
 * 从本地存储清除令牌
 */
export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear token from localStorage:', error);
    throw new Error('无法清除本地存储的令牌');
  }
}
