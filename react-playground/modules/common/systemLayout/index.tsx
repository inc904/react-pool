import React, { useState, type ReactNode } from "react";

import { Layout, theme } from "antd";
import { LayoutContainer } from "./layout.style";
import LayHeader from "./lay-header";
import LaySider from "./lay-sidebar";
import { Outlet } from "react-router";

const { Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <LayoutContainer>
      <Layout style={{ width: "100%", height: "100%" }}>
        <LaySider collapsed={collapsed} />

        <Layout>
          <LayHeader
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            colorBgContainer={colorBgContainer}
          />

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </LayoutContainer>
  );
};

export default App;
