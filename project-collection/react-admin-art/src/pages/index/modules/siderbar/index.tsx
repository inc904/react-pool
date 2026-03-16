import { useMemo } from 'react'
import { Layout, Menu } from 'antd'
import { useLocation } from 'react-router'
import type { MenuProps } from 'antd'

import { useRouter } from '@/hooks/use-router'
import { layoutRoutes } from '@/router/routes'
import type { AppRouteConfig } from '@/router/types'
import type { UserRole } from '@/types/auth.types'
import useAuthStore from '@/store/authStore'
import siderStyles from './sidebar.module.scss'

const { Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

/** 根据路由配置递归生成菜单项，同时按角色过滤 */
function routesToMenuItems(
  routes: AppRouteConfig[],
  userRole: UserRole | undefined,
  parentPath = ''
): MenuItem[] {
  return routes
    .filter((route) => {
      if (!route.meta || route.meta.hidden) return false
      // 如果配置了 permissions，检查当前用户角色是否在允许列表中
      if (route.meta.permissions && userRole) {
        return route.meta.permissions.includes(userRole)
      }
      return true
    })
    .map((route) => {
      const fullPath = route.path
        ? `${parentPath}/${route.path}`.replace(/\/+/g, '/')
        : parentPath

      const children = route.children
        ? routesToMenuItems(route.children, userRole, fullPath)
        : undefined

      return {
        key: fullPath,
        icon: route.meta?.icon,
        label: route.meta?.title,
        children: children?.length ? children : undefined,
      } as MenuItem
    })
}

// 路径 '/' 映射到默认页面
const DEFAULT_SELECTED_KEY = '/dashboard/analysis'

// 根据当前路径获取需要展开的父级菜单 key
function getOpenKeys(pathname: string): string[] {
  const keys: string[] = []
  const segments = pathname.split('/').filter(Boolean)
  for (let i = 1; i <= segments.length - 1; i++) {
    keys.push('/' + segments.slice(0, i).join('/'))
  }
  return keys
}

export default function SiderBar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}) {
  const location = useLocation()
  const { push } = useRouter()
  const userRole = useAuthStore((s) => s.user?.role)

  const menuItems = useMemo(
    () => routesToMenuItems(layoutRoutes, userRole),
    [userRole]
  )

  const selectedKey = useMemo(() => {
    return location.pathname === '/' ? DEFAULT_SELECTED_KEY : location.pathname
  }, [location.pathname])

  const openKeys = useMemo(() => {
    return getOpenKeys(selectedKey)
  }, [selectedKey])

  const handleMenuClick = ({ key }: { key: string }) => {
    push(key)
  }

  return (
    <>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      />
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={siderStyles.artSider}
      >
        <div className="demo-logo-vertical">
          <h2 className={siderStyles.logo}>
            {collapsed ? 'Ant' : 'Ant Design Pro'}
          </h2>
        </div>

        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={openKeys}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
    </>
  )
}
