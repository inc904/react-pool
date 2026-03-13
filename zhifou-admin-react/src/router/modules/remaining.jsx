import { lazy } from "react";
import { MainLayout } from "@/layouts";
import Error403 from "@/pages/system/error/403";
import Error404 from "@/pages/system/error/404";

export default [
  {
    path: "/login",
    name: "Login",
    element: lazy(() => import("@/pages/system/login/index")),
  },
  {
    path: "/error",
    name: "Error",
    element: <MainLayout />,
    children: [
      {
        path: "/error/403",
        name: "Error403",
        element: <Error403 />,
      },
      {
        path: "/error/404",
        name: "Error404",
        element: <Error404 />,
      },
    ],
  },
  // {
  //   path: "/error/403",
  //   name: "Error403",
  //   element: lazy(() => import("@/pages/system/error/403")),
  // },
  // {
  //   path: "/error/404",
  //   name: "Error404",
  //   element: lazy(() => import("@/pages/system/error/404")),
  // },
];
