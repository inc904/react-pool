import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

// import router from "./router";

createRoot(document.getElementById("root")).render(
  <App />,
  // <RouterProvider router={router} />,
);
