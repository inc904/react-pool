/**
 * 本地存储工具函数测试
 * Tests for Local Storage Utility Functions
 * 
 * 验证需求: 1.4 - THE Auth_Module SHALL 在本地存储中安全保存访问令牌
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setToken, getToken, clearToken } from './storage';

describe('Storage Utilities', () => {
  // 清理localStorage
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('setToken', () => {
    it('应该成功保存令牌到localStorage', () => {
      const token = 'test-token-123';
      setToken(token);
      
      // 直接从localStorage验证
      expect(localStorage.getItem('auth_token')).toBe(token);
    });

    it('应该覆盖已存在的令牌', () => {
      setToken('old-token');
      setToken('new-token');
      
      expect(localStorage.getItem('auth_token')).toBe('new-token');
    });
  });

  describe('getToken', () => {
    it('应该返回已保存的令牌', () => {
      const token = 'test-token-456';
      localStorage.setItem('auth_token', token);
      
      expect(getToken()).toBe(token);
    });

    it('当令牌不存在时应该返回null', () => {
      expect(getToken()).toBeNull();
    });
  });

  describe('clearToken', () => {
    it('应该从localStorage删除令牌', () => {
      localStorage.setItem('auth_token', 'test-token');
      clearToken();
      
      expect(localStorage.getItem('auth_token')).toBeNull();
    });

    it('当令牌不存在时调用clearToken不应该抛出错误', () => {
      expect(() => clearToken()).not.toThrow();
    });
  });

  describe('令牌存储往返一致性 (需求 1.4)', () => {
    it('保存后读取应该得到相同的令牌值', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test';
      
      setToken(token);
      const retrieved = getToken();
      
      expect(retrieved).toBe(token);
    });

    it('应该处理包含特殊字符的令牌', () => {
      const token = 'token-with-special-chars-!@#$%^&*()';
      
      setToken(token);
      const retrieved = getToken();
      
      expect(retrieved).toBe(token);
    });

    it('应该处理长令牌字符串', () => {
      const longToken = 'a'.repeat(500);
      
      setToken(longToken);
      const retrieved = getToken();
      
      expect(retrieved).toBe(longToken);
    });
  });
});
