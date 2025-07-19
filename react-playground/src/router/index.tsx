import { createBrowserRouter } from "react-router";

import Home from "@modules/Home";
import Login from "@modules/Login";
import Layout from "@modules/common/systemLayout";
import User from "@modules/System/User";
import Role from "@modules/System/Role";
import Menu from "@modules/System/Menu";
import Cache from "@modules/Monitor/cache";
import Timing from "@modules/Monitor/timing";
import OperationLog from "@modules/System/LogList/operation-log";
import LoginLog from "@modules/System/LogList/login-logs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },

  {
    path: "/system",
    element: <Layout />,
    children: [
      {
        path: "user",
        element: <User />,
      },
      {
        path: "role",
        element: <Role />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "logs",
        children: [
          {
            path: "operation",
            element: <OperationLog />,
          },
          {
            path: "login",
            element: <LoginLog />,
          },
        ],
      },
    ],
  },

  {
    path: "/monitor",
    element: <Layout />,
    children: [
      {
        path: "cache",
        element: <Cache />,
      },
      {
        path: "timing",
        element: <Timing />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },


]);

export default router;