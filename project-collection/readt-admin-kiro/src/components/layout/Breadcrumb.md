# Breadcrumb Component

面包屑导航组件，根据当前路由自动生成导航路径。

## 功能特性

- ✅ 自动根据当前路由生成面包屑路径
- ✅ 支持点击父级面包屑进行导航
- ✅ 当前页面显示为不可点击的文本
- ✅ 始终显示Home图标作为起点
- ✅ 支持多层级路由
- ✅ 完整的可访问性支持（ARIA标签）

## 使用方法

### 基本使用

```tsx
import { Breadcrumb } from '@/components/layout';

function MyPage() {
  return (
    <div>
      <Breadcrumb />
      {/* 页面内容 */}
    </div>
  );
}
```

### 在MainLayout中使用

Breadcrumb组件已经集成在MainLayout中，会自动显示在内容区域顶部：

```tsx
<MainLayout>
  {/* Breadcrumb会自动显示 */}
  <YourPageContent />
</MainLayout>
```

## 路由示例

| 路由路径 | 面包屑显示 |
|---------|-----------|
| `/dashboard` | 🏠 |
| `/users` | 🏠 / Users |
| `/users/profile` | 🏠 / Users / Profile |
| `/settings/account` | 🏠 / Settings / Account |

## 行为说明

### 路径生成规则

1. **首页路径**：始终显示Home图标（🏠），链接到 `/dashboard`
2. **菜单项路径**：如果路径在menuConfig中定义，使用菜单项的label
3. **未知路径**：使用路径段的首字母大写形式

### 点击行为

- **父级面包屑**：可点击，导航到对应路径
- **当前页面**：不可点击，显示为深色文本

### 可访问性

- 使用 `<nav>` 标签包裹，带有 `aria-label="Breadcrumb"`
- 使用有序列表 `<ol>` 组织面包屑项
- 链接具有清晰的hover状态

## 样式定制

组件使用Tailwind CSS类，可以通过修改类名来定制样式：

```tsx
// 链接样式
className="text-blue-600 hover:text-blue-800 hover:underline"

// 当前页面样式
className="text-gray-900 font-medium"

// 分隔符样式
className="mx-2 text-gray-400"
```

## 测试覆盖

### 单元测试
- ✅ 首页显示
- ✅ 单层路由
- ✅ 多层路由
- ✅ 未知路由处理
- ✅ 链接正确性
- ✅ 点击行为
- ✅ 可访问性

### 属性测试（Property-Based Tests）
- ✅ 任意路由的层级数量正确性
- ✅ 最后一个面包屑不可点击
- ✅ 父级面包屑可点击
- ✅ 链接路径正确性
- ✅ 始终以Home开始
- ✅ 分隔符正确显示
- ✅ 可访问性属性

## 验证需求

**需求 2.5**: THE Admin_System SHALL 显示当前页面的面包屑导航路径

该组件完全满足需求2.5，提供了：
- 根据当前路由自动生成面包屑
- 支持点击导航
- 清晰的视觉层级
- 完整的可访问性支持
