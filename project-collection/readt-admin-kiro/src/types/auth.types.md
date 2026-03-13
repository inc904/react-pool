# 认证类型定义文档
# Authentication Type Definitions Documentation

## 概述

本文件记录了任务 2.1 中实现的认证相关类型定义和存储工具函数。

## 类型定义 (src/types/auth.types.ts)

### 1. UserRole - 用户角色

```typescript
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  VIEWER: 'viewer'
} as const;
```

**用途**: 定义系统中的三种用户角色
- `ADMIN`: 管理员，拥有所有权限
- `USER`: 普通用户，拥有基本权限
- `VIEWER`: 查看者，只读权限

### 2. UserStatus - 用户状态

```typescript
export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
} as const;
```

**用途**: 定义用户账户的三种状态
- `ACTIVE`: 活跃状态，可以正常使用系统
- `INACTIVE`: 非活跃状态，暂时不使用
- `SUSPENDED`: 已暂停，被管理员禁用

### 3. User - 用户模型

```typescript
export interface User {
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
```

**用途**: 表示系统用户的完整信息
**字段说明**:
- `id`: 用户唯一标识符
- `username`: 用户名
- `email`: 电子邮箱
- `role`: 用户角色
- `status`: 用户状态
- `avatar`: 头像URL（可选）
- `createdAt`: 创建时间（ISO 8601格式）
- `updatedAt`: 更新时间（ISO 8601格式）
- `lastLoginAt`: 最后登录时间（可选）

### 4. AuthToken - 认证令牌

```typescript
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType: 'Bearer';
}
```

**用途**: 表示认证令牌信息
**字段说明**:
- `accessToken`: 访问令牌字符串
- `refreshToken`: 刷新令牌（可选）
- `expiresAt`: 过期时间戳（Unix时间戳）
- `tokenType`: 令牌类型，固定为 'Bearer'

### 5. AuthState - 认证状态

```typescript
export interface AuthState {
  token: AuthToken | null;
  user: User | null;
  isAuthenticated: boolean;
}
```

**用途**: 表示应用的认证状态
**字段说明**:
- `token`: 当前令牌信息，未登录时为 null
- `user`: 当前用户信息，未登录时为 null
- `isAuthenticated`: 是否已认证

### 6. LoginCredentials - 登录凭据

```typescript
export interface LoginCredentials {
  username: string;
  password: string;
}
```

**用途**: 表示用户登录时提交的凭据
**字段说明**:
- `username`: 用户名
- `password`: 密码

### 7. AuthResponse - 认证响应

```typescript
export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}
```

**用途**: 表示登录API的响应数据
**字段说明**:
- `token`: 访问令牌字符串
- `user`: 用户信息
- `expiresIn`: 令牌有效期（秒）

## 存储工具函数 (src/utils/storage.ts)

### 1. setToken(token: string): void

**功能**: 保存令牌到本地存储

**参数**:
- `token`: 要保存的访问令牌字符串

**异常**:
- 如果保存失败，抛出错误 "无法保存令牌到本地存储"

**示例**:
```typescript
import { setToken } from '@/utils/storage';

setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
```

### 2. getToken(): string | null

**功能**: 从本地存储读取令牌

**返回值**:
- 如果令牌存在，返回令牌字符串
- 如果令牌不存在或读取失败，返回 null

**示例**:
```typescript
import { getToken } from '@/utils/storage';

const token = getToken();
if (token) {
  console.log('已登录');
} else {
  console.log('未登录');
}
```

### 3. clearToken(): void

**功能**: 从本地存储清除令牌

**异常**:
- 如果清除失败，抛出错误 "无法清除本地存储的令牌"

**示例**:
```typescript
import { clearToken } from '@/utils/storage';

// 用户登出时清除令牌
clearToken();
```

## 验证需求

本实现验证了以下需求：

**需求 1.4**: THE Auth_Module SHALL 在本地存储中安全保存访问令牌

**验证方式**:
1. `setToken()` 函数将令牌保存到 localStorage
2. `getToken()` 函数从 localStorage 读取令牌
3. `clearToken()` 函数从 localStorage 删除令牌
4. 所有函数都包含错误处理，确保操作的安全性
5. 令牌存储往返一致性：保存后读取应该得到相同的令牌值

## 使用示例

### 完整的认证流程示例

```typescript
import { setToken, getToken, clearToken } from '@/utils/storage';
import type { LoginCredentials, AuthResponse, User } from '@/types/auth.types';

// 1. 用户登录
async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  const data: AuthResponse = await response.json();
  
  // 保存令牌
  setToken(data.token);
  
  return data.user;
}

// 2. 检查认证状态
function isAuthenticated(): boolean {
  const token = getToken();
  return token !== null;
}

// 3. 获取认证头
function getAuthHeader(): Record<string, string> {
  const token = getToken();
  if (!token) {
    throw new Error('未登录');
  }
  
  return {
    'Authorization': `Bearer ${token}`
  };
}

// 4. 用户登出
function logout(): void {
  clearToken();
  // 重定向到登录页
  window.location.href = '/login';
}
```

## 测试

已创建测试文件 `src/utils/storage.test.ts`，包含以下测试用例：

1. ✓ 应该成功保存令牌到localStorage
2. ✓ 应该覆盖已存在的令牌
3. ✓ 应该返回已保存的令牌
4. ✓ 当令牌不存在时应该返回null
5. ✓ 应该从localStorage删除令牌
6. ✓ 当令牌不存在时调用clearToken不应该抛出错误
7. ✓ 保存后读取应该得到相同的令牌值（需求 1.4）
8. ✓ 应该处理包含特殊字符的令牌
9. ✓ 应该处理长令牌字符串

## 注意事项

1. **安全性**: 令牌存储在 localStorage 中，虽然方便但存在 XSS 攻击风险。在生产环境中应考虑使用 httpOnly cookies。

2. **令牌格式**: 当前实现不验证令牌格式，调用者需要确保传入有效的令牌字符串。

3. **错误处理**: 所有函数都包含 try-catch 错误处理，确保 localStorage 操作失败时不会导致应用崩溃。

4. **浏览器兼容性**: localStorage 在所有现代浏览器中都支持，但在隐私模式或禁用存储的环境中可能不可用。

## 下一步

任务 2.1 已完成。下一个任务是：

**任务 2.2**: 实现认证服务（AuthService）
- 实现 login、logout、refreshToken、validateToken 方法
- 配置 API 端点和请求格式
- 验证需求: 1.1, 1.2, 1.3, 1.5
