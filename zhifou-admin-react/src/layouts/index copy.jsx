import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { MenuOutlined } from "@ant-design/icons";

import MainLayout from "@/layouts/MainLayout";
import Login from "../pages/system/login";
import Home from "../pages/home";
import Workbench from "../pages/dashboard/workbench";
import Analysis from "../pages/dashboard/analysis";
import UserManagement from "../pages/management/user";
import BlogManagement from "../pages/management/blog";

import remainingRoutes from "./modules/remaining";

const modules = import.meta.glob(
  ["./modules/**/*.{js,jsx}", "!./modules/**/remaining.{jx,jsx}"],
  { eager: true },
);
console.log("modules", modules);

const routes = [];
Object.keys(modules).forEach((key) => {
  const module = modules[key];
  // const path = key.replace(/^\.\/modules\/(.*)\/index\.(js|jsx)$/, "/$1");
  routes.push(module.default);
});
console.log("routes", routes);

const routes1 = [
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/about",
    element: <div>About Page</div>,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard/workbench",
        element: <Workbench />,
      },
      {
        path: "/dashboard/analysis",
        element: <Analysis />,
      },
    ],
  },
  {
    path: "/user-management",
    element: <UserManagement />,
  },
  {
    path: "/blog-management",
    element: <BlogManagement />,
  },
];
console.log("routes", routes);

const genMenu = (item) => {
  return {
    key: item.path,
    label: item.name,
    icon: <MenuOutlined />,
  };
};
export const contantRoutes = [...routes, ...remainingRoutes];

export const contantMenu = routes.map((item) => {
  if (item.children?.length > 0) {
    return {
      key: item.path,
      label: item.name,
      icon: <MenuOutlined />,
      children: item.children.map((child) => genMenu(child)),
    };
  }
  return genMenu(item);
});
console.log("contantMenu", contantMenu);

const router = createBrowserRouter(contantRoutes);

export default router;
