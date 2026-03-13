/**
 * App 主组件
 * Main App Component
 * 
 * 应用程序的根组件，配置路由和全局错误边界
 * Root component of the application with router configuration and global error boundary
 */

import { RouterProvider } from 'react-router';
import { router } from './router';
import ErrorBoundary from '@/components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
