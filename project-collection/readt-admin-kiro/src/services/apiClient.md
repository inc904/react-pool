# API 客户端 (API Client)

统一的 HTTP 请求客户端，提供认证、错误处理和超时配置。

## 功能特性

### 1. 自动认证 (验证需求: 8.1)
- 自动在所有请求头中添加 `Authorization: Bearer {token}`
- 从本地存储读取令牌
- 支持跳过认证（用于登录等公开接口）

### 2. 401 错误处理 (验证需求: 8.2)
- 自动清除过期令牌
- 重定向到登录页面
- 集成 authStore 状态管理

### 3. 500 错误处理 (验证需求: 8.3)
- 显示服务器错误提示
- 统一的错误消息格式

### 4. 超时配置 (验证需求: 8.4)
- 默认 30 秒超时
- 超时后自动取消请求
- 返回友好的超时错误消息

### 5. 其他错误处理
- 403: 权限不足
- 404: 资源不存在
- 网络错误: 连接失败
- 统一的错误对象格式

## 使用方法

### 基本用法

```typescript
import { apiClient } from '@services/apiClient';

// GET 请求
const users = await apiClient.get<User[]>('/users');

// POST 请求
const newUser = await apiClient.post<User>('/users', {
  username: 'john',
  email: 'john@example.com',
});

// PUT 请求
const updatedUser = await apiClient.put<User>(`/users/${id}`, {
  username: 'john_updated',
});

// DELETE 请求
await apiClient.delete(`/users/${id}`);

// PATCH 请求
const patchedUser = await apiClient.patch<User>(`/users/${id}`, {
  status: 'active',
});
```

### 带查询参数

```typescript
const users = await apiClient.get<User[]>('/users', {
  params: {
    page: 1,
    pageSize: 10,
    role: 'admin',
  },
});
```

### 跳过认证（公开接口）

```typescript
const data = await apiClient.post('/auth/login', credentials, {
  skipAuth: true,
});
```

### 错误处理

```typescript
try {
  const data = await apiClient.get('/some-endpoint');
} catch (error: any) {
  // 错误对象包含以下字段：
  // - code: 错误代码
  // - message: 用户友好的错误消息
  // - status: HTTP 状态码（如果有）
  // - originalError: 原始的 Axios 错误对象
  
  switch (error.code) {
    case 'UNAUTHORIZED':
      // 用户需要重新登录（自动处理）
      break;
    case 'FORBIDDEN':
      // 权限不足
      break;
    case 'SERVER_ERROR':
      // 服务器错误
      break;
    case 'TIMEOUT':
      // 请求超时
      break;
    case 'NETWORK_ERROR':
      // 网络连接失败
      break;
    default:
      // 其他错误
  }
}
```

## 错误代码

| 错误代码 | 说明 | HTTP 状态码 |
|---------|------|------------|
| `UNAUTHORIZED` | 令牌无效或过期 | 401 |
| `FORBIDDEN` | 权限不足 | 403 |
| `NOT_FOUND` | 资源不存在 | 404 |
| `SERVER_ERROR` | 服务器错误 | 500, 502, 503, 504 |
| `TIMEOUT` | 请求超时 | - |
| `NETWORK_ERROR` | 网络连接失败 | - |
| `API_ERROR` | 其他 API 错误 | 其他 |

## 配置

### 环境变量

在 `.env` 文件中配置 API 基础 URL：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

如果未配置，默认使用 `http://localhost:3000/api`。

### 超时时间

默认超时时间为 30 秒，符合需求 8.4。

## 拦截器

### 请求拦截器
- 自动添加 Authorization 头
- 支持跳过认证的配置

### 响应拦截器
- 处理各种 HTTP 错误状态码
- 统一错误格式
- 自动处理 401 错误（清除认证状态并重定向）

## 类型定义

### RequestConfig

```typescript
interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean; // 是否跳过认证
}
```

### ApiResponse

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}
```

### ApiError

```typescript
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}
```

## 集成说明

### 与 authStore 集成

API 客户端与 authStore 紧密集成：

1. **请求拦截器**: 从本地存储读取令牌并添加到请求头
2. **401 错误处理**: 自动调用 `authStore.clearAuth()` 清除认证状态
3. **重定向**: 自动重定向到登录页面

### 与 auth.service 集成

`auth.service.ts` 已更新为使用 `apiClient`：

```typescript
import { apiClient } from '@services/apiClient';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // 登录请求跳过认证
    return await apiClient.post('/auth/login', credentials, { skipAuth: true });
  }
  
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }
}
```

## 高级用法

### 获取原始 Axios 实例

如果需要使用 Axios 的高级功能：

```typescript
const axiosInstance = apiClient.getAxiosInstance();

// 使用原始 Axios 实例
axiosInstance.interceptors.request.use(...);
```

## 注意事项

1. **循环依赖**: API 客户端使用动态导入来避免与 authStore 的循环依赖
2. **错误处理**: 所有错误都会被转换为统一的错误对象格式
3. **令牌刷新**: 当前版本不支持自动令牌刷新，需要手动实现
4. **重试机制**: 当前版本不支持自动重试，可以根据需要添加

## 示例

查看 `apiClient.demo.ts` 文件获取更多使用示例。
