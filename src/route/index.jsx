import { createHashRouter, createBrowserRouter } from "react-router-dom"

import BlankLayout from "@/components/layout/blank-layout"
import ErrorPage from "@/pages/misc/error-found"
import NotFoundPage from "@/pages/misc/not-found"

import blankRoutes from "./blank.routes"

// By default use HashRouter to keep the app robust on static hosts (GH Pages).
// Use BrowserRouter during local development only when VITE_USE_BROWSER_ROUTER=true
const RouterFactory =
  import.meta.env.VITE_USE_BROWSER_ROUTER === "true" ? createBrowserRouter : createHashRouter

// Use BrowserRouter during local development for clean paths.
// Use HashRouter in production so the routes work with GitHub Pages.
const router = RouterFactory([
  {
    element: <BlankLayout />,
    children: [
      ...blankRoutes,
      // Catch-all 404 route for client-side navigation
      { path: "*", element: <NotFoundPage /> },
    ],
    // Global route-level error handling for route load/runtime errors
    errorElement: <ErrorPage />,
  },
])

export default router
