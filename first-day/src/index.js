import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";

import router from "./router";
const root = createRoot(document.querySelector("#root"));

root.render(<RouterProvider router={router} />);
