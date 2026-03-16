import React, { useState, useCallback } from 'react'

import { Layout, theme } from 'antd'
import ArtSiderBar from './modules/siderbar'
import ArtHeader from './modules/hedaer'
import ArtMain from './modules/main'
import MainStyle from './index.module.css'
const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)

  const handleSetCollapsed = useCallback((value: boolean) => {
    setCollapsed(value)
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ArtSiderBar collapsed={collapsed} setCollapsed={handleSetCollapsed} />
      <Layout className={MainStyle['main-container']}>
        <ArtHeader
          colorBgContainer={colorBgContainer}
          collapsed={collapsed}
          setCollapsed={handleSetCollapsed}
        />
        <ArtMain
          colorBgContainer={colorBgContainer}
          borderRadiusLG={borderRadiusLG}
        />
      </Layout>
    </Layout>
  )
}

export default App
