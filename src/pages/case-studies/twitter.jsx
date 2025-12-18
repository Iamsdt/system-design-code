import {
  Users,
  ArrowLeft,
  Zap,
  Database,
  Server,
  Share2,
  Clock,
  Layout,
} from "lucide-react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import TimelineFanoutSimulator from "./components/timeline-fanout-simulator"

const TwitterHeader = ({ onBack }) => {
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
              <div className="p-3 bg-blue-500 rounded-2xl text-white">
                <Users className="w-8 h-8" />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Social Media
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Twitter: The Fan-out Problem
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              How Twitter delivers tweets to millions of followers in real-time
              using a hybrid push/pull architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

TwitterHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
}

const TwitterChallenge = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <Layout className="w-6 h-6 text-primary" /> The Challenge
    </h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      Twitter&apos;s primary challenge is the <strong>Fan-out</strong>. When a
      user with 100 million followers (like Elon Musk) tweets, that single write
      must be delivered to 100 million different timelines. Doing this
      synchronously would crash the system.
    </p>
    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
      <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-2">
        <Zap className="w-4 h-4" /> The &quot;Celebrity&quot; Problem
      </h4>
      <p className="text-sm text-amber-800">
        A standard &quot;Push&quot; model works for regular users, but for
        celebrities, the write-amplification is too high. Conversely, a
        &quot;Pull&quot; model is too slow for the average user experience.
      </p>
    </div>
  </section>
)

const TwitterSolution = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <Share2 className="w-6 h-6 text-primary" /> The Hybrid Solution
    </h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      Twitter uses a <strong>Hybrid Model</strong>:
    </p>
    <ul className="space-y-4">
      <li className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">
          1
        </div>
        <div>
          <h4 className="font-bold">Push for Regular Users</h4>
          <p className="text-sm text-slate-600">
            When a regular user tweets, it is pushed into the Redis timelines of
            all their followers immediately.
          </p>
        </div>
      </li>
      <li className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
          2
        </div>
        <div>
          <h4 className="font-bold">Pull for Celebrities</h4>
          <p className="text-sm text-slate-600">
            Celebrity tweets are NOT pushed. Instead, when a follower loads
            their timeline, the system &quot;pulls&quot; the celebrity tweets
            and merges them on-the-fly.
          </p>
        </div>
      </li>
    </ul>
  </section>
)

const TwitterArchitecture = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
    <div className="lg:col-span-2 space-y-8">
      <TwitterChallenge />
      <TwitterSolution />
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
            <div className="p-2 bg-red-50 rounded-lg">
              <Database className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Redis</p>
              <p className="text-xs text-slate-500">In-memory Timelines</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Server className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Scala/Finagle</p>
              <p className="text-xs text-slate-500">Microservices</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg">
              <Clock className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Manhattan</p>
              <p className="text-xs text-slate-500">Distributed Storage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <h4 className="font-bold mb-2">Key Metric</h4>
        <p className="text-3xl font-black text-primary mb-1">5s</p>
        <p className="text-xs text-slate-500">
          Target delivery time for 99% of tweets globally.
        </p>
      </div>
    </div>
  </div>
)

const TwitterDiagram = () => (
  <section className="mb-20">
    <h2 className="text-2xl font-bold mb-8 text-center">
      Architecture Diagram: Hybrid Fan-out
    </h2>
    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 overflow-x-auto">
      <div className="min-w-[600px] flex flex-col items-center gap-12">
        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <span className="text-xs font-bold">Celebrity</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <span className="text-xs font-bold">Regular User</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-20 w-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-slate-200" />
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg">
              Pull Path (On-Read)
            </div>
            <ArrowLeft className="w-6 h-6 text-slate-300 rotate-90" />
            <div className="p-4 bg-white border-2 border-blue-200 rounded-xl text-xs text-center">
              Query Celebrity <br /> Tweet Store
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-green-500 text-white rounded-xl font-bold text-sm shadow-lg">
              Push Path (On-Write)
            </div>
            <ArrowLeft className="w-6 h-6 text-slate-300 rotate-90" />
            <div className="p-4 bg-white border-2 border-green-200 rounded-xl text-xs text-center">
              Fan-out to <br /> Follower Redis
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="p-6 bg-slate-900 text-white rounded-2xl flex items-center gap-4 shadow-xl">
            <Layout className="w-6 h-6" />
            <div className="text-left">
              <p className="text-sm font-bold">Timeline Aggregator</p>
              <p className="text-[10px] text-slate-400">
                Merges Push + Pull results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const TwitterCaseStudy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white pb-20">
      <TwitterHeader onBack={() => navigate("/case-studies")} />

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <TwitterArchitecture />
        <TwitterDiagram />

        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Interactive Lab</h2>
            <p className="text-slate-600">
              Experiment with different fan-out strategies and see how they
              impact system load.
            </p>
          </div>
          <TimelineFanoutSimulator />
        </section>
      </div>
    </div>
  )
}

export default TwitterCaseStudy

