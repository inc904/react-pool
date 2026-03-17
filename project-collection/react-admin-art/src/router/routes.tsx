import { lazy } from 'react'
import { FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'

import Analysis from '@/pages/dashboard/analysis/index'
import Ecommerce from '@/pages/dashboard/ecommerce/index'
import Forms from '@/pages/examples/forms/index'
import Table from '@/pages/examples/table/index'
import type { AppRouteConfig } from './types'

/** 布局内的业务路由，用于生成菜单 */
export const layoutRoutes: AppRouteConfig[] = [
  {
    path: 'dashboard',
    meta: { title: 'Dashboard', icon: <UserOutlined /> },
    children: [
      { index: true, Component: Analysis, meta: { hidden: true, title: '' } },
      { path: 'analysis', Component: Analysis, meta: { title: 'Analysis' } },
      { path: 'ecommerce', Component: Ecommerce, meta: { title: 'Ecommerce' } }
    ]
  },
  {
    path: 'examples',
    meta: { title: 'Example', icon: <TeamOutlined /> },
    children: [
      { index: true, Component: Forms, meta: { hidden: true, title: '' } },
      { path: 'forms', Component: Forms, meta: { title: 'Forms' } },
      { path: 'table', Component: Table, meta: { title: 'Table' } }
    ]
  },
  {
    path: 'changelog',
    Component: lazy(() => import('@/pages/changelog/index')),
    meta: { title: '更新日志', icon: <FileOutlined /> }
  },
  {
    path: 'nested-menu',
    meta: { title: 'Nested Menu', icon: <FileOutlined /> },
    children: [
      {
        path: 'menu-1',
        Component: lazy(() => import('@/pages/nested-menu/menu-1/index')),
        meta: { title: 'Menu 1' }
      },
      {
        path: 'menu-2',
        meta: { title: 'Menu 2' },
        children: [
          {
            path: 'menu-2-1',
            Component: lazy(
              () => import('@/pages/nested-menu/menu-2/menu-2-1/index')
            ),
            meta: { title: 'Menu 2-1' }
          },
          {
            path: 'menu-2-2',
            Component: lazy(
              () => import('@/pages/nested-menu/menu-2/menu-2-2/index')
            ),
            meta: { title: 'Menu 2-2' }
          }
        ]
      },
      {
        path: 'menu-3',
        meta: { title: 'Menu 3' },
        children: [
          {
            path: 'menu-3-1',
            Component: lazy(
              () => import('@/pages/nested-menu/menu-3/menu-3-1/index')
            ),
            meta: { title: 'Menu 3-1' }
          },
          {
            path: 'menu-3-2',

            meta: { title: 'Menu 3-2' },
            children: [
              {
                path: 'menu-3-2-1',
                Component: lazy(
                  () =>
                    import('@/pages/nested-menu/menu-3/menu-3-2/menu-3-2-1/index')
                ),
                meta: { title: 'Menu 3-2-1' }
              },
              {
                path: 'menu-3-2-2',
                Component: lazy(
                  () =>
                    import('@/pages/nested-menu/menu-3/menu-3-2/menu-3-2-2/index')
                ),
                meta: { title: 'Menu 3-2-2' }
              }
            ]
          },
          {
            path: 'menu-3-3',
            Component: lazy(
              () => import('@/pages/nested-menu/menu-3/menu-3-3/index')
            ),
            meta: { title: 'Menu 3-3' }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    Component: lazy(() => import('@/pages/Error/404')),
    meta: { hidden: true, title: '404' }
  }
]
