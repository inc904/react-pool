/**
 * 存储工具演示脚本
 * Storage Utilities Demo Script
 * 
 * 此文件用于演示和验证存储工具函数的功能
 */

import { setToken, getToken, clearToken } from './storage';

/**
 * 演示令牌存储往返一致性 (需求 1.4)
 */
export function demonstrateTokenRoundTrip() {
  console.log('=== 令牌存储往返一致性演示 ===\n');
  
  // 测试1: 基本令牌存储
  console.log('测试1: 基本令牌存储');
  const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test-token';
  console.log('保存令牌:', token1);
  setToken(token1);
  const retrieved1 = getToken();
  console.log('读取令牌:', retrieved1);
  console.log('一致性检查:', token1 === retrieved1 ? '✓ 通过' : '✗ 失败');
  console.log('');
  
  // 测试2: 更新令牌
  console.log('测试2: 更新令牌');
  const token2 = 'new-token-value-12345';
  console.log('保存新令牌:', token2);
  setToken(token2);
  const retrieved2 = getToken();
  console.log('读取令牌:', retrieved2);
  console.log('一致性检查:', token2 === retrieved2 ? '✓ 通过' : '✗ 失败');
  console.log('');
  
  // 测试3: 清除令牌
  console.log('测试3: 清除令牌');
  clearToken();
  const retrieved3 = getToken();
  console.log('清除后读取:', retrieved3);
  console.log('清除检查:', retrieved3 === null ? '✓ 通过' : '✗ 失败');
  console.log('');
  
  // 测试4: 长令牌字符串
  console.log('测试4: 长令牌字符串');
  const longToken = 'a'.repeat(200);
  setToken(longToken);
  const retrieved4 = getToken();
  console.log('长令牌长度:', longToken.length);
  console.log('读取长度:', retrieved4?.length);
  console.log('一致性检查:', longToken === retrieved4 ? '✓ 通过' : '✗ 失败');
  console.log('');
  
  // 清理
  clearToken();
  
  console.log('=== 所有测试完成 ===');
}

// 如果直接运行此文件，执行演示
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateTokenRoundTrip();
}
