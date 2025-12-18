import { useMemo, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Security, Governance & Compliance page component
 * Comprehensive guide to authentication, authorization, network security, secrets management, and zero-trust
 */

// OAuth2 Flow Visualizer Component
function OAuth2FlowVisualizer() {
  const [step, setStep] = useState(0)
  const [flowType, setFlowType] = useState("authorization-code")

  const steps = {
    "authorization-code": [
      {
        title: "User Requests Access",
        description: "User clicks 'Login' and is redirected to authorization server",
        actor: "User",
        action: "→ Authorization Server",
      },
      {
        title: "Authorization Server Authenticates",
        description: "User enters credentials, authorization server validates",
        actor: "Authorization Server",
        action: "Validates credentials",
      },
      {
        title: "Authorization Code Issued",
        description: "Server redirects back with authorization code",
        actor: "Authorization Server",
        action: "→ Client (with code)",
      },
      {
        title: "Exchange Code for Tokens",
        description: "Client exchanges authorization code for access token + refresh token",
        actor: "Client",
        action: "→ Authorization Server",
      },
      {
        title: "Access Resource",
        description: "Client uses access token to access protected resources",
        actor: "Client",
        action: "→ Resource Server (with token)",
      },
    ],
  }

  const currentSteps = steps[flowType] || steps["authorization-code"]

  return (
    <div className="bg-white border-2 border-green-200 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl">
          🔐
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">OAuth2 Flow Visualizer</h4>
          <div className="text-xs text-slate-500">Authorization Code Flow</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <label className="text-xs font-semibold text-slate-700 mb-2 block">
            Flow Type
          </label>
          <select
            value={flowType}
            onChange={(e) => {
              setFlowType(e.target.value)
              setStep(0)
            }}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="authorization-code">Authorization Code</option>
          </select>
        </div>

        <div className="space-y-2">
          {currentSteps.map((s, index) => (
            <div
              key={index}
              onClick={() => setStep(index)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                step === index
                  ? "border-green-500 bg-green-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === index
                        ? "bg-green-600 text-white"
                        : "bg-slate-300 text-slate-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="font-semibold text-slate-900">{s.title}</div>
                </div>
              </div>
              <p className="text-sm text-slate-700 ml-8">{s.description}</p>
              <div className="mt-2 ml-8 text-xs text-slate-600">
                <span className="font-semibold">{s.actor}</span> {s.action}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-lg p-3 text-xs text-slate-700">
          <div className="font-semibold mb-1">Key Concepts:</div>
          <ul className="space-y-1 ml-4">
            <li>• Scopes define permissions (read, write, admin)</li>
            <li>• Access tokens are short-lived (15-60 min)</li>
            <li>• Refresh tokens are long-lived (days/weeks)</li>
            <li>• Never expose client secret in public clients</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// JWT Token Decoder Component
function JWTTokenDecoder() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  )

  const decoded = useMemo(() => {
    try {
      const parts = token.split(".")
      if (parts.length !== 3) return null

      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")))
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")))
      const signature = parts[2]

      // Check if expired
      const now = Math.floor(Date.now() / 1000)
      const isExpired = payload.exp && payload.exp < now

      return { header, payload, signature, isExpired }
    } catch (e) {
      return null
    }
  }, [token])

  return (
    <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-2xl">
          🎫
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">JWT Token Decoder</h4>
          <div className="text-xs text-slate-500">Decode and inspect JWT claims</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            JWT Token
          </label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono"
            rows={3}
            placeholder="Paste JWT token here..."
          />
        </div>

        {decoded ? (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm font-semibold text-blue-900 mb-2">Header</div>
              <pre className="text-xs bg-white p-3 rounded border border-blue-200 overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-green-900">Payload (Claims)</div>
                {decoded.isExpired && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                    EXPIRED
                  </span>
                )}
              </div>
              <pre className="text-xs bg-white p-3 rounded border border-green-200 overflow-x-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-sm font-semibold text-slate-900 mb-2">Common Claims</div>
              <div className="space-y-1 text-xs text-slate-700">
                {decoded.payload.sub && (
                  <div>
                    <span className="font-semibold">sub:</span> {decoded.payload.sub} (Subject/User ID)
                  </div>
                )}
                {decoded.payload.exp && (
                  <div>
                    <span className="font-semibold">exp:</span>{" "}
                    {new Date(decoded.payload.exp * 1000).toLocaleString()} (Expiration)
                  </div>
                )}
                {decoded.payload.iat && (
                  <div>
                    <span className="font-semibold">iat:</span>{" "}
                    {new Date(decoded.payload.iat * 1000).toLocaleString()} (Issued At)
                  </div>
                )}
                {decoded.payload.role && (
                  <div>
                    <span className="font-semibold">role:</span> {decoded.payload.role} (Role)
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-xs text-yellow-800">
              ⚠️ <strong>Security Note:</strong> JWT tokens cannot be revoked before expiry. Use
              short expiry times (15-60 min) and refresh tokens for revocation.
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            Invalid JWT token format
          </div>
        )}
      </div>
    </div>
  )
}

// IAM Policy Builder Component
function IAMPolicyBuilder() {
  const [resource, setResource] = useState("s3://my-bucket/*")
  const [actions, setActions] = useState(["s3:GetObject", "s3:PutObject"])
  const [principals, setPrincipals] = useState(["arn:aws:iam::123456789012:user/john"])

  const policy = useMemo(() => {
    return {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: principals.length > 0 ? { AWS: principals } : "*",
          Action: actions,
          Resource: resource,
        },
      ],
    }
  }, [resource, actions, principals])

  const recommendations = useMemo(() => {
    const recs = []
    if (actions.includes("*")) {
      recs.push("Avoid wildcard actions - specify exact permissions needed")
    }
    if (resource.includes("*") && !resource.endsWith("/*")) {
      recs.push("Wildcard resources should end with /* for safety")
    }
    if (principals.length === 0 || principals.includes("*")) {
      recs.push("Specify exact principals - avoid wildcards")
    }
    if (actions.length > 10) {
      recs.push("Consider grouping actions into separate statements")
    }
    return recs
  }, [resource, actions, principals])

  return (
    <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl">
          🛡️
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">IAM Policy Builder</h4>
          <div className="text-xs text-slate-500">Create least-privilege policies</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Resource
          </label>
          <input
            type="text"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="s3://my-bucket/*"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Actions (comma-separated)
          </label>
          <input
            type="text"
            value={actions.join(", ")}
            onChange={(e) => setActions(e.target.value.split(",").map((a) => a.trim()))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="s3:GetObject, s3:PutObject"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Principals (ARNs, comma-separated)
          </label>
          <input
            type="text"
            value={principals.join(", ")}
            onChange={(e) =>
              setPrincipals(e.target.value.split(",").map((p) => p.trim()))
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="arn:aws:iam::123456789012:user/john"
          />
        </div>

        {recommendations.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
            <div className="text-xs font-semibold text-yellow-900 mb-1">
              Least-Privilege Recommendations:
            </div>
            <ul className="text-xs text-yellow-800 space-y-1">
              {recommendations.map((rec, idx) => (
                <li key={idx}>• {rec}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-slate-900 rounded-lg p-4">
          <div className="text-sm font-semibold text-white mb-2">Generated Policy</div>
          <pre className="text-xs text-green-400 overflow-x-auto">
            {JSON.stringify(policy, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// Network Segmentation Designer Component
function NetworkSegmentationDesigner() {
  const [selectedTier, setSelectedTier] = useState(null)

  const tiers = [
    {
      name: "Public Tier",
      description: "Load balancers, API gateways",
      subnets: ["10.0.1.0/24", "10.0.2.0/24"],
      allowedInbound: ["Internet (HTTPS)"],
      allowedOutbound: ["Private Tier"],
      color: "red",
    },
    {
      name: "Private Tier",
      description: "Application servers",
      subnets: ["10.0.10.0/24", "10.0.11.0/24"],
      allowedInbound: ["Public Tier"],
      allowedOutbound: ["Data Tier", "Internet (for updates)"],
      color: "blue",
    },
    {
      name: "Data Tier",
      description: "Databases, caches",
      subnets: ["10.0.20.0/24"],
      allowedInbound: ["Private Tier"],
      allowedOutbound: ["None (isolated)"],
      color: "green",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      red: "bg-red-50 border-red-200 text-red-900",
      blue: "bg-blue-50 border-blue-200 text-blue-900",
      green: "bg-green-50 border-green-200 text-green-900",
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl">
          🌐
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">Network Segmentation Designer</h4>
          <div className="text-xs text-slate-500">VPC/subnet/security group visualization</div>
        </div>
      </div>

      <div className="space-y-3">
        {tiers.map((tier, index) => (
          <div
            key={index}
            onClick={() => setSelectedTier(selectedTier === index ? null : index)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedTier === index
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold text-slate-900">{tier.name}</div>
                <div className="text-xs text-slate-600">{tier.description}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${getColorClasses(tier.color)}`}>
                Tier {index + 1}
              </div>
            </div>

            {selectedTier === index && (
              <div className="mt-3 space-y-2 text-sm">
                <div>
                  <div className="font-semibold text-slate-700 mb-1">Subnets:</div>
                  <div className="text-xs text-slate-600 space-y-1">
                    {tier.subnets.map((subnet, idx) => (
                      <div key={idx} className="font-mono">{subnet}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-slate-700 mb-1">Allowed Inbound:</div>
                  <div className="text-xs text-slate-600">
                    {tier.allowedInbound.join(", ")}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-slate-700 mb-1">Allowed Outbound:</div>
                  <div className="text-xs text-slate-600">
                    {tier.allowedOutbound.join(", ")}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 bg-indigo-50 rounded-lg p-3 text-xs text-slate-700">
        <div className="font-semibold mb-1">Security Best Practices:</div>
        <ul className="space-y-1 ml-4">
          <li>• Use security groups to restrict traffic between tiers</li>
          <li>• No direct internet access to private/data tiers</li>
          <li>• Use NAT Gateway for private tier outbound internet</li>
          <li>• Enable VPC Flow Logs for monitoring</li>
        </ul>
      </div>
    </div>
  )
}

// Secrets Rotation Simulator Component
function SecretsRotationSimulator() {
  const [rotationPeriod, setRotationPeriod] = useState(90) // days
  const [currentKey, setCurrentKey] = useState(1)
  const [rotationStrategy, setRotationStrategy] = useState("zero-downtime")

  const rotationTimeline = useMemo(() => {
    const timeline = []
    const now = new Date()
    for (let i = 0; i < 5; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() + i * rotationPeriod)
      timeline.push({
        date,
        keyVersion: currentKey + i,
        status: i === 0 ? "active" : i === 1 ? "next" : "future",
      })
    }
    return timeline
  }, [rotationPeriod, currentKey])

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl">
          🔑
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">Secrets Rotation Simulator</h4>
          <div className="text-xs text-slate-500">Key rotation timeline and strategies</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Rotation Period: {rotationPeriod} days
          </label>
          <input
            type="range"
            min={30}
            max={365}
            step={30}
            value={rotationPeriod}
            onChange={(e) => setRotationPeriod(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>30 days (high-risk)</span>
            <span>365 days (low-risk)</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Rotation Strategy
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "zero-downtime", label: "Zero-Downtime" },
              { id: "scheduled", label: "Scheduled" },
            ].map((strategy) => (
              <button
                key={strategy.id}
                type="button"
                onClick={() => setRotationStrategy(strategy.id)}
                className={`text-xs font-semibold rounded-lg px-3 py-2 border transition-colors ${
                  rotationStrategy === strategy.id
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {strategy.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="text-sm font-semibold text-slate-900 mb-3">Rotation Timeline</div>
          <div className="space-y-2">
            {rotationTimeline.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 ${
                  item.status === "active"
                    ? "bg-green-50 border-green-300"
                    : item.status === "next"
                    ? "bg-yellow-50 border-yellow-300"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">
                      Key Version {item.keyVersion}
                    </div>
                    <div className="text-xs text-slate-600">
                      {item.date.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-xs font-semibold">
                    {item.status === "active" && "✓ Active"}
                    {item.status === "next" && "→ Next"}
                    {item.status === "future" && "○ Future"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-800">
          <div className="font-semibold mb-1">
            {rotationStrategy === "zero-downtime" ? "Zero-Downtime Strategy:" : "Scheduled Strategy:"}
          </div>
          {rotationStrategy === "zero-downtime" ? (
            <ul className="space-y-1 ml-4">
              <li>• Create new key version alongside current</li>
              <li>• Update services to use both keys</li>
              <li>• Deprecate old key after grace period</li>
              <li>• No service interruption</li>
            </ul>
          ) : (
            <ul className="space-y-1 ml-4">
              <li>• Schedule rotation during maintenance window</li>
              <li>• Update all services simultaneously</li>
              <li>• Brief downtime acceptable</li>
              <li>• Simpler implementation</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SecurityGovernance() {
  const nav = useNavigate()
  const sectionsReference = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-8")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    )

    sectionsReference.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative gradient-overlay py-20 md:py-32 overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
              <span className="text-sm font-medium text-green-700">Module 7</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Security, Governance & <span className="text-gradient">Compliance</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 mx-auto">
              Master authentication, authorization, network security, secrets
              management, and zero-trust architecture. Build secure systems that
              protect data and comply with regulations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => nav("/")} className="btn-secondary">
                Back to Home
              </button>
              <button onClick={() => nav("/topics")} className="btn-secondary">
                View All Topics
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Section 1: Authentication & Authorization */}
        <section
          ref={(el) => (sectionsReference.current[0] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 mb-24"
        >
          <div className="mb-12">
            <div className="inline-block">
              <div className="text-sm font-bold text-green-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center text-sm">
                  01
                </span>
                AUTHENTICATION & AUTHORIZATION
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              AuthN/AuthZ: OAuth2, OIDC, JWT & mTLS
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
              Authentication (who you are) and authorization (what you can do) are
              foundational security controls. Weak auth leads to data breaches.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <OAuth2FlowVisualizer />
            </div>
            <div>
              <JWTTokenDecoder />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-2 border-green-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">OAuth2</h3>
              <p className="text-sm text-slate-700 mb-3">
                Delegated authorization framework. User → Authorization Server →
                Access Token → Resource Server.
              </p>
              <div className="text-xs text-slate-600">
                <strong>Use for:</strong> Third-party app access, API authorization
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🆔</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">OIDC</h3>
              <p className="text-sm text-slate-700 mb-3">
                Identity layer on OAuth2. Adds ID tokens (user identity) to access
                tokens (permissions).
              </p>
              <div className="text-xs text-slate-600">
                <strong>Use for:</strong> User authentication, single sign-on (SSO)
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">mTLS</h3>
              <p className="text-sm text-slate-700 mb-3">
                Mutual TLS: both client and server authenticate with certificates.
                Used for service-to-service communication.
              </p>
              <div className="text-xs text-slate-600">
                <strong>Use for:</strong> Zero-trust networks, microservices
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Management</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-slate-900 mb-2">Best Practices:</div>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• Use managed services (AWS KMS, GCP KMS, Azure Key Vault)</li>
                  <li>• Rotate keys regularly (90 days high-risk, 365 days low-risk)</li>
                  <li>• Use key versioning for zero-downtime rotation</li>
                  <li>• Never store keys in code or config files</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-slate-900 mb-2">Trade-offs:</div>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• JWT can't be revoked (use short expiry + refresh tokens)</li>
                  <li>• mTLS adds certificate management overhead</li>
                  <li>• Key rotation requires careful coordination</li>
                  <li>• Managed services add cost but reduce risk</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Network Security */}
        <section
          ref={(el) => (sectionsReference.current[1] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 mb-24"
        >
          <div className="mb-12">
            <div className="inline-block">
              <div className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm">
                  02
                </span>
                NETWORK SECURITY
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              VPC Segmentation, WAF, DDoS & IAM
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
              Defense in depth. Network segmentation limits blast radius. WAF/DDoS
              protection prevents common attacks.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <NetworkSegmentationDesigner />
            </div>
            <div>
              <IAMPolicyBuilder />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">WAF</h3>
              <p className="text-sm text-slate-700 mb-3">
                Web Application Firewall: Filter HTTP traffic for SQL injection, XSS,
                rate limiting. Deploy at edge or application layer.
              </p>
              <div className="text-xs text-slate-600">
                <strong>Providers:</strong> CloudFront, Cloudflare, GCP Armor
              </div>
            </div>

            <div className="bg-white border-2 border-red-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">DDoS Protection</h3>
              <p className="text-sm text-slate-700 mb-3">
                Rate limiting, IP filtering, traffic analysis to detect and mitigate
                attacks. Use managed services for best protection.
              </p>
              <div className="text-xs text-slate-600">
                <strong>Providers:</strong> AWS Shield, Cloudflare, GCP Armor
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Least-Privilege IAM</h3>
              <p className="text-sm text-slate-700 mb-3">
                Grant minimum permissions needed. Use roles (not users) for services.
                Regular access reviews.
              </p>
              <div className="text-xs text-slate-600">
                <strong>Principle:</strong> Only what's needed, nothing more
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Secrets Management & Compliance */}
        <section
          ref={(el) => (sectionsReference.current[2] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 mb-24"
        >
          <div className="mb-12">
            <div className="inline-block">
              <div className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center text-sm">
                  03
                </span>
                SECRETS & COMPLIANCE
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Secrets Management, Audit Logging & Data Residency
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
              Secrets must be protected. Audit logs enable compliance. Data residency
              ensures legal compliance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <SecretsRotationSimulator />
            </div>
            <div className="space-y-6">
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Secrets Management
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Best Practices:</div>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Use managed services (AWS Secrets Manager, Vault, GCP Secret Manager)</li>
                      <li>• Never commit secrets to code</li>
                      <li>• Rotate secrets automatically</li>
                      <li>• Use environment variables or secret injection at runtime</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800">
                    ⚠️ <strong>Never:</strong> Store secrets in code, config files, or version control
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Audit Logging</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">What to Log:</div>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• All authentication attempts</li>
                      <li>• Authorization decisions</li>
                      <li>• Data access (reads, writes, deletes)</li>
                      <li>• Configuration changes</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Storage:</div>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Immutable storage (S3 with versioning, Cloud Logging)</li>
                      <li>• Tamper-evident: cryptographic signatures</li>
                      <li>• Retention: 30-90 days for production</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Data Residency Controls</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-slate-900 mb-2">Requirements:</div>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• GDPR: EU data must stay in EU</li>
                  <li>• Data localization laws (Russia, China, India)</li>
                  <li>• Industry regulations (HIPAA, PCI-DSS)</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-slate-900 mb-2">Implementation:</div>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• Use regional databases and object storage</li>
                  <li>• Encrypt data in transit and at rest</li>
                  <li>• Implement during initial design (retrofitting is expensive)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Zero-Trust Architecture */}
        <section
          ref={(el) => (sectionsReference.current[3] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 mb-24"
        >
          <div className="mb-12">
            <div className="inline-block">
              <div className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm">
                  04
                </span>
                ZERO-TRUST ARCHITECTURE
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Zero-Trust & Service Mesh Security
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
              Traditional perimeter security fails in cloud/microservices. Zero-trust:
              verify every request, regardless of network location.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Zero-Trust Principles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl mb-3">🚫</div>
                <div className="font-semibold text-slate-900 mb-2">Never Trust</div>
                <p className="text-sm text-slate-700">
                  Don't trust based on network location. Every request must be
                  verified, regardless of where it comes from.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl mb-3">✅</div>
                <div className="font-semibold text-slate-900 mb-2">Always Verify</div>
                <p className="text-sm text-slate-700">
                  Verify identity, device, and context for every request. Use
                  continuous verification, not one-time authentication.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl mb-3">🔒</div>
                <div className="font-semibold text-slate-900 mb-2">Least Privilege</div>
                <p className="text-sm text-slate-700">
                  Grant minimum access needed. Use identity-based access control, not
                  IP-based. Enforce at every layer.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl mb-3">👁️</div>
                <div className="font-semibold text-slate-900 mb-2">Assume Breach</div>
                <p className="text-sm text-slate-700">
                  Monitor and log everything. Detect anomalies. Assume attackers are
                  already inside. Design for detection and response.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Service Mesh</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-slate-900 mb-2">What It Is:</div>
                <p className="text-sm text-slate-700 mb-3">
                  Infrastructure layer for service-to-service communication (Istio,
                  Linkerd). Provides mTLS, traffic policies, observability. Sidecar
                  proxy pattern.
                </p>
                <div className="font-semibold text-slate-900 mb-2">Benefits:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Automatic mTLS between services</li>
                  <li>• Consistent security policies</li>
                  <li>• Traffic encryption and authentication</li>
                  <li>• Observability and monitoring</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-slate-900 mb-2">When to Use:</div>
                <ul className="text-sm text-slate-700 space-y-1 mb-3">
                  <li>• 10+ microservices</li>
                  <li>• Need consistent security policies</li>
                  <li>• Zero-trust architecture</li>
                  <li>• Complex service-to-service communication</li>
                </ul>
                <div className="font-semibold text-slate-900 mb-2">Trade-offs:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Adds latency (verification overhead)</li>
                  <li>• Increases resource usage (sidecar proxies)</li>
                  <li>• High operational complexity</li>
                  <li>• Learning curve for team</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-6">
          <div className="flex justify-between items-center">
            <button onClick={() => nav("/topics")} className="btn-secondary">
              ← Back to Topics
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => nav("/reliability-resilience")}
                className="btn-secondary"
              >
                ← Previous: Reliability
              </button>
              <button onClick={() => nav("/observability-operations")} className="btn-primary">
                Next: Observability →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

