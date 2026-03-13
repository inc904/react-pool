/**
 * LoginForm 使用示例
 * LoginForm Usage Examples
 * 
 * 此文件展示如何使用 LoginForm 组件
 * This file demonstrates how to use the LoginForm component
 */

import { LoginForm } from './LoginForm';

/**
 * 示例1: 基本使用
 * 
 * 最简单的使用方式，不带任何回调
 */
export function BasicLoginFormExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">用户登录</h1>
        <LoginForm />
      </div>
    </div>
  );
}

/**
 * 示例2: 带成功回调
 * 
 * 登录成功后跳转到仪表盘
 */
export function LoginFormWithSuccessCallbackExample() {
  const handleSuccess = () => {
    console.log('登录成功！');
    // 在实际应用中，这里应该使用 react-router 进行导航
    // navigate('/dashboard');
    alert('登录成功！即将跳转到仪表盘...');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">用户登录</h1>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

/**
 * 示例3: 带错误处理
 * 
 * 登录失败时记录错误日志
 */
export function LoginFormWithErrorHandlingExample() {
  const handleError = (error: Error) => {
    console.error('登录失败:', error);
    // 在实际应用中，可以将错误发送到监控系统
    // logErrorToMonitoring(error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">用户登录</h1>
        <LoginForm onError={handleError} />
      </div>
    </div>
  );
}

/**
 * 示例4: 完整的登录页面
 * 
 * 包含标题、描述、表单和底部链接
 */
export function CompleteLoginPageExample() {
  const handleSuccess = () => {
    console.log('登录成功！');
    // navigate('/dashboard');
  };

  const handleError = (error: Error) => {
    console.error('登录失败:', error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            React 后台管理系统
          </h1>
          <p className="text-gray-600">
            请登录以访问管理功能
          </p>
        </div>

        {/* 登录表单 */}
        <LoginForm 
          onSuccess={handleSuccess}
          onError={handleError}
        />

        {/* 底部链接 */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            测试账号: admin / password123
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * 示例5: 使用 React Router 的登录页面
 * 
 * 展示如何在实际应用中集成 LoginForm
 */
export function LoginPageWithRouterExample() {
  // 在实际应用中，使用 react-router-dom 的 useNavigate
  // const navigate = useNavigate();
  
  const handleSuccess = () => {
    console.log('登录成功，准备跳转...');
    // navigate('/dashboard', { replace: true });
  };

  const handleError = (error: Error) => {
    console.error('登录错误:', error.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">欢迎回来</h2>
            <p className="mt-2 text-sm text-gray-600">
              登录您的账户以继续
            </p>
          </div>

          <LoginForm 
            onSuccess={handleSuccess}
            onError={handleError}
          />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  需要帮助？
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a 
                href="#" 
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                忘记密码？
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 测试凭据说明
 * 
 * 在开发环境中，可以使用以下测试凭据：
 * 
 * 有效凭据（应该成功）:
 * - 用户名: admin
 * - 密码: password123
 * 
 * 无效凭据（应该失败）:
 * - 用户名: invalid
 * - 密码: wrong
 * 
 * 边缘情况:
 * - 空用户名（应该显示验证错误）
 * - 空密码（应该显示验证错误）
 * - 用户名少于3个字符（应该显示验证错误）
 * - 密码少于6个字符（应该显示验证错误）
 */

export default {
  BasicLoginFormExample,
  LoginFormWithSuccessCallbackExample,
  LoginFormWithErrorHandlingExample,
  CompleteLoginPageExample,
  LoginPageWithRouterExample,
};
