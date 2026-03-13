import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumb } from './Breadcrumb';
import { menuConfig } from '@/constants/menuConfig';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * MainLayout Component
 * 
 * Provides the main application layout structure with:
 * - Header: Top navigation bar with logo and user info
 * - Sidebar: Side navigation menu (collapsible)
 * - Content: Main content area for page rendering
 * - Footer: Bottom footer section
 * 
 * Responsive behavior:
 * - Desktop (≥1200px): Fixed sidebar, full layout
 * - Tablet (768-1199px): Collapsible sidebar
 * - Mobile (<768px): Drawer-style sidebar with overlay
 * 
 * Automatically switches to mobile menu when viewport < 768px
 * 
 * Requirements: 2.1, 2.3, 2.4, 9.2, 9.3
 */

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Monitor viewport width for responsive behavior
  // Requirement 2.4: WHERE 屏幕宽度小于768像素, THE Navigation_Menu SHALL 切换为可折叠的移动端菜单
  const isMobile = useIsMobile();

  // Auto-close mobile sidebar when switching to desktop view
  useEffect(() => {
    if (!isMobile && mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  }, [isMobile, mobileSidebarOpen]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header 
        onMenuToggle={toggleSidebar}
        onMobileMenuToggle={toggleMobileSidebar}
      />

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        menuItems={menuConfig}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={toggleMobileSidebar}
      />

      {/* Main content area */}
      <main
        className={`
          flex-1 pt-16 transition-all duration-300
          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <div className="p-6">
          {/* Breadcrumb navigation */}
          <Breadcrumb />
          
          {/* Content area - renders child routes */}
          {children || <Outlet />}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`
          bg-white border-t border-gray-200 py-4 px-6
          transition-all duration-300
          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <div className="text-center text-sm text-gray-600">
          © 2024 Admin System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
