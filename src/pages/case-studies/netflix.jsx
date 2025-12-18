import {
  Globe,
  ArrowLeft,
  ShieldAlert,
  Activity,
  Cloud,
  Server,
  Play,
} from "lucide-react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import ChaosSandbox from "./components/chaos-sandbox"

const NetflixHeader = ({ onBack }) => {
  const handleBack = () => onBack()
  return (
    <div className="bg-slate-50 border-b border-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-8 gap-2 hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-600 rounded-2xl text-white">
                <Play className="w-8 h-8 fill-current" />
              </div>
              <Badge variant="secondary" className="bg-red-50 text-red-700">
                Streaming & Cloud Native
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Netflix: Chaos Engineering
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              How Netflix pioneered microservices and invented Chaos Engineering
              to ensure 99.99% availability on top of AWS.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

NetflixHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
}

const NetflixChallenge = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <Cloud className="w-6 h-6 text-primary" /> The Challenge
    </h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      In 2008, Netflix suffered a major database corruption that shut down their
      DVD-by-mail service for 3 days. They realized that their monolithic
      architecture was a single point of failure.
    </p>
    <p className="text-slate-600 leading-relaxed">
      They decided to move to the cloud (AWS) and break their monolith into
      hundreds of microservices. But this introduced a new problem:{" "}
      <strong>Cascading Failures</strong>. If one service slows down, it can
      take down the entire platform.
    </p>
  </section>
)

const NetflixSolution = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <ShieldAlert className="w-6 h-6 text-primary" /> The Chaos Solution
    </h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      Netflix&apos;s solution was radical: <strong>Chaos Engineering</strong>.
      They built tools like <strong>Chaos Monkey</strong> that randomly
      terminate production instances.
    </p>
    <ul className="space-y-4">
      <li className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0 font-bold">
          1
        </div>
        <div>
          <h4 className="font-bold">Design for Failure</h4>
          <p className="text-sm text-slate-600">
            Engineers are forced to build services that can handle the sudden
            disappearance of their dependencies.
          </p>
        </div>
      </li>
      <li className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
          2
        </div>
        <div>
          <h4 className="font-bold">Circuit Breakers</h4>
          <p className="text-sm text-slate-600">
            Using libraries like Hystrix, Netflix implemented circuit breakers
            that &quot;trip&quot; when a service is failing, preventing it from
            overwhelming the rest of the system.
          </p>
        </div>
      </li>
    </ul>
  </section>
)

const NetflixArchitecture = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
    <div className="lg:col-span-2 space-y-8">
      <NetflixChallenge />
      <NetflixSolution />
    </div>

    <div className="space-y-6">
      <Card className="border-2 border-slate-100 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider text-slate-500">
            Tech Stack
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Globe className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold">AWS</p>
              <p className="text-xs text-slate-500">Global Infrastructure</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Server className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Java / Spring Boot</p>
              <p className="text-xs text-slate-500">Microservices</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <ShieldAlert className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Chaos Mesh</p>
              <p className="text-xs text-slate-500">Fault Injection</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <h4 className="font-bold mb-2">Key Metric</h4>
        <p className="text-3xl font-black text-primary mb-1">1,000+</p>
        <p className="text-xs text-slate-500">
          Number of microservices running in production.
        </p>
      </div>
    </div>
  </div>
)

const NetflixDiagram = () => (
  <section className="mb-20">
    <h2 className="text-2xl font-bold mb-8 text-center">
      Resilience Pattern: The Circuit Breaker
    </h2>
    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center bg-white shadow-lg">
            <Activity className="w-10 h-10 text-green-500" />
          </div>
          <span className="font-bold text-sm">CLOSED (Healthy)</span>
          <p className="text-[10px] text-slate-500 text-center max-w-[120px]">
            Traffic flows normally. Failures are tracked.
          </p>
        </div>

        <div className="hidden md:block w-20 h-1 bg-slate-200 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-200 rotate-45 border-t border-r border-slate-300" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center bg-white shadow-lg animate-pulse">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <span className="font-bold text-sm">OPEN (Tripped)</span>
          <p className="text-[10px] text-slate-500 text-center max-w-[120px]">
            Traffic is blocked. Fallback response returned.
          </p>
        </div>

        <div className="hidden md:block w-20 h-1 bg-slate-200 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-200 rotate-45 border-t border-r border-slate-300" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-amber-500 flex items-center justify-center bg-white shadow-lg">
            <Activity className="w-10 h-10 text-amber-500" />
          </div>
          <span className="font-bold text-sm">HALF-OPEN</span>
          <p className="text-[10px] text-slate-500 text-center max-w-[120px]">
            Testing with limited traffic to see if recovered.
          </p>
        </div>
      </div>
    </div>
  </section>
)

const NetflixCaseStudy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white pb-20">
      <NetflixHeader onBack={() => navigate("/case-studies")} />

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <NetflixArchitecture />
        <NetflixDiagram />

        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-primary" /> Interactive Lab
            </h2>
            <p className="text-slate-600">
              Inject failures into a simulated microservice graph and see how
              cascading failures occur without protection.
            </p>
          </div>
          <ChaosSandbox />
        </section>
      </div>
    </div>
  )
}

export default NetflixCaseStudy
