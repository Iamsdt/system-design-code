import {
  ShieldAlert,
  Activity,
  Zap,
  RefreshCw,
  Server,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import PropTypes from "prop-types"
import { useState, useEffect, useCallback } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ServiceNode = ({ service, onKill }) => {
  const getStatusColor = () => {
    switch (service.status) {
      case "healthy":
        return "border-green-500 bg-green-500/5"
      case "degraded":
        return "border-yellow-500 bg-yellow-500/5"
      case "failed":
        return "border-red-500 bg-red-500/5"
      default:
        return "border-border"
    }
  }

  const getStatusIcon = () => {
    switch (service.status) {
      case "healthy":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "failed":
        return <ShieldAlert className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div
      className={`p-4 border-2 rounded-xl transition-all duration-300 ${getStatusColor()}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-background rounded-lg border">
          <Server className="w-4 h-4 text-muted-foreground" />
        </div>
        {getStatusIcon()}
      </div>
      <h5 className="font-bold text-sm mb-1">{service.name}</h5>
      <p className="text-[10px] text-muted-foreground mb-4">
        Deps:{" "}
        {service.dependencies.length > 0
          ? service.dependencies.join(", ")
          : "None"}
      </p>
      <Button
        variant="destructive"
        size="sm"
        className="w-full text-[10px] h-7"
        disabled={service.status === "failed"}
        onClick={onKill}
      >
        Kill Service
      </Button>
    </div>
  )
}

ServiceNode.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    dependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onKill: PropTypes.func.isRequired,
}

const ChaosSandbox = () => {
  const [services, setServices] = useState([
    {
      id: "api-gateway",
      name: "API Gateway",
      status: "healthy",
      dependencies: ["auth-service", "movie-service"],
    },
    {
      id: "auth-service",
      name: "Auth Service",
      status: "healthy",
      dependencies: ["user-db"],
    },
    {
      id: "movie-service",
      name: "Movie Service",
      status: "healthy",
      dependencies: ["movie-db", "recommendation-engine"],
    },
    {
      id: "recommendation-engine",
      name: "Rec Engine",
      status: "healthy",
      dependencies: ["user-db", "analytics-service"],
    },
    { id: "user-db", name: "User DB", status: "healthy", dependencies: [] },
    { id: "movie-db", name: "Movie DB", status: "healthy", dependencies: [] },
    {
      id: "analytics-service",
      name: "Analytics",
      status: "healthy",
      dependencies: [],
    },
  ])

  const [logs, setLogs] = useState(["System initialized. All services healthy."])

  const addLog = useCallback((msg, type = "info") => {
    setLogs((prev) =>
      [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5)
    )
  }, [])

  const killService = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "failed" } : s))
    )
    const serviceName = services.find((s) => s.id === id).name
    addLog(`CRITICAL: ${serviceName} has failed!`, "error")
  }

  const recoverAll = () => {
    setServices((prev) => prev.map((s) => ({ ...s, status: "healthy" })))
    addLog("Recovery initiated. All services restored.", "success")
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setServices((prev) => {
        let changed = false
        const next = prev.map((service) => {
          const failedDeps = service.dependencies.filter(
            (depId) => prev.find((s) => s.id === depId)?.status === "failed"
          )

          if (failedDeps.length > 0 && service.status === "healthy") {
            changed = true
            return { ...service, status: "degraded" }
          }
          return service
        })

        if (changed) {
          addLog("Cascading failure detected. Some services are degraded.", "warning")
        }
        return next
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [services, addLog])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          Netflix Chaos Sandbox
        </CardTitle>
        <CardDescription>
          Kill services to see how failures cascade through a microservices
          architecture.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Badge variant="outline" className="flex gap-1 items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full" /> Healthy
            </Badge>
            <Badge variant="outline" className="flex gap-1 items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" /> Degraded
            </Badge>
            <Badge variant="outline" className="flex gap-1 items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full" /> Failed
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={recoverAll}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Restore System
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {services.map((service) => (
            <ServiceNode
              key={service.id}
              service={service}
              onKill={() => killService(service.id)}
            />
          ))}
        </div>

        <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-xs space-y-1 min-h-[120px]">
          <div className="flex items-center gap-2 mb-2 text-slate-400 border-b border-slate-800 pb-1">
            <Activity className="w-3 h-3" /> SYSTEM LOGS
          </div>
          {logs.map((log, i) => (
            <div
              key={i}
              className={
                log.includes("CRITICAL")
                  ? "text-red-400"
                  : log.includes("Recovery")
                    ? "text-green-400"
                    : log.includes("Cascading")
                      ? "text-yellow-400"
                      : ""
              }
            >
              {log}
            </div>
          ))}
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> Architectural Insight
          </h4>
          <p className="text-xs text-muted-foreground">
            Netflix uses <strong>Chaos Monkey</strong> to randomly terminate
            instances in production. This forces engineers to build services
            that can handle dependency failures gracefully (e.g., using circuit
            breakers, fallbacks, and retries).
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChaosSandbox
