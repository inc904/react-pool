/**
 * ProtectedRoute 组件测试
 * ProtectedRoute Component Tests
 * 
 * 验证需求: 1.3, 7.2
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '@hooks/useAuth';
import { usePermission } from '@hooks/usePermission';

// Mock the hooks
vi.mock('@hooks/useAuth');
vi.mock('@hooks/usePermission');

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('验证需求 1.3: 认证检查', () => {
    it('未认证用户应该被重定向到登录页', () => {
      // Mock未认证状态
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: false,
        user: null,
        token: null,
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        error: null,
      });

      vi.mocked(usePermission).mockReturnValue({
        hasPermission: vi.fn(),
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: null,
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // 应该显示登录页面
      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('已认证用户应该能访问受保护的内容', () => {
      // Mock已认证状态
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        token: 'valid-token',
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        error: null,
      });

      vi.mocked(usePermission).mockReturnValue({
        hasPermission: vi.fn().mockReturnValue(true),
        hasAnyPermission: vi.fn().mockReturnValue(true),
        hasAllPermissions: vi.fn().mockReturnValue(true),
        userRole: 'admin',
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // 应该显示受保护的内容
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    });
  });

  describe('验证需求 7.2: 权限检查', () => {
    it('无权限用户应该被重定向到403页面', () => {
      // Mock已认证但无权限状态
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'user',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        token: 'valid-token',
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        error: null,
      });

      vi.mocked(usePermission).mockReturnValue({
        hasPermission: vi.fn().mockReturnValue(false),
        hasAnyPermission: vi.fn().mockReturnValue(false),
        hasAllPermissions: vi.fn().mockReturnValue(false),
        userRole: 'user',
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/403" element={<div>403 Forbidden</div>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredPermissions={['admin:access']}>
                  <div>Admin Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // 应该显示403页面
      expect(screen.getByText('403 Forbidden')).toBeInTheDocument();
      expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
    });

    it('有权限用户应该能访问受保护的内容', () => {
      // Mock已认证且有权限状态
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        token: 'valid-token',
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        error: null,
      });

      vi.mocked(usePermission).mockReturnValue({
        hasPermission: vi.fn().mockReturnValue(true),
        hasAnyPermission: vi.fn().mockReturnValue(true),
        hasAllPermissions: vi.fn().mockReturnValue(true),
        userRole: 'admin',
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/403" element={<div>403 Forbidden</div>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredPermissions={['admin:access']}>
                  <div>Admin Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // 应该显示管理员内容
      expect(screen.getByText('Admin Content')).toBeInTheDocument();
      expect(screen.queryByText('403 Forbidden')).not.toBeInTheDocument();
    });

    it('未指定权限要求时应该只检查认证状态', () => {
      // Mock已认证状态
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'user',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        token: 'valid-token',
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        error: null,
      });

      const mockHasAllPermissions = vi.fn();
      vi.mocked(usePermission).mockReturnValue({
        hasPermission: vi.fn(),
        hasAnyPermission: vi.fn(),
        hasAllPermissions: mockHasAllPermissions,
        userRole: 'user',
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/403" element={<div>403 Forbidden</div>} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // 应该显示受保护的内容
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      
      // 不应该调用权限检查
      expect(mockHasAllPermissions).not.toHaveBeenCalled();
    });

    it('空权限数组应该不触发权限检查', () => {
      // Mock已认证状态
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'user',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        token: 'valid-token',
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        error: null,
      });

      const mockHasAllPermissions = vi.fn();
      vi.mocked(usePermission).mockReturnValue({
        hasPermission: vi.fn(),
        hasAnyPermission: vi.fn(),
        hasAllPermissions: mockHasAllPermissions,
        userRole: 'user',
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/403" element={<div>403 Forbidden</div>} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute requiredPermissions={[]}>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // 应该显示受保护的内容
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      
      // 不应该调用权限检查
      expect(mockHasAllPermissions).not.toHaveBeenCalled();
    });

    it('应该调用hasAllPermissions检查所有必需权限', () => {
      // Mock已认证且有权限状态
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        token: 'valid-token',
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        error: null,
      });

      const mockHasAllPermissions = vi.fn().mockReturnValue(true);
      vi.mocked(usePermission).mockReturnValue({
        hasPermission: vi.fn(),
        hasAnyPermission: vi.fn(),
        hasAllPermissions: mockHasAllPermissions,
        userRole: 'admin',
      });

      const requiredPermissions = ['user:create', 'user:update'];

      render(
        <MemoryRouter initialEntries={['/users']}>
          <Routes>
            <Route path="/403" element={<div>403 Forbidden</div>} />
            <Route
              path="/users"
              element={
                <ProtectedRoute requiredPermissions={requiredPermissions}>
                  <div>Users Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // 应该调用hasAllPermissions并传入正确的权限数组
      expect(mockHasAllPermissions).toHaveBeenCalledWith(requiredPermissions);
      
      // 应该显示用户内容
      expect(screen.getByText('Users Content')).toBeInTheDocument();
    });
  });

  describe('认证和权限组合场景', () => {
    it('未认证用户应该先被重定向到登录页，而不是403页面', () => {
      // Mock未认证状态
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: false,
        user: null,
        token: null,
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        error: null,
      });

      vi.mocked(usePermission).mockReturnValue({
        hasPermission: vi.fn(),
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: null,
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/403" element={<div>403 Forbidden</div>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredPermissions={['admin:access']}>
                  <div>Admin Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // 应该显示登录页面，而不是403页面
      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('403 Forbidden')).not.toBeInTheDocument();
      expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
    });
  });
});
