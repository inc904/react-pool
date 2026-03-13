/**
 * 通知系统使用示例
 * 
 * 展示如何在实际业务场景中使用全局通知系统
 */

import { showSuccess, showError, showWarning, showInfo } from '@utils/notification';
import { userService } from '@services/user.service';
import { authService } from '@services/auth.service';

// ============================================
// 示例 1: 用户登录
// ============================================
export const loginExample = async (username: string, password: string) => {
  try {
    const response = await authService.login({ username, password });
    // 登录成功，显示欢迎消息
    showSuccess(`欢迎回来，${response.user.username}！`);
    return response;
  } catch (error) {
    // API客户端已经显示了错误通知，这里不需要再次显示
    // 但如果需要额外的业务逻辑处理，可以在这里添加
    throw error;
  }
};

// ============================================
// 示例 2: 创建用户
// ============================================
export const createUserExample = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const newUser = await userService.createUser(userData);
    // 验证需求 10.1: 操作成功完成时显示成功提示消息持续3秒
    showSuccess('用户创建成功');
    return newUser;
  } catch (error) {
    // 验证需求 10.2: 操作失败时显示错误提示消息并说明失败原因
    // API客户端已经处理了通用错误，这里可以添加特定的业务错误处理
    throw error;
  }
};

// ============================================
// 示例 3: 更新用户信息
// ============================================
export const updateUserExample = async (
  userId: string,
  updates: { username?: string; email?: string }
) => {
  try {
    const updatedUser = await userService.updateUser(userId, updates);
    showSuccess('用户信息更新成功');
    return updatedUser;
  } catch (error) {
    // API客户端已经显示了错误通知
    throw error;
  }
};

// ============================================
// 示例 4: 删除用户（带确认）
// ============================================
export const deleteUserExample = async (userId: string, username: string) => {
  // 显示警告提示
  showWarning(`确认删除用户 ${username}？此操作不可撤销`);
  
  // 实际删除逻辑（通常会有一个确认对话框）
  try {
    await userService.deleteUser(userId);
    showSuccess('用户删除成功');
  } catch (error) {
    // API客户端已经显示了错误通知
    throw error;
  }
};

// ============================================
// 示例 5: 表单验证错误
// ============================================
export const formValidationExample = (errors: Record<string, string>) => {
  // 显示第一个验证错误
  const firstError = Object.values(errors)[0];
  if (firstError) {
    showError(firstError);
  }
};

// ============================================
// 示例 6: 批量操作
// ============================================
export const batchOperationExample = async (userIds: string[]) => {
  showInfo(`正在处理 ${userIds.length} 个用户...`);
  
  try {
    // 模拟批量操作
    await Promise.all(userIds.map(id => userService.deleteUser(id)));
    showSuccess(`成功处理 ${userIds.length} 个用户`);
  } catch (error) {
    showError('批量操作失败，部分用户可能未处理');
    throw error;
  }
};

// ============================================
// 示例 7: 文件上传进度
// ============================================
export const fileUploadExample = async (file: File) => {
  showInfo('正在上传文件...');
  
  try {
    // 模拟文件上传
    await new Promise(resolve => setTimeout(resolve, 2000));
    showSuccess('文件上传成功');
  } catch (error) {
    showError('文件上传失败，请重试');
    throw error;
  }
};

// ============================================
// 示例 8: 数据导出
// ============================================
export const exportDataExample = async () => {
  showInfo('正在导出数据，请稍候...');
  
  try {
    // 模拟数据导出
    await new Promise(resolve => setTimeout(resolve, 3000));
    showSuccess('数据导出成功，文件已下载', 5); // 显示5秒
  } catch (error) {
    showError('数据导出失败');
    throw error;
  }
};

// ============================================
// 示例 9: 自动保存
// ============================================
export const autoSaveExample = async (data: unknown) => {
  try {
    // 模拟自动保存
    await new Promise(resolve => setTimeout(resolve, 500));
    // 自动保存成功，使用较短的提示时间
    showSuccess('已自动保存', 2);
  } catch (error) {
    // 自动保存失败，提示用户手动保存
    showWarning('自动保存失败，请手动保存');
  }
};

// ============================================
// 示例 10: 权限检查
// ============================================
export const permissionCheckExample = (hasPermission: boolean) => {
  if (!hasPermission) {
    showWarning('您没有权限执行此操作');
    return false;
  }
  return true;
};

// ============================================
// 示例 11: 网络状态变化
// ============================================
export const networkStatusExample = (isOnline: boolean) => {
  if (isOnline) {
    showSuccess('网络连接已恢复');
  } else {
    showError('网络连接已断开，请检查您的网络设置');
  }
};

// ============================================
// 示例 12: 会话即将过期提醒
// ============================================
export const sessionExpiryWarningExample = (minutesLeft: number) => {
  showWarning(`您的会话将在 ${minutesLeft} 分钟后过期，请及时保存数据`, 10);
};

// ============================================
// 在React组件中使用
// ============================================
export const ComponentExample = () => {
  const handleSubmit = async (formData: unknown) => {
    try {
      // 提交表单
      await apiClient.post('/api/submit', formData);
      showSuccess('提交成功');
    } catch (error) {
      // API客户端已经显示了错误通知
      console.error('Submit failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    // 显示确认提示
    const confirmed = window.confirm('确认删除？');
    if (!confirmed) return;

    try {
      await apiClient.delete(`/api/items/${id}`);
      showSuccess('删除成功');
    } catch (error) {
      // API客户端已经显示了错误通知
      console.error('Delete failed:', error);
    }
  };

  return null; // 实际组件实现
};
