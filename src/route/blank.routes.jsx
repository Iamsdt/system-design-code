import ComputeRuntime from "@/pages/compute-runtime"
import DataArchitecture from "@/pages/data-architecture"
import Foundations from "@/pages/foundations"
import Landing from "@/pages/landing"
import Networking from "@/pages/networking"
import ApisIntegration from "@/pages/apis-integration"
import Topics from "@/pages/topics"
import ReliabilityResilience from "@/pages/reliability-resilience"
import SecurityGovernance from "@/pages/security-governance"

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
  {
    path: "/apis-integration",
    element: <ApisIntegration />,
  },
  {
    path: "/reliability-resilience",
    element: <ReliabilityResilience />,
  },
  {
    path: "/security-governance",
    element: <SecurityGovernance />,
  },
  {
    path: "/topics",
    element: <Topics />,
  },
]

export default blankRoutes
