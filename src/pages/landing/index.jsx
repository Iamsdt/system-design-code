import { useNavigate } from "react-router-dom"

import CourseCard from "@/components/course-card"

const MODULES = [
  {
    id: 1,
    title: "Module 1: Foundations & Back-of-Envelope",
    summary: "System design basics, scalability & core fundamentals",
  },
  {
    id: 2,
    title: "Module 2: Databases & Caching",
    summary: "Storage, sharding, replication, and caches",
  },
  {
    id: 3,
    title: "Module 3: Microservices & DevOps",
    summary: "Kubernetes, CI/CD and cloud infra",
  },
  {
    id: 4,
    title: "Module 4: Observability & Real-time",
    summary: "Monitoring, real-time systems and advanced patterns",
  },
]

/**
 *
 */
export default function Landing() {
  const nav = useNavigate()

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="gradient-overlay py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span className="text-sm font-medium text-blue-700">
                Professional Cloud Engineering Course
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Master Cloud Engineering &
              <span className="text-gradient"> System Design</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              A comprehensive course covering distributed systems, cloud
              architecture, and scalable design patterns. Learn through
              interactive modules, real-world examples, and hands-on projects.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => nav("/course")}
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>Get Started</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <button onClick={() => nav("/course")} className="btn-secondary">
                Browse Modules
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tutorials Section - NEW */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 mb-4">
                <svg
                  className="w-4 h-4 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span className="text-sm font-medium text-indigo-700">
                  New: Interactive Learning
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Interactive Tutorials
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Dive deep into system design concepts with our interactive
                tutorials featuring live demos, calculators, and visualizations
              </p>
            </div>

            {/* Active Tutorials Grid */}
            <div className="max-w-7xl mx-auto mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Foundations Tutorial Card */}
                <div
                  onClick={() => nav("/foundations")}
                  className="group cursor-pointer bg-white border-2 border-blue-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 flex flex-col"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Foundations & Back-of-Envelope
                        </h3>
                        <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          Live
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Capacity planning, scaling strategies, and core
                        architectural patterns.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
                    {[
                      { icon: "💻", label: "Client-Server" },
                      { icon: "🧮", label: "Calculator" },
                      { icon: "⬆️", label: "Scaling" },
                      { icon: "📊", label: "Trade-offs" },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span className="text-xl">{feature.icon}</span>
                        <span className="font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                    <span className="text-sm text-slate-500">
                      ~30 min • 10 Topics
                    </span>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                      <span>Start Learning</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Networking Tutorial Card (NEW) */}
                <div
                  onClick={() => nav("/networking")}
                  className="group cursor-pointer bg-white border-2 border-indigo-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-400 flex flex-col"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-3xl">🌐</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          Networking & Edge
                        </h3>
                        <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          New
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        OSI model, DNS resolution, TCP/UDP, and Content Delivery
                        Networks.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
                    {[
                      { icon: "📡", label: "OSI Model" },
                      { icon: "🌍", label: "DNS Flow" },
                      { icon: "⚡", label: "Protocols" },
                      { icon: "🚀", label: "CDN & Edge" },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span className="text-xl">{feature.icon}</span>
                        <span className="font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                    <span className="text-sm text-slate-500">
                      ~45 min • 7 Topics
                    </span>
                    <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-4 transition-all">
                      <span>Start Learning</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon Cards */}
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Data Management",
                    icon: "💾",
                    status: "Coming Soon",
                  },
                  {
                    title: "Distributed Systems",
                    icon: "🔗",
                    status: "Coming Soon",
                  },
                ].map((tutorial, index) => (
                  <div
                    key={index}
                    className="bg-white/60 border border-slate-200 rounded-xl p-6 opacity-75"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{tutorial.icon}</span>
                      <h4 className="font-semibold text-slate-700">
                        {tutorial.title}
                      </h4>
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                      {tutorial.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Course Modules
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Four comprehensive modules covering everything from fundamentals
                to advanced system design patterns
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MODULES.map((module_) => (
                <CourseCard
                  key={module_.id}
                  module={{
                    title: module_.title,
                    classes: [{ title: module_.summary }],
                  }}
                  onView={() => nav(`/module/${module_.id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Interactive Learning
                </h3>
                <p className="text-sm text-slate-600">
                  Hands-on demos and visualizations for complex concepts
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  GCP Focused
                </h3>
                <p className="text-sm text-slate-600">
                  Deep dive into Google Cloud Platform services and architecture
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Real-World Projects
                </h3>
                <p className="text-sm text-slate-600">
                  Build production-ready systems with industry best practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
