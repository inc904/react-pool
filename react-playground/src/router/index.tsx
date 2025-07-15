import { createBrowserRouter } from "react-router";

import Home from "@modules/Home";
import About from "@modules/About";
import Login from "@modules/Login";
import Layout from  "@modules/common/systemLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: < Login/>,
  },
  {
    path: "/layout",
    element: < Layout/>,
  },
]);

export default router;