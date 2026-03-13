import { createBrowserRouter } from "react-router";

import ProtectRoute from "./protect-route";
import Index from "@/pages/index/index.tsx";
import Analysis from "@/pages/dashboard/analysis/index";
import Ecommerce from "@/pages/dashboard/ecommerce/index";
import Forms from "@/pages/examples/forms/index";
import Table from "@/pages/examples/table/index";
import Login from "@/pages/login/index.tsx";

const router = createBrowserRouter([
  { path: "/login", Component: Login },
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Index />
      </ProtectRoute>
    ),
    children: [
      { index: true, Component: Analysis },
      {
        path: "dashboard",
        children: [
          { index: true, Component: Analysis },
          { path: "analysis", Component: Analysis },
          { path: "ecommerce", Component: Ecommerce },
        ],
      },
      {
        path: "examples",
        children: [
          { index: true, Component: Forms },
          { path: "forms", Component: Forms },
          { path: "table", Component: Table },
        ],
      },
    ],
  },
]);

export default router;
