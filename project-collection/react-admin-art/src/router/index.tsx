import { createBrowserRouter, type RouteObject } from 'react-router'

import ProtectRoute from './protect-route'
import PermissionGuard from './permission-guard'
import Index from '@/pages/index/index.tsx'
import Analysis from '@/pages/dashboard/analysis/index'
import Login from '@/pages/login/index.tsx'
import { layoutRoutes } from './routes'
import type { AppRouteConfig } from './types'

/** 将 AppRouteConfig 转换为 RouteObject，自动包裹权限守卫 */
function buildRoutes(routes: AppRouteConfig[]): RouteObject[] {
  return routes.map((route) => {
    const { meta, children, Component, element, ...rest } = route

    const routeObj: RouteObject = { ...rest } as RouteObject

    // 构建子路由
    if (children) {
      routeObj.children = buildRoutes(children)
    }

    // 如果有 permissions，用 PermissionGuard 包裹
    if (meta?.permissions?.length) {
      if (Component) {
        routeObj.element = (
          <PermissionGuard permissions={meta.permissions}>
            <Component />
          </PermissionGuard>
        )
      } else {
        // 父级路由（layout 路由），用 guard 作为 layout 元素
        routeObj.element = (
          <PermissionGuard permissions={meta.permissions} />
        )
      }
    } else {
      if (Component) routeObj.Component = Component
      if (element) routeObj.element = element
    }

    return routeObj
  })
}

const router = createBrowserRouter([
  { path: '/login', Component: Login },
  {
    path: '/',
    element: (
      <ProtectRoute>
        <Index />
      </ProtectRoute>
    ),
    children: [
      { index: true, Component: Analysis },
      ...buildRoutes(layoutRoutes),
    ],
  },
])

export default router
