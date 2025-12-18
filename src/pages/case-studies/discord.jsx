import {
  MessageSquare,
  ArrowLeft,
  Zap,
  Database,
  Server,
  Cpu,
  HardDrive,
  Hash,
} from "lucide-react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import MessageShardingLab from "./components/message-sharding-lab"

const DiscordHeader = ({ onBack }) => {
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
              <div className="p-3 bg-indigo-600 rounded-2xl text-white">
                <MessageSquare className="w-8 h-8" />
              </div>
              <Badge
                variant="secondary"
                className="bg-indigo-50 text-indigo-700"
              >
                Real-time Communication
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Discord: Trillions of Messages
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              How Discord evolved their storage architecture from MongoDB to
              ScyllaDB to handle trillions of messages with sub-millisecond
              latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

DiscordHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
}

const DiscordChallenge = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <Database className="w-6 h-6 text-primary" /> The Challenge
    </h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      Discord started with MongoDB, but as they grew, the data size and index
      maintenance became a nightmare. They moved to Cassandra, but eventually
      hit the &quot;JVM Garbage Collection&quot; wall, causing unpredictable
      latency spikes.
    </p>
    <p className="text-slate-600 leading-relaxed">
      With trillions of messages, they needed a database that could handle
      massive write throughput and provide predictable read performance for
      active channels.
    </p>
  </section>
)

const DiscordSolution = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <Cpu className="w-6 h-6 text-primary" /> The ScyllaDB & Rust Solution
    </h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      Discord made two bold moves: switching to <strong>ScyllaDB</strong>
      (a C++ rewrite of Cassandra) and rewriting their data services in{" "}
      <strong>Rust</strong>.
    </p>
    <ul className="space-y-4">
      <li className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 font-bold">
          1
        </div>
        <div>
          <h4 className="font-bold">Shard-per-Core Architecture</h4>
          <p className="text-sm text-slate-600">
            ScyllaDB uses a shared-nothing architecture where each CPU core
            handles its own shard of data, eliminating internal contention.
          </p>
        </div>
      </li>
      <li className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0 font-bold">
          2
        </div>
        <div>
          <h4 className="font-bold">No Garbage Collection</h4>
          <p className="text-sm text-slate-600">
            By using Rust and C++, Discord eliminated the &quot;Stop the
            World&quot; pauses common in Java/Go, leading to a 10x reduction in
            p99 latency.
          </p>
        </div>
      </li>
    </ul>
  </section>
)

const DiscordArchitecture = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
    <div className="lg:col-span-2 space-y-8">
      <DiscordChallenge />
      <DiscordSolution />
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
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold">ScyllaDB</p>
              <p className="text-xs text-slate-500">NoSQL Storage</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Cpu className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Rust</p>
              <p className="text-xs text-slate-500">Data Services</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Server className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Elixir</p>
              <p className="text-xs text-slate-500">Real-time Gateway</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <h4 className="font-bold mb-2">Key Metric</h4>
        <p className="text-3xl font-black text-primary mb-1">Trillions</p>
        <p className="text-xs text-slate-500">
          Total messages stored and searchable.
        </p>
      </div>
    </div>
  </div>
)

const DiscordDiagram = () => (
  <section className="mb-20">
    <h2 className="text-2xl font-bold mb-8 text-center">
      Data Locality: Sharding by Channel
    </h2>
    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-4 flex-wrap justify-center">
          <div className="p-4 bg-white rounded-xl border-2 border-indigo-200 shadow-sm flex flex-col items-center gap-2">
            <Hash className="w-6 h-6 text-indigo-500" />
            <span className="text-xs font-bold">Channel ID</span>
          </div>
          <div className="flex items-center">
            <ArrowLeft className="w-6 h-6 text-slate-300 rotate-180" />
          </div>
          <div className="p-4 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg">
            Consistent Hashing
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center">
                <Server className="w-5 h-5 text-slate-400" />
                <Badge variant="outline">Node {index}</Badge>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-indigo-50 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-3/4" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Core 1: Shard A</span>
                  <HardDrive className="w-3 h-3" />
                </div>
                <div className="h-2 w-full bg-indigo-50 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 w-1/2" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Core 2: Shard B</span>
                  <HardDrive className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 text-center max-w-md">
          By sharding by <code>channel_id</code>, Discord ensures that all
          messages for a single conversation live on the same shard, making
          range scans (scrolling up) extremely fast.
        </p>
      </div>
    </div>
  </section>
)

const DiscordCaseStudy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white pb-20">
      <DiscordHeader onBack={() => navigate("/case-studies")} />

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <DiscordArchitecture />
        <DiscordDiagram />

        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" /> Interactive Lab
            </h2>
            <p className="text-slate-600">
              Simulate how messages are distributed across shards using
              consistent hashing.
            </p>
          </div>
          <MessageShardingLab />
        </section>
      </div>
    </div>
  )
}

export default DiscordCaseStudy
