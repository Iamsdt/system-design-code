import { useState } from "react"
import { FileText, Download, CheckCircle, Clock, Lightbulb, AlertCircle } from "lucide-react"

export default function InterviewCheatsheet() {
  const [selectedTemplate, setSelectedTemplate] = useState("general")

  const templates = {
    general: {
      title: "General System Design Interview",
      duration: "45-60 minutes",
      phases: [
        {
          phase: "Requirements (5-10 min)",
          timing: "~15% of time",
          color: "blue",
          tasks: [
            "Clarify functional requirements (what features?)",
            "Define non-functional requirements (scale, performance, availability)",
            "Identify constraints (budget, timeline, existing systems)",
            "Ask about users (who, where, when?)"
          ],
          questions: [
            "How many users? Daily/Monthly active users?",
            "Read-heavy or write-heavy workload?",
            "What's the expected data size?",
            "Any specific latency requirements?",
            "Global or regional service?"
          ]
        },
        {
          phase: "Estimations (5-10 min)",
          timing: "~15% of time",
          color: "purple",
          tasks: [
            "Calculate QPS (queries per second)",
            "Estimate storage requirements",
            "Calculate bandwidth needs",
            "Determine cache size"
          ],
          formulas: [
            "QPS = Daily Active Users × Actions/User ÷ 86,400",
            "Peak QPS = Average QPS × 2-3",
            "Storage = Data per record × Records × Retention period",
            "Bandwidth = QPS × Average request size"
          ]
        },
        {
          phase: "High-Level Design (10-15 min)",
          timing: "~25% of time",
          color: "green",
          tasks: [
            "Draw main components (boxes)",
            "Show data flow (arrows)",
            "Identify APIs/interfaces",
            "Explain user journey"
          ],
          components: [
            "Load Balancer",
            "API Gateway",
            "Application Servers",
            "Database(s)",
            "Cache Layer",
            "Message Queue",
            "CDN (if needed)"
          ]
        },
        {
          phase: "Deep Dive (15-20 min)",
          timing: "~35% of time",
          color: "orange",
          tasks: [
            "Pick 2-3 areas to detail",
            "Discuss database schema",
            "Explain caching strategy",
            "Cover scaling approach",
            "Address bottlenecks"
          ],
          topics: [
            "Database: SQL vs NoSQL, sharding, replication",
            "Caching: Cache-aside, write-through, TTL strategy",
            "Scaling: Horizontal vs vertical, load balancing",
            "Consistency: Strong vs eventual, CAP theorem",
            "Reliability: Redundancy, failover, monitoring"
          ]
        },
        {
          phase: "Wrap-up (5 min)",
          timing: "~10% of time",
          color: "indigo",
          tasks: [
            "Discuss monitoring & alerting",
            "Cover deployment strategy",
            "Mention security considerations",
            "Address potential failures"
          ],
          extras: [
            "Logging & metrics (Prometheus, Grafana)",
            "Error handling & retries",
            "A/B testing capability",
            "Cost optimization"
          ]
        }
      ]
    },
    storage: {
      title: "Storage-Heavy System (e.g., Dropbox, S3)",
      duration: "45-60 minutes",
      focus: "File storage, metadata, sync, deduplication",
      keyPoints: [
        "Separate file storage from metadata",
        "Use object storage (S3) for files",
        "Database for metadata & user info",
        "Chunking for large files",
        "Deduplication to save space",
        "Sync mechanism for clients"
      ]
    },
    realtime: {
      title: "Real-time System (e.g., Chat, Messaging)",
      duration: "45-60 minutes",
      focus: "WebSocket, message delivery, presence",
      keyPoints: [
        "WebSocket for bidirectional communication",
        "Message queue for reliability",
        "Presence service for online status",
        "Message persistence in database",
        "Push notifications for offline users",
        "Group chat considerations (fan-out)"
      ]
    },
    video: {
      title: "Video Streaming (e.g., YouTube, Netflix)",
      duration: "45-60 minutes",
      focus: "CDN, encoding, adaptive bitrate",
      keyPoints: [
        "Upload: transcoding pipeline",
        "Multiple qualities (360p, 720p, 1080p)",
        "CDN for global distribution",
        "Adaptive bitrate streaming (HLS/DASH)",
        "Thumbnail generation",
        "View count & analytics"
      ]
    }
  }

  const currentTemplate = templates[selectedTemplate]

  const downloadCheatsheet = () => {
    // In a real implementation, this would generate a PDF
    alert("PDF download would be implemented here using jsPDF or similar library")
  }

  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                System Design Interview Cheatsheet
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                Step-by-step template with timing guidelines
              </p>
            </div>
          </div>
          <button
            onClick={downloadCheatsheet}
            className="px-4 py-2 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Template Selector */}
        <div className="mb-8">
          <div className="text-sm font-semibold text-slate-700 mb-3">
            Select Template Type:
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {Object.entries(templates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedTemplate === key
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className={`font-bold text-sm mb-1 ${
                  selectedTemplate === key ? "text-indigo-900" : "text-slate-900"
                }`}>
                  {template.title}
                </div>
                <div className="text-xs text-slate-500">{template.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* General Template - Detailed Phases */}
        {selectedTemplate === "general" && (
          <div className="space-y-6">
            {/* Time Allocation Overview */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-slate-600" />
                <h4 className="font-bold text-slate-900">Time Allocation</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentTemplate.phases.map((phase, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 rounded-lg bg-${phase.color}-100 border border-${phase.color}-200`}
                  >
                    <div className={`text-xs font-semibold text-${phase.color}-900`}>
                      {phase.phase}
                    </div>
                    <div className={`text-xs text-${phase.color}-700 mt-1`}>
                      {phase.timing}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Phases */}
            {currentTemplate.phases.map((phase, index) => (
              <div
                key={index}
                className={`bg-white border-2 border-${phase.color}-200 rounded-2xl overflow-hidden`}
              >
                <div className={`bg-${phase.color}-50 px-6 py-4 border-b border-${phase.color}-200`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-${phase.color}-500 text-white flex items-center justify-center font-bold`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold text-${phase.color}-900`}>
                          {phase.phase}
                        </h4>
                        <div className={`text-sm text-${phase.color}-600 flex items-center gap-2`}>
                          <Clock className="w-4 h-4" />
                          {phase.timing}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Tasks */}
                  {phase.tasks && (
                    <div>
                      <div className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Key Tasks
                      </div>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className={`text-${phase.color}-500 mt-0.5`}>→</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Questions */}
                  {phase.questions && (
                    <div className={`bg-${phase.color}-50 rounded-xl p-4`}>
                      <div className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Lightbulb className={`w-4 h-4 text-${phase.color}-600`} />
                        Questions to Ask
                      </div>
                      <ul className="space-y-2">
                        {phase.questions.map((q, idx) => (
                          <li key={idx} className={`text-sm text-${phase.color}-800`}>
                            • {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Formulas */}
                  {phase.formulas && (
                    <div className="bg-slate-900 rounded-xl p-4 font-mono">
                      {phase.formulas.map((formula, idx) => (
                        <div key={idx} className="text-sm text-green-400 mb-2 last:mb-0">
                          {formula}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Components */}
                  {phase.components && (
                    <div>
                      <div className="font-semibold text-slate-900 mb-3">
                        Common Components
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.components.map((comp, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1.5 rounded-lg bg-${phase.color}-100 text-${phase.color}-800 text-sm font-medium border border-${phase.color}-200`}
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Topics */}
                  {phase.topics && (
                    <div>
                      <div className="font-semibold text-slate-900 mb-3">
                        Deep Dive Topics
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {phase.topics.map((topic, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 rounded-lg px-4 py-3 text-sm text-slate-700 border border-slate-200"
                          >
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extras */}
                  {phase.extras && (
                    <div>
                      <div className="font-semibold text-slate-900 mb-3">
                        Additional Considerations
                      </div>
                      <ul className="space-y-2">
                        {phase.extras.map((extra, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-indigo-500">•</span>
                            <span>{extra}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Specialized Templates */}
        {selectedTemplate !== "general" && (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-slate-900">Focus Area</h4>
              </div>
              <p className="text-slate-700 text-lg">{currentTemplate.focus}</p>
            </div>

            <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6">
              <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Design Points</h4>
              <div className="space-y-3">
                {currentTemplate.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-slate-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pro Tips */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Do This
            </div>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Think out loud - explain your reasoning</li>
              <li>• Ask clarifying questions early</li>
              <li>• Start simple, then add complexity</li>
              <li>• Discuss trade-offs explicitly</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Avoid This
            </div>
            <ul className="text-sm text-red-800 space-y-2">
              <li>• Don't dive into details too early</li>
              <li>• Don't be silent - communicate!</li>
              <li>• Don't assume requirements</li>
              <li>• Don't ignore scale constraints</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Pro Tips
            </div>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Use round numbers for calculations</li>
              <li>• Draw diagrams as you talk</li>
              <li>• Mention monitoring & alerts</li>
              <li>• Be ready to defend your choices</li>
            </ul>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Common Interview Mistakes
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold text-amber-900 mb-2 text-sm">Communication</div>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Not clarifying ambiguous requirements</li>
                <li>• Going silent for long periods</li>
                <li>• Not explaining trade-offs</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-amber-900 mb-2 text-sm">Technical</div>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Jumping to implementation details</li>
                <li>• Ignoring scalability from the start</li>
                <li>• Not considering failure scenarios</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
