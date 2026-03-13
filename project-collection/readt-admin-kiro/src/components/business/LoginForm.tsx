/**
 * LoginForm 组件
 * LoginForm Component
 * 
 * 用户登录表单组件，处理用户认证
 * User login form component for handling authentication
 * 
 * 验证需求: 1.1, 1.2
 */

import { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '@hooks/useAuth';
import type { LoginCredentials } from '@/types/auth.types';

/**
 * LoginForm 组件属性
 */
export interface LoginFormProps {
  /** 登录成功回调 */
  onSuccess?: () => void;
  /** 登录失败回调 */
  onError?: (error: Error) => void;
}

/**
 * LoginForm 组件
 * 
 * 功能:
 * - 提供用户名和密码输入框
 * - 表单验证（必填字段）
 * - 提交登录请求
 * - 显示加载状态
 * - 显示错误消息
 * 
 * 验证需求:
 * - 1.1: WHEN 用户提交有效的用户名和密码, THE Auth_Module SHALL 验证凭据并生成访问令牌
 * - 1.2: WHEN 用户提交无效的凭据, THE Auth_Module SHALL 返回错误消息并拒绝访问
 * 
 * @example
 * ```tsx
 * <LoginForm 
 *   onSuccess={() => navigate('/dashboard')}
 *   onError={(error) => console.error(error)}
 * />
 * ```
 */
export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm();

  /**
   * 处理表单提交
   * 
   * 验证需求:
   * - 1.1: 提交有效凭据时验证并生成令牌
   * - 1.2: 提交无效凭据时返回错误消息
   */
  const handleSubmit = async (values: LoginCredentials) => {
    // 清除之前的错误消息
    setErrorMessage('');

    try {
      // 调用登录函数
      await login(values);
      
      // 登录成功，调用成功回调
      onSuccess?.();
    } catch (error) {
      // 登录失败，显示错误消息
      const errorMsg = error instanceof Error 
        ? error.message 
        : '登录失败，请检查用户名和密码';
      
      setErrorMessage(errorMsg);
      
      // 调用错误回调
      if (error instanceof Error) {
        onError?.(error);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        autoComplete="off"
        size="large"
        layout="vertical"
      >
        {/* 错误消息显示 */}
        {errorMessage && (
          <Form.Item>
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              closable
              onClose={() => setErrorMessage('')}
              className="mb-4"
            />
          </Form.Item>
        )}

        {/* 用户名输入框 */}
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="请输入用户名"
            disabled={isLoading}
          />
        </Form.Item>

        {/* 密码输入框 */}
        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="请输入密码"
            disabled={isLoading}
          />
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
            className="h-10"
          >
            {isLoading ? '登录中...' : '登录'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
