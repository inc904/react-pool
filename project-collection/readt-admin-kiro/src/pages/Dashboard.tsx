/**
 * Dashboard 页面
 * Dashboard Page
 * 
 * 系统主控制面板，展示关键数据和统计信息
 * Main control panel displaying key data and statistics
 * 
 * 验证需求: 3.1, 3.2, 3.3, 3.4, 3.5
 */

import { useAuth } from '@hooks/useAuth';

/**
 * Dashboard 页面组件
 * 
 * 临时占位页面，将在后续任务中实现完整功能
 */
export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          仪表盘
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            欢迎, {user?.username || '用户'}!
          </p>
          <p className="text-gray-500 mt-2">
            仪表盘功能将在后续任务中实现
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
