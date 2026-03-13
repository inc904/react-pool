import Home from "@/pages/home";
import { MainLayout } from "@/layouts";
import { DashboardOutlined } from "@ant-design/icons";

export default {
  path: "/home",
  name: "Home",
  meta: { title: "Home", icon: "home", affix: true, rank: 0 },
  // element: <Home />,
  element: (
    <MainLayout>
      <Home />
    </MainLayout>
  ),
};
