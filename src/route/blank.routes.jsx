import ComputeRuntime from "@/pages/compute-runtime"
import DataArchitecture from "@/pages/data-architecture"
import Foundations from "@/pages/foundations"
import Landing from "@/pages/landing"
import Networking from "@/pages/networking"

const blankRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/foundations",
    element: <Foundations />,
  },
  {
    path: "/networking",
    element: <Networking />,
  },
  {
    path: "/data-architecture",
    element: <DataArchitecture />,
  },
  {
    path: "/compute-runtime",
    element: <ComputeRuntime />,
  },
]

export default blankRoutes
