# 全局通知系统

全局通知系统基于 Ant Design 的 `message` 组件实现，提供统一的用户反馈机制。

## 功能特性

- ✅ 支持四种通知类型：success、error、warning、info
- ✅ 默认3秒自动消失（符合需求 10.1）
- ✅ 可自定义持续时间
- ✅ 提供快捷方法简化调用
- ✅ 最多同时显示3条消息
- ✅ 自动堆叠显示多条消息

## API 文档

### showNotification(options)

显示全局通知的主要方法。

**参数：**

```typescript
interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // 持续时间（秒），默认3秒
}
```

**示例：**

```typescript
import { showNotification } from '@utils/notification';

// 显示成功消息
showNotification({
  type: 'success',
  message: '操作成功'
});

// 显示错误消息
showNotification({
  type: 'error',
  message: '操作失败，请重试'
});

// 自定义持续时间
showNotification({
  type: 'warning',
  message: '请注意',
  duration: 5
});
```

### 快捷方法

为了简化常见场景的使用，提供了四个快捷方法：

#### showSuccess(message, duration?)

显示成功通知。

```typescript
import { showSuccess } from '@utils/notification';

showSuccess('用户创建成功');
showSuccess('保存成功', 5); // 显示5秒
```

#### showError(message, duration?)

显示错误通知。

```typescript
import { showError } from '@utils/notification';

showError('网络连接失败');
showError('删除失败：该用户正在使用中', 5);
```

#### showWarning(message, duration?)

显示警告通知。

```typescript
import { showWarning } from '@utils/notification';

showWarning('密码强度较弱');
```

#### showInfo(message, duration?)

显示信息通知。

```typescript
import { showInfo } from '@utils/notification';

showInfo('系统将在5分钟后维护');
```

## 使用场景

### 1. API 操作反馈

```typescript
import { showSuccess, showError } from '@utils/notification';

const handleCreateUser = async (userData: CreateUserData) => {
  try {
    await userService.createUser(userData);
    showSuccess('用户创建成功');
  } catch (error) {
    showError('创建失败：' + error.message);
  }
};
```

### 2. 表单提交反馈

```typescript
import { showSuccess, showError } from '@utils/notification';

const handleSubmit = async (values: FormValues) => {
  try {
    await submitForm(values);
    showSuccess('表单提交成功');
    navigate('/success');
  } catch (error) {
    showError('提交失败，请检查输入');
  }
};
```

### 3. 网络错误提示

```typescript
import { showError } from '@utils/notification';

// 在 API 客户端拦截器中使用
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      showError('网络连接失败，请检查您的网络设置');
    }
    return Promise.reject(error);
  }
);
```

### 4. 删除确认后的反馈

```typescript
import { showSuccess, showError } from '@utils/notification';

const handleDelete = async (userId: string) => {
  try {
    await userService.deleteUser(userId);
    showSuccess('用户删除成功');
    refetch(); // 刷新列表
  } catch (error) {
    showError('删除失败：该用户正在使用中');
  }
};
```

## 配置说明

通知系统的全局配置：

```typescript
message.config({
  top: 80,        // 距离顶部80px
  duration: 3,    // 默认持续3秒
  maxCount: 3,    // 最多同时显示3条
});
```

## 需求验证

- ✅ **需求 10.1**: 操作成功完成时显示成功提示消息持续3秒
- ✅ **需求 10.2**: 操作失败时显示错误提示消息并说明失败原因

## 注意事项

1. **消息内容**：应该简洁明了，清楚说明操作结果
2. **错误消息**：应该包含失败原因，帮助用户理解问题
3. **持续时间**：默认3秒适合大多数场景，重要消息可以延长
4. **消息数量**：最多同时显示3条，避免界面混乱
5. **位置**：消息显示在页面顶部，不会遮挡主要内容

## 与 API 客户端集成

通知系统应该与 API 客户端集成，自动处理常见的错误场景：

```typescript
// 在 apiClient.ts 中
import { showError, showWarning } from '@utils/notification';

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (!response) {
      showError('网络连接失败，请检查您的网络设置');
      return Promise.reject(error);
    }
    
    switch (response.status) {
      case 401:
        showWarning('会话已过期，请重新登录');
        break;
      case 403:
        showError('您没有权限执行此操作');
        break;
      case 500:
        showError('服务器暂时不可用，请稍后重试');
        break;
      default:
        showError(response.data?.message || '操作失败');
    }
    
    return Promise.reject(error);
  }
);
```

## 类型定义

```typescript
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationOptions {
  type: NotificationType;
  message: string;
  duration?: number;
}
```
