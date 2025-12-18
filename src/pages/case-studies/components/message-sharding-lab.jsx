/* global setTimeout */
import { Database, Server, Zap, Info } from "lucide-react"
import PropTypes from "prop-types"
import { useState, useMemo, useCallback } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ShardNode = ({ id, messages, isActive }) => (
  <div
    className={`p-4 border-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "border-primary bg-primary/5 scale-105 shadow-lg"
        : "border-border bg-background opacity-70"
    }`}
  >
    <div className="flex justify-between items-center mb-3">
      <div
        className={`p-2 rounded-lg ${isActive ? "bg-primary/20" : "bg-muted"}`}
      >
        <Server
          className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`}
        />
      </div>
      <Badge variant={isActive ? "default" : "outline"}>Shard {id}</Badge>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Messages</span>
        <span>{messages.length}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500"
          style={{ width: `${Math.min(messages.length * 10, 100)}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {messages.slice(-5).map((messageText) => (
          <div
            key={messageText}
            className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"
          />
        ))}
      </div>
    </div>
  </div>
)

ShardNode.propTypes = {
  id: PropTypes.number.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  isActive: PropTypes.bool.isRequired,
}

const ShardingStats = ({ total, distribution }) => (
  <div className="p-4 bg-muted rounded-lg space-y-3">
    <h4 className="text-sm font-semibold flex items-center gap-2">
      <Info className="w-4 h-4 text-primary" /> Sharding Stats
    </h4>
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span>Total Messages</span>
        <span className="font-bold">{total}</span>
      </div>
      <div className="space-y-1">
        <span className="text-[10px] text-muted-foreground">
          Load Distribution
        </span>
        <div className="flex h-2 w-full rounded-full overflow-hidden bg-background border">
          {distribution.map((distributionValue, shardIndex) => {
            const barKey = `shard-dist-${distributionValue}-${shardIndex}`
            return (
              <div
                key={barKey}
                className="h-full transition-all duration-500"
                style={{
                  width: `${distributionValue}%`,
                  backgroundColor: `hsl(var(--primary) / ${0.2 + shardIndex * 0.15})`,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  </div>
)

ShardingStats.propTypes = {
  total: PropTypes.number.isRequired,
  distribution: PropTypes.arrayOf(PropTypes.number).isRequired,
}

const ShardGrid = ({ shards, lastShard }) => (
  <div className="grid grid-cols-2 gap-4">
    {shards.map((messages, index) => {
      const shardId = index + 1
      return (
        <ShardNode
          key={`shard-node-${shardId}`}
          id={shardId}
          messages={messages}
          isActive={lastShard === index}
        />
      )
    })}
  </div>
)

ShardGrid.propTypes = {
  shards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  lastShard: PropTypes.number,
}

ShardGrid.defaultProps = {
  lastShard: null,
}

const ShardingForm = ({
  message,
  setMessage,
  onSendMessage: handleSendMessage,
  shardCount,
  setShardCount,
  setShards,
  stats,
}) => (
  <div className="space-y-4">
    <form onSubmit={handleSendMessage} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Send Message (Simulate Write)</Label>
        <div className="flex gap-2">
          <Input
            id="message"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button type="submit" className="gap-2">
            <Zap className="w-4 h-4" /> Route
          </Button>
        </div>
      </div>
    </form>

    <div className="space-y-2">
      <Label>Shard Configuration</Label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="2"
          max="6"
          value={shardCount}
          onChange={(event) => {
            const count = parseInt(event.target.value)
            setShardCount(count)
            setShards(Array.from({ length: count }, () => []))
          }}
          className="flex-grow"
        />
        <Badge variant="secondary">{shardCount} Nodes</Badge>
      </div>
    </div>

    <ShardingStats {...stats} />
  </div>
)

ShardingForm.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  shardCount: PropTypes.number.isRequired,
  setShardCount: PropTypes.func.isRequired,
  setShards: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    distribution: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
}

const MessageShardingLab = () => {
  const [shardCount, setShardCount] = useState(3)
  const [message, setMessage] = useState("")
  const [shards, setShards] = useState([[], [], []])
  const [lastShard, setLastShard] = useState(null)

  const hash = useCallback((string_) => {
    let h = 0
    for (let index = 0; index < string_.length; index++) {
      h = (h << 5) - h + string_.charCodeAt(index)
      h |= 0
    }
    return Math.abs(h)
  }, [])

  const handleSendMessage = (event) => {
    event.preventDefault()
    if (!message.trim()) return

    const shardIndex = hash(message) % shardCount
    setShards((previous) => {
      const next = [...previous]
      next[shardIndex] = [...next[shardIndex], `${message}-${Date.now()}`]
      return next
    })
    setLastShard(shardIndex)
    setMessage("")

    setTimeout(() => setLastShard(null), 1000)
  }

  const stats = useMemo(() => {
    const total = shards.reduce((accumulator, s) => accumulator + s.length, 0)
    const distribution = shards.map((s) =>
      total === 0 ? 0 : Math.round((s.length / total) * 100)
    )
    return { total, distribution }
  }, [shards])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-500" />
          Discord Message Sharding Lab
        </CardTitle>
        <CardDescription>
          Simulate how Discord shards trillions of messages across database
          nodes using consistent hashing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ShardingForm
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            shardCount={shardCount}
            setShardCount={setShardCount}
            setShards={setShards}
            stats={stats}
          />
          <ShardGrid shards={shards} lastShard={lastShard} />
        </div>

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Architectural Insight: ScyllaDB & Rust
          </h4>
          <p className="text-xs text-blue-800 leading-relaxed">
            Discord moved from MongoDB to Cassandra, and finally to{" "}
            <strong>ScyllaDB</strong> (a C++ rewrite of Cassandra). They use a{" "}
            <strong>shard-per-core</strong> architecture and wrote their data
            services in <strong>Rust</strong> to eliminate garbage collection
            pauses, allowing them to handle trillions of messages with
            predictable latency.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MessageShardingLab
