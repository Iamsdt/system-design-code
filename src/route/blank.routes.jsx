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
]

export default blankRoutes
