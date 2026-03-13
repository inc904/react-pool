import { message } from 'antd';

/**
 * 通知类型
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * 通知配置选项
 */
export interface NotificationOptions {
  type: NotificationType;
  message: string;
  duration?: number; // 持续时间（秒），默认3秒
}

/**
 * 显示全局通知
 * 
 * @param options - 通知配置选项
 * 
 * @example
 * ```typescript
 * // 显示成功消息
 * showNotification({
 *   type: 'success',
 *   message: '操作成功'
 * });
 * 
 * // 显示错误消息
 * showNotification({
 *   type: 'error',
 *   message: '操作失败，请重试'
 * });
 * 
 * // 自定义持续时间
 * showNotification({
 *   type: 'warning',
 *   message: '请注意',
 *   duration: 5
 * });
 * ```
 */
export const showNotification = (options: NotificationOptions): void => {
  const { type, message: content, duration = 3 } = options;

  // 配置全局message
  message.config({
    top: 80,
    duration,
    maxCount: 3,
  });

  // 根据类型显示不同的消息
  switch (type) {
    case 'success':
      message.success(content);
      break;
    case 'error':
      message.error(content);
      break;
    case 'warning':
      message.warning(content);
      break;
    case 'info':
      message.info(content);
      break;
    default:
      message.info(content);
  }
};

/**
 * 显示成功通知的快捷方法
 */
export const showSuccess = (msg: string, duration?: number): void => {
  showNotification({ type: 'success', message: msg, duration });
};

/**
 * 显示错误通知的快捷方法
 */
export const showError = (msg: string, duration?: number): void => {
  showNotification({ type: 'error', message: msg, duration });
};

/**
 * 显示警告通知的快捷方法
 */
export const showWarning = (msg: string, duration?: number): void => {
  showNotification({ type: 'warning', message: msg, duration });
};

/**
 * 显示信息通知的快捷方法
 */
export const showInfo = (msg: string, duration?: number): void => {
  showNotification({ type: 'info', message: msg, duration });
};
