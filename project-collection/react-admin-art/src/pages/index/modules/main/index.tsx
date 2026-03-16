import { Outlet } from "react-router";

import { Breadcrumb, Layout } from "antd";

const { Content, Footer } = Layout;
export default function Main({
  colorBgContainer,
  borderRadiusLG,
}: {
  colorBgContainer: string;
  borderRadiusLG: number;
}) {
  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "User" }, { title: "Bill" }]}
        />
        123123
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
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </>
  );
}
