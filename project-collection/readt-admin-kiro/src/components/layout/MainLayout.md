# MainLayout Component

## Overview

The `MainLayout` component provides the main application layout structure with a responsive design that adapts to different screen sizes. It includes a header, sidebar, main content area, and footer.

## Requirements

- **Requirement 2.1**: Display sidebar navigation menu with all function modules
- **Requirement 2.3**: Display user information and logout button in header

## Structure

```
┌─────────────────────────────────────────┐
│              Header (Fixed)              │
│  [Menu] [Logo] Admin System    [User]   │
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │      Main Content            │
│ (Nav)    │      (Outlet/Children)       │
│          │                              │
│          │                              │
├──────────┴──────────────────────────────┤
│              Footer                      │
│      © 2024 Admin System                │
└─────────────────────────────────────────┘
```

## Features

### 1. Header
- Fixed position at the top of the viewport
- Contains:
  - Menu toggle button (hamburger icon)
  - Logo and system title
  - User information placeholder
- Height: 64px (h-16)
- Background: White with bottom border

### 2. Sidebar
- Collapsible navigation menu
- Fixed position on the left side
- Responsive behavior:
  - **Desktop (≥1024px)**: Always visible, can be collapsed to 80px width
  - **Mobile (<1024px)**: Hidden by default, slides in as drawer with overlay
- Default width: 256px (w-64)
- Collapsed width: 80px (w-20)
- Smooth transitions (300ms)

### 3. Main Content
- Flexible content area that adjusts based on sidebar state
- Padding: 24px (p-6)
- Renders either:
  - `children` prop (if provided)
  - `<Outlet />` for React Router nested routes

### 4. Footer
- Fixed at the bottom
- Adjusts left padding based on sidebar state
- Contains copyright information

## Props

```typescript
interface MainLayoutProps {
  children?: React.ReactNode;
}
```

- `children` (optional): Content to render in the main area. If not provided, renders `<Outlet />` for React Router.

## Usage

### Basic Usage

```tsx
import { MainLayout } from '@components/layout';

function App() {
  return (
    <MainLayout>
      <h1>Welcome to Admin System</h1>
      <p>Your content here...</p>
    </MainLayout>
  );
}
```

### With React Router

```tsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@components/layout';
import { Dashboard, Users } from '@pages';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}
```

## Responsive Breakpoints

The component uses Tailwind CSS breakpoints:

- **Mobile**: < 768px
  - Sidebar hidden by default
  - Hamburger menu button visible
  - Drawer-style sidebar with overlay
  
- **Tablet**: 768px - 1023px
  - Sidebar hidden by default
  - Can be toggled open
  
- **Desktop**: ≥ 1024px
  - Sidebar visible by default
  - Can be collapsed to icon-only view
  - Desktop toggle button visible

## State Management

The component manages two pieces of local state:

1. `sidebarCollapsed` (boolean): Controls sidebar width on desktop
2. `mobileSidebarOpen` (boolean): Controls sidebar visibility on mobile

## Styling

All styles are implemented using Tailwind CSS utility classes:

- Layout: Flexbox (`flex`, `flex-col`)
- Positioning: Fixed positioning for header and sidebar
- Spacing: Consistent padding and margins
- Colors: Gray scale with blue accent
- Transitions: Smooth 300ms transitions for sidebar

## Accessibility

- Semantic HTML elements (`header`, `nav`, `main`, `footer`)
- ARIA labels on toggle buttons
- Keyboard accessible
- Focus management for mobile overlay

## Future Enhancements

The following features will be added in subsequent tasks:

- **Task 7.2**: Full Header component with user info and logout
- **Task 7.3**: Sidebar navigation menu with route-based items
- **Task 7.4**: Breadcrumb navigation
- **Task 7.5**: Enhanced responsive menu behavior

## Testing

See `MainLayout.test.tsx` for unit tests covering:
- Layout structure rendering
- Responsive behavior
- Toggle functionality
- Content rendering

## Demo

See `MainLayout.demo.tsx` for a visual demonstration of the component.
