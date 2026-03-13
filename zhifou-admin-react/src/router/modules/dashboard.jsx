import { MainLayout } from "@/layouts";
import Workbench from "@/pages/dashboard/workbench";
import Analysis from "@/pages/dashboard/analysis";

export default {
  path: "/dashboard",
  name: "Dashboard",
  element: <MainLayout />,
  meta: { rank: 1 },
  children: [
    {
      path: "/dashboard/analysis",
      name: "Analysis",
      element: <Analysis />,
    },
    {
      path: "/dashboard/workbench",
      name: "Workbench",
      element: <Workbench />,
    },
  ],
};
