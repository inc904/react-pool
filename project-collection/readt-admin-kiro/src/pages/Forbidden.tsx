/**
 * Forbidden 页面 (403)
 * Forbidden Page (403)
 * 
 * 显示无权限访问提示
 * Display access denied message
 * 
 * 验证需求: 7.2
 */

import { Link } from 'react-router';

/**
 * Forbidden 页面组件
 * 
 * 当用户尝试访问无权限的页面时显示此页面
 * 
 * 功能：
 * 1. 显示"无权限访问"提示
 * 2. 提供返回首页链接
 * 
 * @returns {React.ReactElement} 403错误页面
 * 
 * 验证需求:
 * - 7.2: WHEN 用户尝试访问无权限的页面, THE Permission_System SHALL 重定向到403错误页面
 */
export function Forbidden(): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4">
        {/* 错误代码 */}
        <div className="text-6xl font-bold text-gray-300 mb-4">403</div>
        
        {/* 错误标题 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          无权限访问
        </h1>
        
        {/* 错误描述 */}
        <p className="text-gray-600 mb-8">
          抱歉，您没有权限访问此页面。如需访问，请联系管理员。
        </p>
        
        {/* 返回首页链接 */}
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

export default Forbidden;
