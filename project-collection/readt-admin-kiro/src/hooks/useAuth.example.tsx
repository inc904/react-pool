/**
 * useAuth Hook 使用示例
 * useAuth Hook Usage Examples
 * 
 * 此文件展示如何在不同场景下使用useAuth Hook
 * This file demonstrates how to use the useAuth Hook in different scenarios
 */

import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

/**
 * 示例1: 登录页面组件
 * Example 1: Login Page Component
 */
export function LoginPageExample() {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await login({
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      });
      
      // 登录成功后跳转到仪表盘
      navigate('/dashboard');
    } catch (err) {
      // 错误已经在useAuth中处理，这里可以显示额外的UI反馈
      console.error('Login failed:', err);
    }
  };

  // 如果已经登录，重定向到仪表盘
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" placeholder="用户名" required />
      <input name="password" type="password" placeholder="密码" required />
      
      {error && <div className="error">{error.message}</div>}
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? '登录中...' : '登录'}
      </button>
    </form>
  );
}

/**
 * 示例2: 用户信息显示组件
 * Example 2: User Info Display Component
 */
export function UserInfoExample() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <div>未登录</div>;
  }

  return (
    <div className="user-info">
      <img src={user.avatar} alt={user.username} />
      <div>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>角色: {user.role}</p>
      </div>
    </div>
  );
}

/**
 * 示例3: 登出按钮组件
 * Example 3: Logout Button Component
 */
export function LogoutButtonExample() {
  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // 登出成功后跳转到登录页
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? '登出中...' : '登出'}
    </button>
  );
}

/**
 * 示例4: 受保护的路由组件
 * Example 4: Protected Route Component
 */
export function ProtectedRouteExample({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // 加载中显示加载指示器
  if (isLoading) {
    return <div>加载中...</div>;
  }

  // 未认证重定向到登录页
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // 已认证显示子组件
  return <>{children}</>;
}

/**
 * 示例5: Header组件中使用
 * Example 5: Usage in Header Component
 */
export function HeaderExample() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">管理系统</div>
      
      {isAuthenticated && user && (
        <div className="user-section">
          <span>欢迎, {user.username}</span>
          <button onClick={logout}>登出</button>
        </div>
      )}
    </header>
  );
}
