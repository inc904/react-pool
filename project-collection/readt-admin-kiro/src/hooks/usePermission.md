# usePermission Hook

## 概述

`usePermission` 是一个自定义 React Hook，用于在组件中进行权限检查。它基于当前用户的角色，提供了一组方法来判断用户是否拥有特定的权限。

## 验证需求

- **需求 7.1**: THE Permission_System SHALL 根据用户角色显示或隐藏菜单项
- **需求 7.2**: WHEN 用户尝试访问无权限的页面, THE Permission_System SHALL 重定向到403错误页面

## API

### 返回值

```typescript
interface UsePermissionReturn {
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  userRole: UserRole | null;
}
```

#### `hasPermission(permission: string): boolean`

检查当前用户是否拥有指定的权限。

**参数:**
- `permission`: 权限字符串（如 `'user:create'`）

**返回值:**
- `true`: 用户拥有该权限
- `false`: 用户不拥有该权限或未登录

**示例:**
```tsx
const { hasPermission } = usePermission();

if (hasPermission(PERMISSIONS.USER_CREATE)) {
  // 显示"添加用户"按钮
}
```

#### `hasAnyPermission(permissions: string[]): boolean`

检查当前用户是否拥有任意一个指定的权限。

**参数:**
- `permissions`: 权限字符串数组

**返回值:**
- `true`: 用户至少拥有一个权限
- `false`: 用户不拥有任何权限或未登录

**示例:**
```tsx
const { hasAnyPermission } = usePermission();

const canManageUsers = hasAnyPermission([
  PERMISSIONS.USER_CREATE,
  PERMISSIONS.USER_UPDATE,
  PERMISSIONS.USER_DELETE,
]);
```

#### `hasAllPermissions(permissions: string[]): boolean`

检查当前用户是否拥有所有指定的权限。

**参数:**
- `permissions`: 权限字符串数组

**返回值:**
- `true`: 用户拥有所有权限
- `false`: 用户缺少至少一个权限或未登录

**示例:**
```tsx
const { hasAllPermissions } = usePermission();

const hasFullAccess = hasAllPermissions([
  PERMISSIONS.USER_CREATE,
  PERMISSIONS.USER_READ,
  PERMISSIONS.USER_UPDATE,
  PERMISSIONS.USER_DELETE,
]);
```

#### `userRole: UserRole | null`

当前用户的角色。

**可能的值:**
- `'admin'`: 管理员
- `'user'`: 普通用户
- `'viewer'`: 访客
- `null`: 未登录

**示例:**
```tsx
const { userRole } = usePermission();

if (userRole === 'admin') {
  // 显示管理员专属功能
}
```

## 使用场景

### 1. 条件渲染按钮

根据用户权限显示或隐藏操作按钮：

```tsx
function UserManagementPage() {
  const { hasPermission } = usePermission();

  return (
    <div>
      {hasPermission(PERMISSIONS.USER_CREATE) && (
        <button>添加用户</button>
      )}
    </div>
  );
}
```

### 2. 过滤菜单项

根据用户权限过滤导航菜单：

```tsx
function NavigationMenu() {
  const { hasPermission } = usePermission();

  const menuItems = [
    { key: 'dashboard', label: '仪表盘', permission: PERMISSIONS.DASHBOARD_VIEW },
    { key: 'users', label: '用户管理', permission: PERMISSIONS.USER_READ },
    { key: 'settings', label: '系统设置', permission: PERMISSIONS.SYSTEM_SETTINGS },
  ];

  const visibleMenuItems = menuItems.filter(item => 
    hasPermission(item.permission)
  );

  return (
    <nav>
      {visibleMenuItems.map(item => (
        <a key={item.key} href={`/${item.key}`}>{item.label}</a>
      ))}
    </nav>
  );
}
```

### 3. 路由保护

在组件中检查权限，无权限时显示403页面：

```tsx
function ProtectedPage() {
  const { hasAllPermissions } = usePermission();

  if (!hasAllPermissions([PERMISSIONS.USER_READ, PERMISSIONS.USER_UPDATE])) {
    return <Navigate to="/403" />;
  }

  return <div>受保护的内容</div>;
}
```

### 4. 禁用操作按钮

根据权限禁用或启用按钮：

```tsx
function UserActions() {
  const { hasPermission } = usePermission();

  return (
    <div>
      <button disabled={!hasPermission(PERMISSIONS.USER_UPDATE)}>
        编辑
      </button>
      <button disabled={!hasPermission(PERMISSIONS.USER_DELETE)}>
        删除
      </button>
    </div>
  );
}
```

