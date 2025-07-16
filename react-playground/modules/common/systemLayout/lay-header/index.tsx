import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Breadcrumb, Button, Avatar } from "antd";
import LogoSvg from "/vite.svg";

const { Header } = Layout;
const items = [
  {
    title: "Home",
  },
  {
    title: <a href="">Application Center</a>,
  },
  {
    title: <a href="">Application List</a>,
  },
  {
    title: "An Application",
  },
];

export default function LayHeader({
  collapsed,
  setCollapsed,
  colorBgContainer,
}) {
  return (
    <Header style={{ background: colorBgContainer }} className="header">
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
      <Breadcrumb items={items} />
      <div style={{ flex: 1 }}></div>
      <div className="user-center">
        <Avatar
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          src={LogoSvg}
        />
        <span style={{ marginLeft: "16px" }}>Admin</span>
      </div>
    </Header>
  );
}
