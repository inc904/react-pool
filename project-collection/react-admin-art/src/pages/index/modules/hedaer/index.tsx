import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import headerStyles from "./header.module.scss";

const { Header } = Layout;

export default function ArtHeader({
  colorBgContainer,
  collapsed,
  setCollapsed,
}: {
  colorBgContainer: string;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) {
  return (
    <>
      <Header />
      <Header
        className={headerStyles.header}
        style={{ padding: 0, background: colorBgContainer }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Header>
    </>
  );
}
