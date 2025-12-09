import { createBrowserRouter } from "react-router-dom"

import BlankLayout from "@/components/layout/blank-layout"

import blankRoutes from "./blank.routes"

const router = createBrowserRouter([
  {
    element: <BlankLayout />,
    children: blankRoutes,
  },
])

export default router
