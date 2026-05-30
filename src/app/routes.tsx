import { createBrowserRouter } from "react-router";
import { Flyers } from "./pages/Flyers";
import { Stats } from "./pages/Stats";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Flyers },
      { path: "stats", Component: Stats },
    ],
  },
]);
