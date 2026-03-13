/**
 * usePermission Hook 使用示例
 * usePermission Hook Usage Examples
 * 
 * 展示如何在实际组件中使用usePermission Hook
 */

import { usePermission } from './usePermission';
import { PERMISSIONS } from '@/constants/permissions';

/**
 * 示例 1: 根据权限显示/隐藏按钮
 * 验证需求: 7.1 - 根据用户角色显示或隐藏菜单项
 */
export function UserManagementPage() {
  const { hasPermission, hasAnyPermission } = usePermission();

  // 检查是否有创建用户权限
  const canCreateUser = hasPermission(PERMISSIONS.USER_CREATE);
  
  // 检查是否有任何用户管理权限
  const canManageUsers = hasAnyPermission([
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
  ]);

  return (
    <div>
      <h1>用户管理</h1>
      
      {/* 只有拥有创建权限的用户才能看到添加按钮 */}
      {canCreateUser && (
        <button>添加用户</button>
      )}
      
      {/* 只有拥有管理权限的用户才能看到管理面板 */}
      {canManageUsers && (
        <div>
          <h2>用户管理面板</h2>
          {/* 用户列表和操作 */}
        </div>
      )}
      
      {/* 没有管理权限的用户看到只读视图 */}
      {!canManageUsers && (
        <div>
          <p>您没有权限管理用户</p>
        </div>
      )}
    </div>
  );
}

/**
 * 示例 2: 根据权限渲染不同的菜单项
 * 验证需求: 7.1 - 根据用户角色显示或隐藏菜单项
 */
export function NavigationMenu() {
  const { hasPermission, userRole } = usePermission();

  const menuItems = [
    {
      key: 'dashboard',
      label: '仪表盘',
      permission: PERMISSIONS.DASHBOARD_VIEW,
    },
    {
      key: 'users',
      label: '用户管理',
      permission: PERMISSIONS.USER_READ,
    },
    {
      key: 'settings',
      label: '系统设置',
      permission: PERMISSIONS.SYSTEM_SETTINGS,
    },
  ];

  // 过滤出用户有权限访问的菜单项
  const visibleMenuItems = menuItems.filter(item => 
    hasPermission(item.permission)
  );

  return (
    <nav>
      <div>当前角色: {userRole}</div>
      <ul>
        {visibleMenuItems.map(item => (
          <li key={item.key}>
            <a href={`/${item.key}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * 示例 3: 在路由保护中使用权限检查
 * 验证需求: 7.2 - 无权限访问重定向到403页面
 */
export function ProtectedContent({ requiredPermissions }: { requiredPermissions: string[] }) {
  const { hasAllPermissions } = usePermission();

  // 检查用户是否拥有所有必需的权限
  const hasAccess = hasAllPermissions(requiredPermissions);

  if (!hasAccess) {
    return (
      <div>
        <h1>403 - 禁止访问</h1>
        <p>您没有权限访问此页面</p>
      </div>
    );
  }

  return (
    <div>
      <h1>受保护的内容</h1>
      <p>您有权限查看此内容</p>
    </div>
  );
}

/**
 * 示例 4: 根据权限禁用操作按钮
 */
export function UserTableRow({ user }: { user: { username: string; email: string; role: string } }) {
  const { hasPermission } = usePermission();

  const canEdit = hasPermission(PERMISSIONS.USER_UPDATE);
  const canDelete = hasPermission(PERMISSIONS.USER_DELETE);

  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button disabled={!canEdit}>
          编辑
        </button>
        <button disabled={!canDelete}>
          删除
        </button>
      </td>
    </tr>
  );
}

/**
 * 示例 5: 组合多个权限检查
 */
export function AdminPanel() {
  const { hasPermission, hasAnyPermission, hasAllPermissions, userRole } = usePermission();

  // 检查是否是管理员
  const isAdmin = userRole === 'admin';

  // 检查是否有任何用户管理权限
  const hasUserManagement = hasAnyPermission([
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
  ]);

  // 检查是否有完整的用户管理权限
  const hasFullUserManagement = hasAllPermissions([
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
  ]);

  return (
    <div>
      <h1>管理面板</h1>
      
      {/* 只有管理员才能看到 */}
      {isAdmin && (
        <div>
          <h2>管理员专属功能</h2>
          {hasPermission(PERMISSIONS.SYSTEM_SETTINGS) && (
            <button>系统设置</button>
          )}
        </div>
      )}
      
      {/* 有任何用户管理权限的用户可以看到 */}
      {hasUserManagement && (
        <div>
          <h2>用户管理</h2>
          {/* 部分功能 */}
        </div>
      )}
      
      {/* 只有拥有完整权限的用户才能看到 */}
      {hasFullUserManagement && (
        <div>
          <h2>完整用户管理</h2>
          {/* 所有功能 */}
        </div>
      )}
    </div>
  );
}

/**
 * 示例 6: 在表单中根据权限显示字段
 */
export function UserForm() {
  const { hasPermission } = usePermission();

  const canChangeRole = hasPermission(PERMISSIONS.USER_UPDATE);
  const canChangeStatus = hasPermission(PERMISSIONS.USER_UPDATE);

  return (
    <form>
      <div>
        <label>用户名</label>
        <input type="text" name="username" />
      </div>
      
      <div>
        <label>邮箱</label>
        <input type="email" name="email" />
      </div>
      
      {/* 只有有权限的用户才能修改角色 */}
      {canChangeRole && (
        <div>
          <label>角色</label>
          <select name="role">
            <option value="admin">管理员</option>
            <option value="user">普通用户</option>
            <option value="viewer">访客</option>
          </select>
        </div>
      )}
      
      {/* 只有有权限的用户才能修改状态 */}
      {canChangeStatus && (
        <div>
          <label>状态</label>
          <select name="status">
            <option value="active">活跃</option>
            <option value="inactive">未激活</option>
            <option value="suspended">已暂停</option>
          </select>
        </div>
      )}
      
      <button type="submit">保存</button>
    </form>
  );
}