### 5. 根据角色显示不同内容

根据用户角色显示不同的界面：

```tsx
function Dashboard() {
  const { userRole } = usePermission();

  if (userRole === 'admin') {
    return <AdminDashboard />;
  } else if (userRole === 'user') {
    return <UserDashboard />;
  } else {
    return <ViewerDashboard />;
  }
}
```

## 权限常量

系统中定义的权限常量（来自 `@/constants/permissions`）：

```typescript
export const PERMISSIONS = {
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  DASHBOARD_VIEW: 'dashboard:view',
  SYSTEM_SETTINGS: 'system:settings',
} as const;
```

## 角色权限映射

不同角色拥有的权限：

### 管理员 (admin)
- ✅ user:create
- ✅ user:read
- ✅ user:update
- ✅ user:delete
- ✅ dashboard:view
- ✅ system:settings

### 普通用户 (user)
- ❌ user:create
- ✅ user:read
- ❌ user:update
- ❌ user:delete
- ✅ dashboard:view
- ❌ system:settings

### 访客 (viewer)
- ❌ user:create
- ❌ user:read
- ❌ user:update
- ❌ user:delete
- ✅ dashboard:view
- ❌ system:settings

## 实现细节

### 性能优化

Hook 使用 `useMemo` 来缓存用户权限列表，避免在每次渲染时重新计算：

```typescript
const userPermissions = useMemo(() => {
  if (!userRole) {
    return [];
  }
  return getRolePermissions(userRole);
}, [userRole]);
```

### 未登录用户处理

当用户未登录时（`user` 为 `null`）：
- `hasPermission` 返回 `false`
- `hasAnyPermission` 返回 `false`
- `hasAllPermissions` 返回 `false`
- `userRole` 为 `null`

### 空权限数组处理

当传入空数组时：
- `hasAnyPermission([])` 返回 `false`
- `hasAllPermissions([])` 返回 `false`

## 与其他 Hook 的配合

### 与 useAuth 配合

```tsx
function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  const { hasPermission } = usePermission();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>欢迎, {user?.username}</h1>
      {hasPermission(PERMISSIONS.USER_UPDATE) && (
        <button>编辑个人资料</button>
      )}
    </div>
  );
}
```

### 在 ProtectedRoute 中使用

```tsx
function ProtectedRoute({ 
  children, 
  requiredPermissions 
}: { 
  children: React.ReactNode;
  requiredPermissions?: string[];
}) {
  const { isAuthenticated } = useAuth();
  const { hasAllPermissions } = usePermission();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredPermissions && !hasAllPermissions(requiredPermissions)) {
    return <Navigate to="/403" />;
  }

  return <>{children}</>;
}
```

## 测试

Hook 包含完整的单元测试，覆盖以下场景：

- ✅ 管理员权限检查
- ✅ 普通用户权限检查
- ✅ 访客权限检查
- ✅ 未登录用户权限检查
- ✅ 单个权限检查
- ✅ 任意权限检查
- ✅ 所有权限检查
- ✅ 空权限数组处理
- ✅ 用户角色获取

测试文件: `src/hooks/usePermission.test.ts`

## 相关文件

- **实现**: `src/hooks/usePermission.ts`
- **测试**: `src/hooks/usePermission.test.ts`
- **示例**: `src/hooks/usePermission.example.tsx`
- **权限常量**: `src/constants/permissions.ts`
- **类型定义**: `src/types/auth.types.ts`
- **认证 Store**: `src/store/authStore.ts`

## 注意事项

1. **权限检查不是安全措施**: 前端权限检查只是用户体验优化，真正的安全验证必须在后端进行。

2. **权限字符串格式**: 权限字符串应该使用 `PERMISSIONS` 常量，而不是硬编码字符串，以避免拼写错误。

3. **性能考虑**: Hook 已经进行了性能优化，但在大型列表渲染时，仍应注意避免在循环中重复调用。

4. **角色变更**: 当用户角色变更时，权限会自动更新（因为 Hook 依赖于 `authStore` 中的用户信息）。

## 更新日志

### v1.0.0 (2024-01-XX)
- ✨ 初始实现
- ✅ 实现 hasPermission、hasAnyPermission、hasAllPermissions 方法
- ✅ 实现 userRole 获取
- ✅ 添加完整的单元测试
- ✅ 添加使用示例和文档
