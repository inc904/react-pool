import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import MainLayout from "@/layouts/MainLayout";
import Login from "../pages/system/login";
import Home from "../pages/home";
import Workbench from "../pages/dashboard/workbench";
import Analysis from "../pages/dashboard/analysis";
import UserManagement from "../pages/management/user";
import BlogManagement from "../pages/management/blog";

const routes = [
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

const router = createBrowserRouter(routes);

export default router;
