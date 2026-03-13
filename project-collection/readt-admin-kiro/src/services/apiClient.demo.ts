/**
 * API客户端使用示例
 * API Client Usage Examples
 * 
 * 本文件展示如何使用apiClient进行各种HTTP请求
 */

import { apiClient } from './apiClient';
import type { User } from '@/types/auth.types';

/**
 * 示例1: GET请求 - 获取用户列表
 */
async function getUsersExample() {
  try {
    const users = await apiClient.get<User[]>('/users');
    console.log('Users:', users);
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

/**
 * 示例2: POST请求 - 创建新用户
 */
async function createUserExample() {
  try {
    const newUser = await apiClient.post<User>('/users', {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123',
      role: 'user',
    });
    console.log('Created user:', newUser);
    return newUser;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

/**
 * 示例3: PUT请求 - 更新用户信息
 */
async function updateUserExample(userId: string) {
  try {
    const updatedUser = await apiClient.put<User>(`/users/${userId}`, {
      username: 'updateduser',
      email: 'updated@example.com',
    });
    console.log('Updated user:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
}

/**
 * 示例4: DELETE请求 - 删除用户
 */
async function deleteUserExample(userId: string) {
  try {
    await apiClient.delete(`/users/${userId}`);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
}

/**
 * 示例5: 带查询参数的GET请求
 */
async function getUsersWithParamsExample() {
  try {
    const users = await apiClient.get<User[]>('/users', {
      params: {
        page: 1,
        pageSize: 10,
        role: 'admin',
      },
    });
    console.log('Filtered users:', users);
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

/**
 * 示例6: 跳过认证的请求（用于公开接口）
 */
async function publicApiExample() {
  try {
    const data = await apiClient.get('/public/stats', {
      skipAuth: true,
    });
    console.log('Public data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch public data:', error);
    throw error;
  }
}

/**
 * 示例7: 错误处理
 */
async function errorHandlingExample() {
  try {
    await apiClient.get('/non-existent-endpoint');
  } catch (error: any) {
    // 错误对象包含以下字段：
    // - code: 错误代码（如 'UNAUTHORIZED', 'SERVER_ERROR', 'TIMEOUT' 等）
    // - message: 用户友好的错误消息
    // - status: HTTP状态码（如果有）
    // - originalError: 原始的Axios错误对象
    
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('HTTP status:', error.status);
    
    // 根据错误类型进行不同处理
    switch (error.code) {
      case 'UNAUTHORIZED':
        console.log('User needs to login again');
        break;
      case 'FORBIDDEN':
        console.log('User does not have permission');
        break;
      case 'SERVER_ERROR':
        console.log('Server is temporarily unavailable');
        break;
      case 'TIMEOUT':
        console.log('Request timed out');
        break;
      case 'NETWORK_ERROR':
        console.log('Network connection failed');
        break;
      default:
        console.log('An error occurred');
    }
  }
}

/**
 * 示例8: PATCH请求 - 部分更新
 */
async function patchUserExample(userId: string) {
  try {
    const updatedUser = await apiClient.patch<User>(`/users/${userId}`, {
      status: 'active',
    });
    console.log('Patched user:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Failed to patch user:', error);
    throw error;
  }
}

// 导出示例函数
export {
  getUsersExample,
  createUserExample,
  updateUserExample,
  deleteUserExample,
  getUsersWithParamsExample,
  publicApiExample,
  errorHandlingExample,
  patchUserExample,
};

// 如果直接运行此文件，执行示例
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running API Client examples...\n');
  
  // 注意：这些示例需要实际的后端API才能运行
  // 在实际使用中，请确保后端服务正在运行
  
  errorHandlingExample().catch(() => {
    console.log('\nNote: Examples require a running backend API');
  });
}
