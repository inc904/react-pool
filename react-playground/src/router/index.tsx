import { createBrowserRouter } from "react-router";

import Home from "@modules/Home";
import About from "@modules/About";
import Login from "@modules/Login";

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
]);

export default router;