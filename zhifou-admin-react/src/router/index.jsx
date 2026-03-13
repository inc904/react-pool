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

// 获取静态路由
const routes = [];
Object.keys(modules).forEach((key) => {
  const module = modules[key];
  // const path = key.replace(/^\.\/modules\/(.*)\/index\.(js|jsx)$/, "/$1");
  routes.push(module.default);
});
console.log("routes", routes);

const genMenu = (item) => {
  return {
    key: item.path,
    label: item.name,
    meta: item.meta,
    icon: <MenuOutlined />,
  };
};
export const contantRoutes = [...routes, ...remainingRoutes];

// 获取菜单
export const originalMenu = routes.map((item) => {
  if (item.children?.length > 0) {
    return {
      key: item.path,
      label: item.name,
      meta: item.meta,
      icon: <MenuOutlined />,
      children: item.children.map((child) => genMenu(child)),
    };
  }
  return genMenu(item);
});

// 根据菜单属性meta中的rank值排序菜单
const sortMenus = (menus) => {
  return menus.sort((a, b) => {
    console.log("sortMenus", a.meta, b.meta);
    if (a.meta?.rank === undefined || b.meta?.rank === undefined) return 0;
    return a.meta.rank - b.meta.rank;
  });
};

export const contantMenu = sortMenus(originalMenu);

console.log("contantMenu", contantMenu);

const router = createBrowserRouter(contantRoutes);

export default router;
