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
      { path: 'ecommerce', Component: Ecommerce, meta: { title: 'Ecommerce' } },
    ],
  },
  {
    path: 'examples',
    meta: { title: 'Example', icon: <TeamOutlined /> },
    children: [
      { index: true, Component: Forms, meta: { hidden: true, title: '' } },
      { path: 'forms', Component: Forms, meta: { title: 'Forms' } },
      { path: 'table', Component: Table, meta: { title: 'Table' } },
    ],
  },
  {
    path: 'changelog',
    Component: lazy(() => import('@/pages/changelog/index')),
    meta: { title: '更新日志', icon: <FileOutlined /> },
  },
  {
    path: '*',
    Component: lazy(() => import('@/pages/Error/404')),
    meta: { hidden: true, title: '404' },
  },
]
