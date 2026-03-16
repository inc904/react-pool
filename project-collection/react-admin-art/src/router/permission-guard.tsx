import { Outlet } from 'react-router'
import useAuthStore from '@/store/authStore'
import type { UserRole } from '@/types/auth.types'
import Forbidden from '@/pages/Error/403'

interface PermissionGuardProps {
  permissions: UserRole[]
  children?: React.ReactNode
}

/**
 * 路由级权限守卫
 * 如果当前用户角色不在 permissions 列表中，展示 403 页面
 */
export default function PermissionGuard({
  permissions,
  children,
}: PermissionGuardProps) {
  const userRole = useAuthStore((s) => s.user?.role)

  if (!userRole || !permissions.includes(userRole)) {
    return <Forbidden />
  }

  return children ? <>{children}</> : <Outlet />
}
