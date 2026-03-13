# 路由配置说明
# Routing Configuration Guide

## 概述

本文档说明 React 后台管理系统的路由配置结构，包括公开路由和受保护路由的配置方式。

## 路由结构

### 当前路由配置

```
/                          → 重定向到 /login
├── /login                 → 公开路由（登录页面）
└── /dashboard             → 受保护路由（仪表盘）
                             └── ProtectedRoute 包装
```

### 路由类型

#### 1. 公开路由（Public Routes）

不需要用户认证即可访问的路由。

**示例**:
```tsx
{
  path: '/login',
  element: <Login />,
}
```

**特点**:
- 直接渲染组件
- 不需要 ProtectedRoute 包装
- 适用于：登录页、注册页、忘记密码页等

#### 2. 受保护路由（Protected Routes）

需要用户认证才能访问的路由，使用 `ProtectedRoute` 组件包装。

**示例**:
```tsx
{
  path: '/dashboard',
  element: (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
}
```

**特点**:
- 使用 ProtectedRoute 包装
- 自动检查用户认证状态
- 未认证用户自动重定向到 /login
- 适用于：仪表盘、用户管理、设置页等

#### 3. 默认路由（Default Route）

根路径重定向到登录页面。

**示例**:
```tsx
{
  path: '/',
  element: <Navigate to="/login" replace />,
}
```

## 使用 React Router v7

### 创建路由

使用 `createBrowserRouter` API 创建路由配置：

```tsx
import { createBrowserRouter, Navigate } from 'react-router';
import { Login, Dashboard } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  // 路由配置...
]);
```

### 在应用中使用

在 `App.tsx` 中使用 `RouterProvider`：

```tsx
import { RouterProvider } from 'react-router';
import { router } from './router';

function App() {
  return <RouterProvider router={router} />;
}
```

## 添加新路由

### 添加公开路由

```tsx
{
  path: '/register',
  element: <Register />,
}
```

### 添加受保护路由

```tsx
{
  path: '/users',
  element: (
    <ProtectedRoute>
      <UsersPage />
    </ProtectedRoute>
  ),
}
```

### 添加带权限检查的路由（待实现）

```tsx
{
  path: '/admin',
  element: (
    <ProtectedRoute requiredPermissions={['admin:access']}>
      <AdminPage />
    </ProtectedRoute>
  ),
}
```

## 认证流程

### 访问受保护路由的流程

```
1. 用户访问 /dashboard
   ↓
2. ProtectedRoute 组件渲染
   ↓
3. 检查 useAuth().isAuthenticated
   ↓
4a. 未认证 → 重定向到 /login
4b. 已认证 → 渲染 Dashboard 组件
```

### 登录成功后的流程

```
1. 用户在 /login 提交表单
   ↓
2. 调用 authService.login()
   ↓
3. 保存令牌到 localStorage
   ↓
4. 更新 authStore 状态
   ↓
5. 跳转到 /dashboard
   ↓
6. ProtectedRoute 检查通过
   ↓
7. 渲染 Dashboard 组件
```

## 路由保护机制

### ProtectedRoute 组件

**功能**:
- 检查用户认证状态
- 未认证用户重定向到登录页
- 支持权限检查（待实现）

**实现**:
```tsx
export function ProtectedRoute({ 
  children, 
  requiredPermissions: _requiredPermissions 
}: ProtectedRouteProps): React.ReactElement {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // TODO: 权限检查（待实现）
  
  return <>{children}</>;
}
```

### 认证状态管理

认证状态由 `authStore` 管理：

```typescript
interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}
```

## 最佳实践

### 1. 路由组织

- 将公开路由放在前面
- 将受保护路由放在后面
- 使用注释分组路由

### 2. 路由命名

- 使用小写字母和连字符
- 保持路径简洁明了
- 例如：`/users`, `/user-settings`, `/admin/roles`

### 3. 重定向

- 使用 `<Navigate>` 组件
- 添加 `replace` 属性避免历史记录堆积
- 例如：`<Navigate to="/login" replace />`

### 4. 懒加载（待实现）

对于大型应用，建议使用路由懒加载：

```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));

{
  path: '/dashboard',
  element: (
    <Suspense fallback={<Loading />}>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </Suspense>
  ),
}
```

## 错误处理

### 404 页面（待实现）

```tsx
{
  path: '*',
  element: <NotFound />,
}
```

### 403 页面（待实现）

```tsx
{
  path: '/403',
  element: <Forbidden />,
}
```

## 验证需求

### ✅ 需求 1.1: 用户认证
- `/login` 路由配置为公开路由
- 登录成功后跳转到 `/dashboard`

### ✅ 需求 1.3: 过期令牌被拒绝
- ProtectedRoute 检查认证状态
- 未认证用户重定向到 `/login`

### ⏳ 需求 7.2: 无权限访问重定向
- `requiredPermissions` 接口已预留
- 权限检查逻辑待实现

## 后续计划

### 待添加的路由

- [ ] `/users` - 用户管理页面
- [ ] `/settings` - 设置页面
- [ ] `/profile` - 个人资料页面
- [ ] `/403` - 无权限页面
- [ ] `/404` - 页面不存在
- [ ] `*` - 通配符路由（404）

### 待实现的功能

- [ ] 权限检查（Task 6.2, 6.3）
- [ ] 错误页面（Task 6.4, 15.1）
- [ ] 路由懒加载（Task 15.5）
- [ ] 面包屑导航（Task 7.4）

## 参考资料

- [React Router v7 文档](https://reactrouter.com/)
- [createBrowserRouter API](https://reactrouter.com/en/main/routers/create-browser-router)
- [Navigate 组件](https://reactrouter.com/en/main/components/navigate)

## 总结

当前路由配置实现了：
- ✅ 使用 React Router v7 的 createBrowserRouter
- ✅ 公开路由和受保护路由的分离
- ✅ ProtectedRoute 组件保护需要认证的路由
- ✅ 默认路由重定向
- ✅ 完整的类型定义和文档

路由系统已准备好支持后续功能开发。
