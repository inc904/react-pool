import { Button, Space } from 'antd';
import {
  showNotification,
  showSuccess,
  showError,
  showWarning,
  showInfo,
} from './notification';

/**
 * 通知系统使用示例
 */
export const NotificationDemo = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h2>全局通知系统示例</h2>
      
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <h3>基础用法</h3>
          <Space>
            <Button
              type="primary"
              onClick={() =>
                showNotification({
                  type: 'success',
                  message: '操作成功完成',
                })
              }
            >
              成功通知
            </Button>

            <Button
              danger
              onClick={() =>
                showNotification({
                  type: 'error',
                  message: '操作失败，请重试',
                })
              }
            >
              错误通知
            </Button>

            <Button
              onClick={() =>
                showNotification({
                  type: 'warning',
                  message: '请注意检查输入',
                })
              }
            >
              警告通知
            </Button>

            <Button
              onClick={() =>
                showNotification({
                  type: 'info',
                  message: '这是一条信息提示',
                })
              }
            >
              信息通知
            </Button>
          </Space>
        </div>

        <div>
          <h3>快捷方法</h3>
          <Space>
            <Button type="primary" onClick={() => showSuccess('用户创建成功')}>
              快捷成功
            </Button>

            <Button danger onClick={() => showError('网络连接失败')}>
              快捷错误
            </Button>

            <Button onClick={() => showWarning('密码强度较弱')}>
              快捷警告
            </Button>

            <Button onClick={() => showInfo('系统将在5分钟后维护')}>
              快捷信息
            </Button>
          </Space>
        </div>

        <div>
          <h3>自定义持续时间</h3>
          <Space>
            <Button
              onClick={() =>
                showNotification({
                  type: 'success',
                  message: '此消息将显示5秒',
                  duration: 5,
                })
              }
            >
              5秒消息
            </Button>

            <Button onClick={() => showSuccess('此消息将显示10秒', 10)}>
              10秒消息
            </Button>
          </Space>
        </div>

        <div>
          <h3>实际场景示例</h3>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                // 模拟API调用
                setTimeout(() => {
                  showSuccess('用户信息更新成功');
                }, 500);
              }}
            >
              更新用户
            </Button>

            <Button
              danger
              onClick={() => {
                // 模拟API错误
                setTimeout(() => {
                  showError('删除失败：该用户正在使用中');
                }, 500);
              }}
            >
              删除用户
            </Button>

            <Button
              onClick={() => {
                // 模拟网络错误
                setTimeout(() => {
                  showError('网络连接失败，请检查您的网络设置');
                }, 500);
              }}
            >
              网络错误
            </Button>
          </Space>
        </div>
      </Space>
    </div>
  );
};

export default NotificationDemo;
