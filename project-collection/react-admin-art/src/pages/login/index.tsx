/**
 * Login 页面
 * Login Page
 *
 * 用户登录页面，提供登录表单和认证功能
 * User login page with authentication form
 *
 * 验证需求: 1.1
 */

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "./modules/login-form";
import { useAuth } from "@/hooks/useAuth";

/**
 * Login 页面组件
 *
 * 功能:
 * - 显示登录表单
 * - 处理登录成功后的路由跳转
 * - 已登录用户自动跳转到仪表盘
 *
 * 验证需求:
 * - 1.1: WHEN 用户提交有效的用户名和密码, THE Auth_Module SHALL 验证凭据并生成访问令牌
 *
 * @example
 * ```tsx
 * // 在路由配置中使用
 * <Route path="/login" element={<Login />} />
 * ```
 */
export function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 如果用户已登录，自动跳转到仪表盘
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  /**
   * 处理登录成功
   * 跳转到仪表盘页面
   */
  const handleLoginSuccess = () => {
    navigate("/dashboard", { replace: true });
  };

  /**
   * 处理登录失败
   * 错误已在 LoginForm 组件中显示
   */
  const handleLoginError = (error: Error) => {
    console.error("Login error:", error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* 登录卡片 */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
            {/* <p className="text-gray-600">登录到后台管理系统</p> */}
            <p className="text-red-600">登录到后台管理系统</p>
          </div>

          {/* 登录表单 */}
          <LoginForm
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>

        {/* 页脚信息 */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>React 后台管理系统 v1.0</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
