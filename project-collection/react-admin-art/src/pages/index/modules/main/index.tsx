import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Breadcrumb, Layout } from 'antd'
import { layoutRoutes } from '@/router/routes'
import type { AppRouteConfig } from '@/router/types'

const { Content, Footer } = Layout

/** 递归构建 path -> title 映射 */
function buildPathTitleMap(
  routes: AppRouteConfig[],
  parentPath = '',
  map: Record<string, string> = {}
): Record<string, string> {
  for (const route of routes) {
    if (!route.path || !route.meta?.title) continue
    const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/')
    map[fullPath] = route.meta.title
    if (route.children) {
      buildPathTitleMap(route.children, fullPath, map)
    }
  }
  return map
}

const pathTitleMap = buildPathTitleMap(layoutRoutes)

// 默认路径 '/' 映射到 dashboard/analysis
const DEFAULT_PATH = '/dashboard/analysis'

export default function Main({
  colorBgContainer,
  borderRadiusLG,
}: {
  colorBgContainer: string
  borderRadiusLG: number
}) {
  const location = useLocation()

  const breadcrumbItems = useMemo(() => {
    const pathname =
      location.pathname === '/' ? DEFAULT_PATH : location.pathname
    const segments = pathname.split('/').filter(Boolean)

    return segments.map((_, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/')
      return { title: pathTitleMap[path] || segments[index] }
    })
  }, [location.pathname])

  return (
    <>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </>
  )
}
