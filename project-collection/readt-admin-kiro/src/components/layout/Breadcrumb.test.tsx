/**
 * Breadcrumb Component Tests
 * 
 * 测试面包屑导航组件的功能
 * Tests for the Breadcrumb navigation component
 * 
 * 验证需求: 2.5
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('应该在首页显示Home面包屑', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    // 首页应该显示Home图标
    expect(screen.getByText('🏠')).toBeInTheDocument();
  });

  it('应该为Dashboard路由生成正确的面包屑', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    // 应该只显示Home
    const breadcrumbItems = screen.getAllByRole('listitem');
    expect(breadcrumbItems).toHaveLength(1);
  });

  it('应该为Users路由生成正确的面包屑', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    // 应该显示 Home / Users
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    
    const breadcrumbItems = screen.getAllByRole('listitem');
    expect(breadcrumbItems).toHaveLength(2);
  });

  it('应该为未知路由生成面包屑（首字母大写）', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    // 应该显示 Home / Settings
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('应该为嵌套路由生成多级面包屑', () => {
    render(
      <MemoryRouter initialEntries={['/users/profile']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    // 应该显示 Home / Users / Profile
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    
    const breadcrumbItems = screen.getAllByRole('listitem');
    expect(breadcrumbItems).toHaveLength(3);
  });

  it('应该将Home链接指向/dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: '🏠' });
    expect(homeLink).toHaveAttribute('href', '/dashboard');
  });

  it('应该使父级面包屑可点击', () => {
    render(
      <MemoryRouter initialEntries={['/users/profile']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    // Home和Users应该是链接
    const homeLink = screen.getByRole('link', { name: '🏠' });
    expect(homeLink).toBeInTheDocument();
    
    const usersLink = screen.getByRole('link', { name: 'Users' });
    expect(usersLink).toBeInTheDocument();
    expect(usersLink).toHaveAttribute('href', '/users');
  });

  it('应该使当前页面面包屑不可点击', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    // Users应该是span，不是链接
    const usersText = screen.getByText('Users');
    expect(usersText.tagName).toBe('SPAN');
    expect(usersText).toHaveClass('text-gray-900', 'font-medium');
  });

  it('应该在面包屑项之间显示分隔符', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    // 应该有一个分隔符 "/"
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(1);
  });

  it('应该有正确的aria-label', () => {
    render(
      <BrowserRouter>
        <Breadcrumb />
      </BrowserRouter>
    );

    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toBeInTheDocument();
  });

  it('应该为链接应用hover样式类', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: '🏠' });
    expect(homeLink).toHaveClass('text-blue-600', 'hover:text-blue-800', 'hover:underline');
  });
});
