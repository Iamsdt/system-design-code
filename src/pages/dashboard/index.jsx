import { useNavigate } from "react-router-dom"

import ct from "@constants/"

import DashboardUI from "./dashboard.ui"

/**
 *
 */
const Dashboard = () => {
  const navigate = useNavigate()

  const handleNavigateToComments = () => {
    navigate(ct.route.dashboard.COMMENTS)
  }

  return <DashboardUI onClick={handleNavigateToComments} />
}

export default Dashboard
