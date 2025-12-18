import ComputeRuntime from "@/pages/compute-runtime"
import DataArchitecture from "@/pages/data-architecture"
import Foundations from "@/pages/foundations"
import Landing from "@/pages/landing"
import Networking from "@/pages/networking"
import ApisIntegration from "@/pages/apis-integration"
import Topics from "@/pages/topics"
import ReliabilityResilience from "@/pages/reliability-resilience"
import SecurityGovernance from "@/pages/security-governance"
import ObservabilityOperations from "@/pages/observability-operations"
import CloudComparisons from "@/pages/cloud-comparisons"
import CaseStudies from "@/pages/case-studies"
import TwitterCaseStudy from "@/pages/case-studies/twitter"
import UberCaseStudy from "@/pages/case-studies/uber"
import NetflixCaseStudy from "@/pages/case-studies/netflix"
import DiscordCaseStudy from "@/pages/case-studies/discord"

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
    path: "/observability-operations",
    element: <ObservabilityOperations />,
  },
  {
    path: "/cloud-comparisons",
    element: <CloudComparisons />,
  },
  {
    path: "/case-studies",
    element: <CaseStudies />,
  },
  {
    path: "/case-studies/twitter",
    element: <TwitterCaseStudy />,
  },
  {
    path: "/case-studies/uber",
    element: <UberCaseStudy />,
  },
  {
    path: "/case-studies/netflix",
    element: <NetflixCaseStudy />,
  },
  {
    path: "/case-studies/discord",
    element: <DiscordCaseStudy />,
  },
  {
    path: "/topics",
    element: <Topics />,
  },
]

export default blankRoutes
