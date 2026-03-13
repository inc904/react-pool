# ProtectedRoute 组件

## 概述

`ProtectedRoute` 是一个路由保护组件，用于保护需要认证的路由。它会检查用户的认证状态，并在必要时重定向到登录页面或错误页面。

## 功能特性

- ✅ 检查用户认证状态
- ✅ 未认证用户自动重定向到登录页
- ✅ 支持权限检查接口（预留，待 usePermission Hook 实现）
- ⏳ 无权限用户重定向到 403 错误页（待 usePermission Hook 实现）

## 使用方法

### 基本用法 - 仅需要认证

```tsx
import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './router';
import { Dashboard } from './pages';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
```

### 带权限检查 - 需要特定权限

```tsx
import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './router';
import { UsersPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/users',
    element: (
      <ProtectedRoute requiredPermissions={['user:read', 'user:write']}>
        <UsersPage />
      </ProtectedRoute>
    ),
  },
]);
```

### 嵌套路由保护

```tsx
import { createBrowserRouter, Outlet } from 'react-router';
import { ProtectedRoute } from './router';
import { MainLayout, Dashboard, Users, Settings } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);
```

## API 参考

### Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `children` | `React.ReactNode` | 是 | - | 需要保护的子组件 |
| `requiredPermissions` | `string[]` | 否 | `undefined` | 所需权限列表（预留接口） |

### 行为说明

1. **未认证用户**
   - 检测到用户未登录（`isAuthenticated === false`）
   - 自动重定向到 `/login` 页面
   - 使用 `replace` 模式，避免在历史记录中留下记录

2. **已认证用户**
   - 验证通过，渲染子组件
   - 如果提供了 `requiredPermissions`，将在 usePermission Hook 实现后进行权限检查

3. **无权限用户**（待实现）
   - 检测到用户没有所需权限
   - 重定向到 `/403` 错误页面

## 验证需求

- **需求 1.3**: WHEN 访问令牌过期, THE Auth_Module SHALL 要求用户重新登录
- **需求 7.2**: WHEN 用户尝试访问无权限的页面, THE Permission_System SHALL 重定向到403错误页面

## 实现细节

### 认证检查

组件使用 `useAuth` Hook 获取用户的认证状态：

```tsx
const { isAuthenticated } = useAuth();

if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}
```

### 权限检查（待实现）

权限检查功能已预留接口，待 `usePermission` Hook 实现后启用：

```tsx
// TODO: 待 usePermission Hook 实现
// const { hasAllPermissions } = usePermission();
// if (requiredPermissions && !hasAllPermissions(requiredPermissions)) {
//   return <Navigate to="/403" replace />;
// }
```

## 注意事项

1. **权限检查功能**: 目前 `requiredPermissions` 属性已定义但未实现，需要等待 Task 6.2 实现 `usePermission` Hook 后才能使用。

2. **403 错误页面**: 权限检查重定向到 `/403` 页面，该页面将在 Task 6.4 中创建。

3. **路由配置**: 使用 React Router v7 的 `createBrowserRouter` API，确保与项目配置一致。

4. **性能优化**: 组件非常轻量，不会影响路由性能。

## 相关文件

- `src/hooks/useAuth.ts` - 认证状态管理 Hook
- `src/router/index.tsx` - 路由配置
- `src/store/authStore.ts` - 认证状态存储

## 后续任务

- [ ] Task 6.2: 实现 `usePermission` Hook
- [ ] Task 6.3: 更新 ProtectedRoute 支持权限检查
- [ ] Task 6.4: 创建 403 错误页面
