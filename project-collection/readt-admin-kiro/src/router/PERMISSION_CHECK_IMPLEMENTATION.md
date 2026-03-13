# ProtectedRoute 权限检查实现

## 概述

本文档描述了 Task 6.3 的实现：更新 ProtectedRoute 组件以支持权限检查。

## 实现的功能

### 1. 集成 usePermission Hook

ProtectedRoute 组件现在使用 `usePermission` Hook 来检查用户权限：

```typescript
const { hasAllPermissions } = usePermission();
```

### 2. 权限检查逻辑

当 `requiredPermissions` 属性被提供时，组件会：
- 检查用户是否拥有所有必需的权限
- 如果用户缺少任何权限，重定向到 `/403` 页面
- 如果用户拥有所有权限，渲染子组件

```typescript
if (requiredPermissions && requiredPermissions.length > 0) {
  if (!hasAllPermissions(requiredPermissions)) {
    return <Navigate to="/403" replace />;
  }
}
```

### 3. 403 错误页面

创建了新的 `Forbidden` 组件 (`src/pages/Forbidden.tsx`)：
- 显示 "403 无权限访问" 错误信息
- 提供返回首页的链接
- 使用 Tailwind CSS 实现响应式设计

### 4. 路由配置更新

在 `src/router/index.tsx` 中添加了 `/403` 路由：

```typescript
{
  path: '/403',
  element: <Forbidden />,
}
```

## 使用示例

### 基本用法 - 仅需要认证

```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### 带权限检查 - 需要特定权限

```tsx
<Route path="/users" element={
  <ProtectedRoute requiredPermissions={['user:read', 'user:update']}>
    <UsersPage />
  </ProtectedRoute>
} />
```

### 多个权限要求

```tsx
<Route path="/admin" element={
  <ProtectedRoute requiredPermissions={[
    'user:create',
    'user:update',
    'user:delete',
    'system:settings'
  ]}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

## 权限检查流程

1. **认证检查**（优先级最高）
   - 如果用户未认证 → 重定向到 `/login`

2. **权限检查**（仅在已认证时执行）
   - 如果未指定 `requiredPermissions` → 允许访问
   - 如果 `requiredPermissions` 为空数组 → 允许访问
   - 如果用户缺少任何必需权限 → 重定向到 `/403`
   - 如果用户拥有所有必需权限 → 允许访问

## 验证需求

本实现满足以下需求：

- **需求 1.3**: 访问令牌过期时要求用户重新登录
- **需求 7.2**: 用户尝试访问无权限的页面时重定向到 403 错误页面

## 测试

创建了完整的测试套件 (`src/router/ProtectedRoute.test.tsx`)，包括：

1. **认证检查测试**
   - 未认证用户重定向到登录页
   - 已认证用户可以访问受保护内容

2. **权限检查测试**
   - 无权限用户重定向到 403 页面
   - 有权限用户可以访问受保护内容
   - 未指定权限时只检查认证状态
   - 空权限数组不触发权限检查
   - 正确调用 hasAllPermissions 方法

3. **组合场景测试**
   - 未认证用户优先重定向到登录页而非 403 页面

## 文件变更

### 新增文件
- `src/pages/Forbidden.tsx` - 403 错误页面组件
- `src/router/ProtectedRoute.test.tsx` - ProtectedRoute 组件测试
- `src/router/PERMISSION_CHECK_IMPLEMENTATION.md` - 本文档

### 修改文件
- `src/router/ProtectedRoute.tsx` - 添加权限检查逻辑
- `src/router/index.tsx` - 添加 /403 路由
- `src/pages/index.ts` - 导出 Forbidden 组件
- `tsconfig.app.json` - 排除测试文件和示例文件

## 技术细节

### 权限检查使用 hasAllPermissions

选择使用 `hasAllPermissions` 而不是 `hasAnyPermission` 的原因：
- 确保用户拥有访问页面所需的**所有**权限
- 提供更严格的访问控制
- 符合最小权限原则

### 重定向使用 replace

使用 `<Navigate replace />` 的原因：
- 防止用户通过浏览器后退按钮返回到无权限页面
- 保持浏览器历史记录的清洁

### 认证优先于权限

认证检查在权限检查之前执行的原因：
- 未认证用户应该先登录，而不是看到 403 错误
- 提供更好的用户体验
- 符合安全最佳实践

## 后续工作

本实现为权限系统奠定了基础。后续可以：

1. 在其他需要权限控制的路由中使用 ProtectedRoute
2. 实现基于权限的 UI 元素显示/隐藏
3. 添加更细粒度的权限控制（如字段级权限）
4. 实现权限缓存以提高性能
