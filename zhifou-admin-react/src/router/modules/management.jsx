import { MainLayout } from "@/layouts";
import User from "@/pages/management/user";
import Blog from "@/pages/management/blog";

export default {
  path: "/management",
  name: "Management",
  element: <MainLayout />,
  meta: { rank: 2 },
  children: [
    {
      path: "/management/user",
      name: "User",
      element: <User />,
    },
    {
      path: "/management/blog",
      name: "Blog",
      element: <Blog />,
    },
  ],
};
