import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme } from "antd";

const { Sider } = Layout;

export default function LaySider({ collapsed }) {
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "nav 1",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "nav 2",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "nav 3",
    },
  ];
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Sider>
  );
}
