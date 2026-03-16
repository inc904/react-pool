import type { ReactNode } from 'react'
import type { UserRole } from '@/types/auth.types'

export interface RouteMeta {
  /** 菜单标题 */
  title: string
  /** 菜单图标 */
  icon?: ReactNode
  /** 是否在菜单中隐藏 */
  hidden?: boolean
  /** 允许访问的角色列表，不设置则所有角色可访问 */
  permissions?: UserRole[]
}

export interface AppRouteConfig {
  path?: string
  index?: boolean
  Component?: React.ComponentType
  element?: ReactNode
  children?: AppRouteConfig[]
  meta?: RouteMeta
}
