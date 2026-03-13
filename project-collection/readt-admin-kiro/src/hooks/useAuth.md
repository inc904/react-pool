# useAuth Hook 文档

## 概述

`useAuth` 是一个自定义React Hook，封装了认证状态和操作，提供简洁的认证接口。它基于Zustand状态管理库构建，与`authStore`集成。

## 功能特性

- ✅ 提供用户认证状态（user, token, isAuthenticated）
- ✅ 封装登录和登出操作
- ✅ 管理加载状态和错误处理
- ✅ 与本地存储同步令牌
- ✅ 类型安全的TypeScript接口

## API接口

### 返回值

```typescript
interface UseAuthReturn {
  user: User | null;              // 当前用户信息
  token: AuthToken | null;        // 访问令牌
  isAuthenticated: boolean;       // 是否已认证
  login: (credentials: LoginCredentials) => Promise<void>;  // 登录函数
  logout: () => Promise<void>;    // 登出函数
  isLoading: boolean;             // 加载状态
  error: Error | null;            // 错误信息
}
```

### 类型定义

```typescript
interface LoginCredentials {
  username: string;
  password: string;
}

interface User {
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

interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType: 'Bearer';
}
```

## 使用方法

### 基本用法

```tsx
import { useAuth } from '@/hooks';

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuth();
  
  // 使用认证状态和操作
}
```

### 登录示例

```tsx
function LoginForm() {
  const { login, isLoading, error } = useAuth();
  
  const handleSubmit = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      // 登录成功，可以进行页面跳转
    } catch (err) {
      // 错误已经在error状态中，可以显示给用户
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      {error && <div className="error">{error.message}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? '登录中...' : '登录'}
      </button>
    </form>
  );
}
```

### 登出示例

```tsx
function LogoutButton() {
  const { logout, isLoading } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    // 登出后可以重定向到登录页
  };
  
  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? '登出中...' : '登出'}
    </button>
  );
}
```

### 显示用户信息

```tsx
function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) {
    return <div>请先登录</div>;
  }
  
  return (
    <div>
      <h2>{user.username}</h2>
      <p>{user.email}</p>
      <p>角色: {user.role}</p>
    </div>
  );
}
```

### 受保护的路由

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  
  return <>{children}</>;
}
```

## 状态管理

### 加载状态

`isLoading` 在以下情况下为 `true`：
- 正在执行登录操作
- 正在执行登出操作

### 错误处理

`error` 包含最近一次操作的错误信息：
- 登录失败时的错误
- 登出失败时的错误（注意：登出失败不会阻止本地状态清除）

每次新的操作开始时，错误状态会被清除。

## 与authStore的关系

`useAuth` Hook是对`authStore`的封装，提供了以下额外功能：

1. **加载状态管理**: 自动管理异步操作的加载状态
2. **错误处理**: 统一的错误捕获和状态管理
3. **简化接口**: 提供更简洁的API，隐藏内部实现细节
4. **React集成**: 使用React Hooks模式，更符合React组件的使用习惯

## 验证需求

- **需求 1.1**: 提供login方法验证凭据并生成访问令牌
- **需求 1.5**: 提供logout方法清除访问令牌

## 最佳实践

### 1. 错误处理

```tsx
const { login, error } = useAuth();

// 方式1: 使用error状态
if (error) {
  showNotification({ type: 'error', message: error.message });
}

// 方式2: 使用try-catch
try {
  await login(credentials);
} catch (err) {
  // 自定义错误处理
}
```

### 2. 加载状态

```tsx
const { login, isLoading } = useAuth();

// 禁用按钮防止重复提交
<button disabled={isLoading}>
  {isLoading ? '处理中...' : '提交'}
</button>
```

### 3. 条件渲染

```tsx
const { isAuthenticated, user } = useAuth();

// 根据认证状态显示不同内容
{isAuthenticated ? (
  <UserDashboard user={user} />
) : (
  <LoginPrompt />
)}
```

### 4. 组合使用

```tsx
function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <header>
      {isAuthenticated && user && (
        <>
          <span>欢迎, {user.username}</span>
          <button onClick={handleLogout}>登出</button>
        </>
      )}
    </header>
  );
}
```

## 注意事项

1. **登出错误**: 即使登出API调用失败，本地认证状态仍会被清除，这是为了确保用户能够退出登录状态。

2. **令牌过期**: Hook本身不处理令牌过期，令牌验证由`authService`和API拦截器处理。

3. **初始化**: 应用启动时需要调用`authStore.initializeAuth()`来恢复认证状态。

4. **用户信息**: 初始化时只恢复token和isAuthenticated，user信息需要通过API获取。

## 相关文件

- `src/store/authStore.ts` - Zustand认证状态管理
- `src/services/auth.service.ts` - 认证服务API
- `src/types/auth.types.ts` - 认证相关类型定义
- `src/utils/storage.ts` - 本地存储工具函数

## 示例代码

完整的使用示例请参考 `src/hooks/useAuth.example.tsx`
