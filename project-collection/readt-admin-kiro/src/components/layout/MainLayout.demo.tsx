/**
 * MainLayout Demo
 * 
 * Visual demonstration of the MainLayout component
 * This file can be used to manually verify the layout structure and responsive behavior
 * 
 * To use: Import and render this component in your app to see the layout in action
 */

import { MainLayout } from './MainLayout';

export function MainLayoutDemo() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          MainLayout Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Layout Structure
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Header: Fixed top navigation with logo and user info</li>
            <li>✓ Sidebar: Collapsible navigation menu (left side)</li>
            <li>✓ Content: Main content area (this section)</li>
            <li>✓ Footer: Bottom footer with copyright</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Responsive Behavior
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <strong>Desktop (≥1200px):</strong> Fixed sidebar, full layout
            </li>
            <li>
              <strong>Tablet (768-1199px):</strong> Collapsible sidebar
            </li>
            <li>
              <strong>Mobile (&lt;768px):</strong> Drawer-style sidebar with overlay
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Features
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Toggle sidebar collapse on desktop</li>
            <li>✓ Mobile hamburger menu with overlay</li>
            <li>✓ Smooth transitions and animations</li>
            <li>✓ Responsive padding and spacing</li>
            <li>✓ Tailwind CSS styling</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            Testing Instructions
          </h2>
          <p className="text-blue-800 mb-4">
            To test the responsive behavior:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Resize your browser window to different widths</li>
            <li>Click the menu toggle button in the header</li>
            <li>On mobile view, click the hamburger menu</li>
            <li>Verify the sidebar collapses and expands smoothly</li>
            <li>Check that the overlay appears on mobile when sidebar is open</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Card 1</h3>
            <p className="text-blue-100">Sample content card</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Card 2</h3>
            <p className="text-green-100">Sample content card</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Card 3</h3>
            <p className="text-purple-100">Sample content card</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
