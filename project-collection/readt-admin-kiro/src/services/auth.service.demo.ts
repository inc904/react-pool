/**
 * AuthService 使用示例
 * AuthService Usage Examples
 * 
 * 此文件展示如何使用认证服务
 * This file demonstrates how to use the authentication service
 */

import { authService } from './auth.service';
import type { LoginCredentials } from '@/types/auth.types';

/**
 * 示例1: 用户登录
 */
async function loginExample() {
  try {
    const credentials: LoginCredentials = {
      username: 'admin',
      password: 'password123',
    };

    const response = await authService.login(credentials);
    console.log('登录成功:', response);
    console.log('访问令牌:', response.token);
    console.log('用户信息:', response.user);
    console.log('过期时间:', response.expiresIn);
  } catch (error) {
    console.error('登录失败:', error);
  }
}

/**
 * 示例2: 验证令牌
 */
function validateTokenExample() {
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6OTk5OTk5OTk5OX0.xxx';
  const invalidToken = 'invalid.token.here';
  const emptyToken = '';

  console.log('有效令牌验证:', authService.validateToken(validToken));
  console.log('无效令牌验证:', authService.validateToken(invalidToken));
  console.log('空令牌验证:', authService.validateToken(emptyToken));
}

/**
 * 示例3: 刷新令牌
 */
async function refreshTokenExample() {
  try {
    const newToken = await authService.refreshToken();
    console.log('新令牌:', newToken);
  } catch (error) {
    console.error('刷新令牌失败:', error);
  }
}

/**
 * 示例4: 用户登出
 */
async function logoutExample() {
  try {
    await authService.logout();
    console.log('登出成功');
  } catch (error) {
    console.error('登出失败:', error);
  }
}

/**
 * 示例5: 完整的认证流程
 */
async function completeAuthFlowExample() {
  try {
    // 1. 登录
    const credentials: LoginCredentials = {
      username: 'admin',
      password: 'password123',
    };
    const authResponse = await authService.login(credentials);
    console.log('步骤1: 登录成功');

    // 2. 验证令牌
    const isValid = authService.validateToken(authResponse.token);
    console.log('步骤2: 令牌验证结果:', isValid);

    // 3. 使用令牌进行API调用（这里只是示例）
    console.log('步骤3: 使用令牌访问受保护资源...');

    // 4. 刷新令牌（如果需要）
    await authService.refreshToken();
    console.log('步骤4: 令牌已刷新');

    // 5. 登出
    await authService.logout();
    console.log('步骤5: 登出成功');
  } catch (error) {
    console.error('认证流程出错:', error);
  }
}

// 导出示例函数供测试使用
export {
  loginExample,
  validateTokenExample,
  refreshTokenExample,
  logoutExample,
  completeAuthFlowExample,
};
