import { useState } from "react"
import { Calculator, BookOpen, Copy, Check } from "lucide-react"

export default function FormulasReference() {
  const [copiedFormula, setCopiedFormula] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedFormula(id)
    setTimeout(() => setCopiedFormula(null), 2000)
  }

  const formulas = {
    traffic: {
      title: "Traffic & Load Calculations",
      color: "blue",
      items: [
        {
          id: "qps",
          name: "Queries Per Second (QPS)",
          formula: "QPS = (DAU × Requests per User) ÷ 86,400",
          example: "(1M users × 50 requests) ÷ 86,400 = ~579 QPS",
          notes: "86,400 = seconds in a day"
        },
        {
          id: "peak-qps",
          name: "Peak QPS",
          formula: "Peak QPS = Average QPS × Peak Factor",
          example: "579 QPS × 2.5 = ~1,448 peak QPS",
          notes: "Peak factor is typically 2-3x, sometimes 5-10x for spiky traffic"
        },
        {
          id: "rps",
          name: "Requests Per Second",
          formula: "RPS = Total Daily Requests ÷ 86,400",
          example: "50M requests ÷ 86,400 = ~579 RPS",
          notes: "Same as QPS but more general term"
        }
      ]
    },
    storage: {
      title: "Storage & Data Calculations",
      color: "purple",
      items: [
        {
          id: "total-storage",
          name: "Total Storage Needed",
          formula: "Storage = Records × Size per Record × Time Period",
          example: "1M records × 1KB × 365 days = 365 GB",
          notes: "Don't forget to add overhead for indexes and metadata (typically 20-30%)"
        },
        {
          id: "daily-storage",
          name: "Daily Storage Growth",
          formula: "Daily Storage = New Records per Day × Size per Record",
          example: "100K new records × 2KB = 200 MB/day",
          notes: "Multiply by 365 for yearly growth"
        },
        {
          id: "with-replication",
          name: "Storage with Replication",
          formula: "Total Storage = Base Storage × Replication Factor",
          example: "1 TB × 3 replicas = 3 TB total",
          notes: "Common replication factors: 2-3x for safety"
        }
      ]
    },
    bandwidth: {
      title: "Bandwidth & Network",
      color: "green",
      items: [
        {
          id: "bandwidth-qps",
          name: "Bandwidth from QPS",
          formula: "Bandwidth (bps) = QPS × Avg Request Size (bytes) × 8",
          example: "1000 QPS × 50KB × 8 = 400 Mbps",
          notes: "Multiply by 8 to convert bytes to bits"
        },
        {
          id: "bandwidth-daily",
          name: "Daily Bandwidth",
          formula: "Daily Data = Daily Requests × Avg Request Size",
          example: "50M requests × 20KB = 1 TB/day",
          notes: "Useful for estimating CDN or cloud egress costs"
        },
        {
          id: "throughput",
          name: "Throughput",
          formula: "Throughput = Data Size ÷ Time",
          example: "100 GB ÷ 1000 seconds = 100 MB/s",
          notes: "Different from bandwidth - actual data transferred"
        }
      ]
    },
    units: {
      title: "Data Unit Conversions",
      color: "orange",
      items: [
        {
          id: "byte-kb",
          name: "Bytes to Kilobytes",
          formula: "1 KB = 1,024 bytes",
          example: "10,240 bytes = 10 KB",
          notes: "Binary (1024) vs Decimal (1000) - use binary for memory/storage"
        },
        {
          id: "kb-mb",
          name: "Kilobytes to Megabytes",
          formula: "1 MB = 1,024 KB = 1,048,576 bytes",
          example: "10,240 KB = 10 MB",
          notes: "1 million bytes ≈ 1 MB (close enough for estimates)"
        },
        {
          id: "mb-gb",
          name: "Megabytes to Gigabytes",
          formula: "1 GB = 1,024 MB = 1,073,741,824 bytes",
          example: "5,120 MB = 5 GB",
          notes: "1 billion bytes ≈ 1 GB (for quick math)"
        },
        {
          id: "gb-tb",
          name: "Gigabytes to Terabytes",
          formula: "1 TB = 1,024 GB",
          example: "2,048 GB = 2 TB",
          notes: "1 trillion bytes ≈ 1 TB"
        },
        {
          id: "tb-pb",
          name: "Terabytes to Petabytes",
          formula: "1 PB = 1,024 TB",
          example: "10,240 TB = 10 PB",
          notes: "1 quadrillion bytes ≈ 1 PB"
        }
      ]
    },
    time: {
      title: "Time Conversions",
      color: "indigo",
      items: [
        {
          id: "day-seconds",
          name: "Day to Seconds",
          formula: "1 day = 86,400 seconds",
          example: "24 hours × 60 min × 60 sec = 86,400",
          notes: "Most commonly used conversion in system design"
        },
        {
          id: "month-seconds",
          name: "Month to Seconds",
          formula: "1 month ≈ 2,592,000 seconds",
          example: "30 days × 86,400 = 2,592,000",
          notes: "Use 30 days for estimates"
        },
        {
          id: "year-seconds",
          name: "Year to Seconds",
          formula: "1 year ≈ 31,536,000 seconds",
          example: "365 days × 86,400 = 31,536,000",
          notes: "~31.5 million seconds"
        }
      ]
    },
    availability: {
      title: "Availability Calculations",
      color: "red",
      items: [
        {
          id: "uptime",
          name: "Uptime Percentage",
          formula: "Uptime % = (Total Time - Downtime) ÷ Total Time × 100",
          example: "(31,536,000 - 3,153) ÷ 31,536,000 × 100 = 99.99%",
          notes: "4 nines = 52.56 minutes downtime/year"
        },
        {
          id: "parallel-availability",
          name: "Parallel Components",
          formula: "Availability = 1 - (1 - A₁) × (1 - A₂) × ...",
          example: "Two 99% systems: 1 - (0.01 × 0.01) = 99.99%",
          notes: "Redundancy improves availability"
        },
        {
          id: "serial-availability",
          name: "Serial Components",
          formula: "Availability = A₁ × A₂ × A₃ × ...",
          example: "Three 99.9% systems: 0.999³ = 99.7%",
          notes: "Chain is only as strong as weakest link"
        }
      ]
    }
  }

  const quickReference = [
    { label: "1 KB", value: "1,024 bytes", color: "blue" },
    { label: "1 MB", value: "1,024 KB", color: "blue" },
    { label: "1 GB", value: "1,024 MB", color: "purple" },
    { label: "1 TB", value: "1,024 GB", color: "purple" },
    { label: "1 day", value: "86,400 sec", color: "green" },
    { label: "1 month", value: "2.6M sec", color: "green" },
    { label: "99.9%", value: "8.76h down/yr", color: "orange" },
    { label: "99.99%", value: "52.6m down/yr", color: "orange" }
  ]

  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Essential Formulas Reference
            </h3>
            <p className="text-sm mt-1">
              Common calculations for back-of-envelope estimation
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Quick Reference Pills */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-slate-600" />
            <h4 className="font-bold text-slate-900">Quick Reference</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickReference.map((item, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg bg-${item.color}-100 border border-${item.color}-200`}
              >
                <span className={`font-bold text-${item.color}-900`}>{item.label}</span>
                <span className={`text-${item.color}-700 ml-2`}>= {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formula Categories */}
        <div className="space-y-8">
          {Object.entries(formulas).map(([key, category]) => (
            <div key={key} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden">
              <div className={`bg-${category.color}-50 px-6 py-4 border-b border-${category.color}-200`}>
                <h4 className={`font-bold text-${category.color}-900 text-lg`}>
                  {category.title}
                </h4>
              </div>

              <div className="p-6 space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                          {item.name}
                        </div>
                        <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm text-green-400 mb-3">
                          {item.formula}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.formula, item.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          copiedFormula === item.id
                            ? "bg-green-500 text-white"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                        title="Copy formula"
                      >
                        {copiedFormula === item.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className={`bg-${category.color}-50 rounded-lg p-3 border border-${category.color}-100`}>
                        <div className={`text-xs font-semibold text-${category.color}-900 uppercase tracking-wider mb-1`}>
                          Example
                        </div>
                        <div className={`text-sm text-${category.color}-800 font-mono`}>
                          {item.example}
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                        <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-1">
                          Notes
                        </div>
                        <div className="text-sm text-amber-800">
                          {item.notes}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tips */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h4 className="font-bold text-blue-900 mb-4">🎯 Estimation Tips</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Round to nearest power of 10 for simplicity</li>
              <li>• Use 100 instead of 86,400 for ultra-quick estimates</li>
              <li>• Always state your assumptions clearly</li>
              <li>• Show your work - interviewers want to see your thought process</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <h4 className="font-bold text-purple-900 mb-4">📊 Common Ratios</h4>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>• Read:Write ratio → Often 100:1 to 1000:1</li>
              <li>• Peak:Average traffic → Typically 2-3x, sometimes 5-10x</li>
              <li>• Cache hit rate → Target 80-95%</li>
              <li>• Replication factor → Usually 2-3x for durability</li>
            </ul>
          </div>
        </div>

        {/* Common Sizes Reference */}
        <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-4">📏 Common Data Sizes</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="font-semibold text-slate-900 mb-3 text-sm">Text</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Tweet: ~280 bytes (UTF-8)</li>
                <li>• Email: ~75 KB average</li>
                <li>• Web page: ~2 MB average</li>
                <li>• eBook: ~2-5 MB</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="font-semibold text-slate-900 mb-3 text-sm">Images</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Thumbnail: ~50 KB</li>
                <li>• Photo (compressed): ~1-3 MB</li>
                <li>• Photo (RAW): ~25-50 MB</li>
                <li>• 4K image: ~10-20 MB</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="font-semibold text-slate-900 mb-3 text-sm">Video/Audio</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Song (MP3): ~3-5 MB</li>
                <li>• 1 min HD video: ~50-100 MB</li>
                <li>• 1 hour 1080p: ~3-5 GB</li>
                <li>• 1 hour 4K: ~10-20 GB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
