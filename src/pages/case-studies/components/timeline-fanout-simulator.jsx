import { Users, Zap, Clock } from "lucide-react"
import PropTypes from "prop-types"
import { useState, useMemo } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const MetricBar = ({ label, value, max, unit, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span>{label}</span>
      <span className="font-mono">
        {Math.round(value)} {unit}
      </span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
)

MetricBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

const MetricsDisplay = ({ metrics }) => (
  <div className="bg-muted/50 p-6 rounded-xl space-y-6">
    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
      System Metrics
    </h4>

    <div className="space-y-4">
      <MetricBar
        label="Write Latency (Fan-out)"
        value={metrics.writeLatency}
        max={5000}
        unit="ms"
        color="bg-red-500"
      />
      <MetricBar
        label="Read Latency (Timeline Load)"
        value={metrics.readLatency}
        max={1000}
        unit="ms"
        color="bg-green-500"
      />
      <MetricBar
        label="Storage Overhead"
        value={metrics.storageCost}
        max={100000}
        unit="units"
        color="bg-blue-500"
      />
      <MetricBar
        label="CPU Load"
        value={metrics.cpuLoad}
        max={100}
        unit="%"
        color="bg-orange-500"
      />
    </div>
  </div>
)

MetricsDisplay.propTypes = {
  metrics: PropTypes.shape({
    writeLatency: PropTypes.number.isRequired,
    readLatency: PropTypes.number.isRequired,
    storageCost: PropTypes.number.isRequired,
    cpuLoad: PropTypes.number.isRequired,
  }).isRequired,
}

const TimelineFanoutSimulator = () => {
  const [followers, setFollowers] = useState(1000)
  const [strategy, setStrategy] = useState("push") // push, pull, hybrid
  const [isTweeting, setIsTweeting] = useState(false)

  const metrics = useMemo(() => {
    let write, read, storage, cpu
    if (strategy === "push") {
      write = followers * 0.5
      read = 10
      storage = followers * 100
      cpu = followers * 0.2
    } else if (strategy === "pull") {
      write = 5
      read = followers > 10000 ? 500 : 50
      storage = 100
      cpu = followers > 10000 ? 80 : 20
    } else {
      const isCelebrity = followers > 50000
      write = isCelebrity ? 10 : Math.min(followers * 0.5, 2500)
      read = isCelebrity ? 150 : 15
      storage = isCelebrity ? 500 : followers * 80
      cpu = isCelebrity ? 40 : 25
    }
    return { writeLatency: write, readLatency: read, storageCost: storage, cpuLoad: cpu }
  }, [followers, strategy])

  const handleTweet = () => {
    setIsTweeting(true)
    setTimeout(() => setIsTweeting(false), 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Twitter Timeline Fan-out Simulator
        </CardTitle>
        <CardDescription>
          Compare how different strategies handle tweet delivery to followers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Follower Count</label>
                <Badge variant="secondary">{followers.toLocaleString()}</Badge>
              </div>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={followers}
                onChange={(e) => setFollowers(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Regular User</span>
                <span>Micro-Influencer</span>
                <span>Celebrity (1M+)</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Delivery Strategy</label>
              <div className="grid grid-cols-3 gap-2">
                {["push", "pull", "hybrid"].map((s) => (
                  <Button
                    key={s}
                    variant={strategy === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStrategy(s)}
                    className="text-xs capitalize"
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              className="w-full gap-2"
              onClick={handleTweet}
              disabled={isTweeting}
            >
              {isTweeting ? "Fanning out..." : "Send Tweet"}{" "}
              <Zap className={`w-4 h-4 ${isTweeting ? "animate-pulse" : ""}`} />
            </Button>
          </div>

          <MetricsDisplay metrics={metrics} />
        </div>

        <div className="p-4 border rounded-lg bg-background">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            {strategy.charAt(0).toUpperCase() + strategy.slice(1)} Strategy
            Analysis
          </h4>
          <p className="text-sm text-muted-foreground">
            {strategy === "push" &&
              "Best for regular users. Tweets are pre-computed into followers' timelines. Fast reads, but 'Celebrity' tweets cause massive write spikes (Fan-out storm)."}
            {strategy === "pull" &&
              "Best for celebrities. Tweets are only merged when a follower actually opens their app. Saves storage and write time, but makes timeline loading slower."}
            {strategy === "hybrid" &&
              "The Twitter (X) approach. Push for regular users to keep reads fast. Pull for celebrities to avoid crushing the database with millions of writes per tweet."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TimelineFanoutSimulator
