import { TrendingUp, Users, Database, Wifi, Clock } from "lucide-react"
import { useState } from "react"

/**
 *
 */
export default function NumbersAtScale() {
  const [selectedScale, setSelectedScale] = useState("medium")

  const scaleScenarios = {
    small: {
      title: "Small Scale",
      subtitle: "Startup / MVP",
      users: "1K - 10K DAU",
      color: "green",
      scenarios: [
        {
          name: "Blog / Personal Website",
          dau: 5000,
          requestsPerUser: 10,
          avgRequestKB: 50,
          writeRatio: 10,
          metrics: null, // Will be calculated
        },
        {
          name: "Internal Tool",
          dau: 1000,
          requestsPerUser: 50,
          avgRequestKB: 20,
          writeRatio: 30,
          metrics: null,
        },
        {
          name: "Mobile App (Niche)",
          dau: 10000,
          requestsPerUser: 30,
          avgRequestKB: 15,
          writeRatio: 20,
          metrics: null,
        },
      ],
    },
    medium: {
      title: "Medium Scale",
      subtitle: "Growing Startup",
      users: "100K - 1M DAU",
      color: "blue",
      scenarios: [
        {
          name: "Social Media App",
          dau: 500000,
          requestsPerUser: 100,
          avgRequestKB: 30,
          writeRatio: 20,
          metrics: null,
        },
        {
          name: "E-commerce Site",
          dau: 200000,
          requestsPerUser: 40,
          avgRequestKB: 100,
          writeRatio: 15,
          metrics: null,
        },
        {
          name: "SaaS Platform",
          dau: 100000,
          requestsPerUser: 200,
          avgRequestKB: 25,
          writeRatio: 25,
          metrics: null,
        },
      ],
    },
    large: {
      title: "Large Scale",
      subtitle: "Established Company",
      users: "10M - 100M DAU",
      color: "purple",
      scenarios: [
        {
          name: "Video Platform",
          dau: 50000000,
          requestsPerUser: 50,
          avgRequestKB: 500,
          writeRatio: 10,
          metrics: null,
        },
        {
          name: "Messaging App",
          dau: 30000000,
          requestsPerUser: 300,
          avgRequestKB: 5,
          writeRatio: 50,
          metrics: null,
        },
        {
          name: "Search Engine",
          dau: 80000000,
          requestsPerUser: 30,
          avgRequestKB: 50,
          writeRatio: 5,
          metrics: null,
        },
      ],
    },
    massive: {
      title: "Massive Scale",
      subtitle: "Tech Giants",
      users: "1B+ DAU",
      color: "red",
      scenarios: [
        {
          name: "Social Network (Facebook)",
          dau: 2000000000,
          requestsPerUser: 100,
          avgRequestKB: 30,
          writeRatio: 20,
          metrics: null,
        },
        {
          name: "Video Streaming (YouTube)",
          dau: 1500000000,
          requestsPerUser: 40,
          avgRequestKB: 1000,
          writeRatio: 5,
          metrics: null,
        },
        {
          name: "Messaging (WhatsApp)",
          dau: 1800000000,
          requestsPerUser: 200,
          avgRequestKB: 2,
          writeRatio: 50,
          metrics: null,
        },
      ],
    },
  }

  // Calculate metrics for a scenario
  const calculateMetrics = (scenario) => {
    const totalRequests = scenario.dau * scenario.requestsPerUser
    const qps = Math.round(totalRequests / 86400)
    const peakQps = Math.round(qps * 2.5)
    const writeQps = Math.round((qps * scenario.writeRatio) / 100)
    const readQps = qps - writeQps

    const dailyDataKB = totalRequests * scenario.avgRequestKB
    const dailyDataGB = dailyDataKB / (1024 * 1024)
    const monthlyDataGB = dailyDataGB * 30
    const yearlyDataTB = (dailyDataGB * 365) / 1024

    const bandwidthMbps = Math.round((qps * scenario.avgRequestKB * 8) / 1024)
    const peakBandwidthMbps = Math.round(
      (peakQps * scenario.avgRequestKB * 8) / 1024
    )

    return {
      qps,
      peakQps,
      readQps,
      writeQps,
      dailyDataGB,
      monthlyDataGB,
      yearlyDataTB,
      bandwidthMbps,
      peakBandwidthMbps,
    }
  }

  const currentScale = scaleScenarios[selectedScale]
  const scenariosWithMetrics = currentScale.scenarios.map((s) => ({
    ...s,
    metrics: calculateMetrics(s),
  }))

  const formatNumber = (number_) => {
    if (number_ >= 1000000) return `${(number_ / 1000000).toFixed(2)}M`
    if (number_ >= 1000) return `${(number_ / 1000).toFixed(2)}K`
    return number_.toFixed(2)
  }

  const formatStorage = (gb) => {
    if (gb >= 1024) return `${(gb / 1024).toFixed(2)} TB`
    return `${gb.toFixed(2)} GB`
  }

  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className=" px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Numbers at Scale</h3>
            <p className="text-sm mt-1">
              Real-world system metrics across different scales
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Scale Selector */}
        <div className="mb-8">
          <div className="text-sm font-semibold text-slate-700 mb-3">
            Select Scale:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(scaleScenarios).map(([key, scale]) => (
              <button
                key={key}
                onClick={() => setSelectedScale(key)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  selectedScale === key
                    ? `border-${scale.color}-500 bg-${scale.color}-50`
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`font-bold text-lg mb-1 ${
                    selectedScale === key
                      ? `text-${scale.color}-900`
                      : "text-slate-900"
                  }`}
                >
                  {scale.title}
                </div>
                <div className="text-xs text-slate-500 mb-2">
                  {scale.subtitle}
                </div>
                <div
                  className={`text-xs font-semibold ${
                    selectedScale === key
                      ? `text-${scale.color}-700`
                      : "text-slate-600"
                  }`}
                >
                  {scale.users}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div
          className={`bg-${currentScale.color}-50 border border-${currentScale.color}-200 rounded-2xl p-6 mb-8`}
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className={`w-6 h-6 text-${currentScale.color}-600`} />
            <h4 className={`font-bold text-${currentScale.color}-900 text-lg`}>
              {currentScale.title} - Typical Characteristics
            </h4>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                User Base
              </div>
              <div
                className={`text-xl font-bold text-${currentScale.color}-600`}
              >
                {currentScale.users}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Infrastructure
              </div>
              <div className="text-sm text-slate-700">
                {selectedScale === "small" && "1-5 servers, Single DB"}
                {selectedScale === "medium" && "10-100 servers, Replicated DB"}
                {selectedScale === "large" && "100-1000s servers, Sharded DB"}
                {selectedScale === "massive" && "10,000+ servers, Distributed"}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Team Size
              </div>
              <div className="text-sm text-slate-700">
                {selectedScale === "small" && "1-5 engineers"}
                {selectedScale === "medium" && "10-50 engineers"}
                {selectedScale === "large" && "50-500 engineers"}
                {selectedScale === "massive" && "500+ engineers"}
              </div>
            </div>
          </div>
        </div>

        {/* Scenarios */}
        <div className="space-y-6">
          {scenariosWithMetrics.map((scenario, index) => (
            <div
              key={index}
              className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden"
            >
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-900 text-lg">
                    {scenario.name}
                  </h5>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-slate-600">
                      <span className="font-semibold">
                        {formatNumber(scenario.dau)}
                      </span>{" "}
                      DAU
                    </div>
                    <div className="text-slate-600">
                      <span className="font-semibold">
                        {scenario.requestsPerUser}
                      </span>{" "}
                      req/user
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                        Avg QPS
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatNumber(scenario.metrics.qps)}
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      Peak: {formatNumber(scenario.metrics.peakQps)}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <div className="text-xs font-semibold text-green-900 uppercase tracking-wider">
                        Read QPS
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatNumber(scenario.metrics.readQps)}
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      {100 - scenario.writeRatio}% of traffic
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-purple-600" />
                      <div className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
                        Write QPS
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatNumber(scenario.metrics.writeQps)}
                    </div>
                    <div className="text-xs text-purple-700 mt-1">
                      {scenario.writeRatio}% of traffic
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Wifi className="w-4 h-4 text-orange-600" />
                      <div className="text-xs font-semibold text-orange-900 uppercase tracking-wider">
                        Bandwidth
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {scenario.metrics.bandwidthMbps}
                    </div>
                    <div className="text-xs text-orange-700 mt-1">
                      Mbps (avg)
                    </div>
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-indigo-600" />
                      <div className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
                        Daily Data
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {scenario.metrics.dailyDataGB < 1000
                        ? scenario.metrics.dailyDataGB.toFixed(0)
                        : (scenario.metrics.dailyDataGB / 1024).toFixed(1)}
                    </div>
                    <div className="text-xs text-indigo-700 mt-1">
                      {scenario.metrics.dailyDataGB < 1000 ? "GB" : "TB"} per
                      day
                    </div>
                  </div>
                </div>

                {/* Storage Estimates */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="font-semibold text-slate-900 mb-3 text-sm">
                    Storage Requirements
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Daily</div>
                      <div className="font-bold text-slate-900">
                        {formatStorage(scenario.metrics.dailyDataGB)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Monthly</div>
                      <div className="font-bold text-slate-900">
                        {formatStorage(scenario.metrics.monthlyDataGB)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Yearly</div>
                      <div className="font-bold text-slate-900">
                        {scenario.metrics.yearlyDataTB.toFixed(2)} TB
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Insights */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Scaling Insights
            </h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• QPS = (DAU × Requests/User) ÷ 86,400 seconds</li>
              <li>• Peak traffic is typically 2-3x average</li>
              <li>• Read-heavy systems need caching layers</li>
              <li>• Write-heavy systems need write optimization</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Storage Planning
            </h4>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>• Plan for 2-3x growth in first year</li>
              <li>• Keep 3-6 months of hot data in fast storage</li>
              <li>• Archive older data to cheaper storage</li>
              <li>• Factor in replication (3x for safety)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
