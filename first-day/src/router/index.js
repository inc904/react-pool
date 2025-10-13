import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";

import HomePage from "../pages/home";
import AboutPage from "../pages/about";
import TestPage from "../pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
  //   {
  //     path: "/home",
  //     element: <HomePage />,
  //   },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);
export default router;
