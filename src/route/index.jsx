import { createBrowserRouter } from "react-router-dom"

import BlankLayout from "@/components/layout/blank-layout"
import MainLayout from "@/components/layout/main-layout"
import ct from "@constants/"

import blankRoutes from "./blank.routes"
import dashboardRoutes from "./main.routes"

const router = createBrowserRouter([
  {
    path: ct.route.ROOT,
    element: <MainLayout />,
    children: dashboardRoutes,
  },
  {
    element: <BlankLayout />,
    children: blankRoutes,
  },
])

export default router
