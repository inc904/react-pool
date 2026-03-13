# Sidebar Component

侧边导航菜单组件，提供应用程序的主要导航功能。

## 功能特性

- ✅ 根据路由配置自动生成菜单项
- ✅ 高亮当前选中的菜单项
- ✅ 支持菜单折叠/展开功能
- ✅ 根据用户权限自动过滤菜单项
- ✅ 响应式设计，支持移动端抽屉式菜单
- ✅ 完整的无障碍支持（ARIA标签）

## 使用方法

### 基本用法

```tsx
import { Sidebar } from '@components/layout';
import { menuConfig } from '@/constants/menuConfig';

function MyLayout() {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Sidebar
      collapsed={collapsed}
      menuItems={menuConfig}
    />
  );
}
```

### 移动端支持

```tsx
function ResponsiveLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <Sidebar
      collapsed={false}
      menuItems={menuConfig}
      mobileOpen={mobileOpen}
      onMobileClose={() => setMobileOpen(false)}
    />
  );
}
```

## Props

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `collapsed` | `boolean` | 是 | - | 是否折叠侧边栏 |
| `menuItems` | `MenuItem[]` | 是 | - | 菜单项配置数组 |
| `mobileOpen` | `boolean` | 否 | `false` | 移动端是否打开 |
| `onMobileClose` | `() => void` | 否 | - | 移动端关闭回调 |

## MenuItem 类型

```typescript
interface MenuItem {
  key: string;           // 唯一标识
  label: string;         // 显示文本
  path: string;          // 路由路径
  icon: ReactNode;       // 图标（可以是emoji或React组件）
  permission?: string;   // 所需权限（可选）
}
```

## 菜单配置示例

```tsx
// src/constants/menuConfig.tsx
import { PERMISSIONS } from './permissions';

export const menuConfig: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: '📊',
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },
  {
    key: 'users',
    label: 'Users',
    path: '/users',
    icon: '👥',
    permission: PERMISSIONS.USER_READ,
  },
];
```

## 权限控制

Sidebar 组件会自动根据用户权限过滤菜单项：

- 如果菜单项没有 `permission` 字段，则始终显示
- 如果有 `permission` 字段，则通过 `usePermission` hook 检查用户是否有该权限
- 无权限的菜单项会被自动隐藏

```tsx
// 示例：只有管理员能看到用户管理菜单
{
  key: 'users',
  label: 'Users',
  path: '/users',
  icon: '👥',
  permission: PERMISSIONS.USER_READ,  // 需要 user:read 权限
}
```

## 样式定制

Sidebar 使用 Tailwind CSS 类进行样式控制：

- 展开状态：`lg:w-64`（桌面端宽度 256px）
- 折叠状态：`lg:w-20`（桌面端宽度 80px）
- 移动端：`w-64`（固定宽度 256px）

可以通过修改 Sidebar.tsx 中的 className 来自定义样式。

## 响应式行为

- **桌面端（≥1024px）**：始终显示，支持折叠/展开
- **移动端（<1024px）**：默认隐藏，通过 `mobileOpen` prop 控制显示/隐藏

## 无障碍支持

- 侧边栏有 `aria-label="侧边导航"` 标签
- 当前页面的链接有 `aria-current="page"` 属性
- 图标有 `aria-hidden="true"` 属性（装饰性元素）

## 验证需求

- **需求 2.1**: 显示包含所有功能模块的侧边导航菜单
- **需求 2.2**: 高亮当前选中菜单项并导航到对应页面
- **需求 7.1**: 根据用户角色显示或隐藏菜单项

## 相关组件

- `MainLayout` - 使用 Sidebar 的主布局组件
- `Header` - 包含菜单切换按钮的顶部导航栏
- `usePermission` - 权限检查 hook

## 测试

完整的测试套件位于 `Sidebar.test.tsx`，包括：

- 菜单项渲染
- 当前路由高亮
- 权限过滤
- 折叠功能
- 移动端行为
- 导航功能
- 无障碍支持
- 边缘情况处理
