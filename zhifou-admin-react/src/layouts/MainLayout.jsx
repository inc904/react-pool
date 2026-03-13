import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, Image } from "antd";
import { Outlet } from "react-router";
import { useRouter } from "@/hooks/use-router";
import "./mainLayout.css";

import { contantMenu } from "@/router";

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const { push } = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    push(key);
  };
  const navWidth = collapsed ? "80px" : "200px";

  const handleCollapsedBtnClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen fixed! top-o left-0 bg-white!"
      >
        <div className="demo-logo-vertical flex justify-center items-center py-2">
          <Image
            src="/Naruto_logo.svg"
            height={40}
            preview={false}
            style={{ objectFit: "cover" }}
          />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={contantMenu}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="flex flex-col h-full">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            marginLeft: navWidth,
            transition: "all .25s",
          }}
          className="sticky top-0 z-2"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              handleCollapsedBtnClick();
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: `0 0 0 ${navWidth}`,
          }}
          className="flex-1 relative"
        >
          <div style={{ margin: "20px" }}>
            <div
              style={{
                padding: 24,
                minHeight: "calc(100vh - 106px)",
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </div>
        </Content>
        {/* <Footer
          style={{ textAlign: "center", marginLeft: navWidth }}
          className="w-full fixed bottom-0 right-0"
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>*/}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
