import {
  MapPin,
  Maximize2,
  Layers,
  Hexagon,
  Square,
  Info,
} from "lucide-react"
import PropTypes from "prop-types"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const HexGrid = ({ resolution }) => {
  const count = resolution === 1 ? 3 : resolution === 2 ? 7 : 15
  return (
    <div className="grid grid-cols-5 gap-2 animate-in fade-in zoom-in duration-500">
      {Array.from({ length: count * 2 }).map((_, i) => (
        <div
          key={i}
          className="w-12 h-14 bg-primary/10 border border-primary/30 flex items-center justify-center relative"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            marginLeft: i % 5 === 0 ? "0" : "-10px",
            marginTop: i > 4 ? "-15px" : "0",
          }}
        >
          {Math.random() > 0.8 && (
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          )}
          {Math.random() > 0.9 && (
            <div className="w-2 h-2 bg-red-400 rounded-full" />
          )}
        </div>
      ))}
    </div>
  )
}

HexGrid.propTypes = { resolution: PropTypes.number.isRequired }

const QuadGrid = ({ resolution }) => {
  const size = resolution === 1 ? 4 : resolution === 2 ? 8 : 16
  return (
    <div
      className="grid gap-1 animate-in fade-in zoom-in duration-500"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {Array.from({ length: size * size }).map((_, i) => (
        <div
          key={i}
          className="w-6 h-6 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center"
        >
          {Math.random() > 0.9 && (
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          )}
        </div>
      ))}
    </div>
  )
}

QuadGrid.propTypes = { resolution: PropTypes.number.isRequired }

const FeatureCard = ({ title, desc, icon: Icon }) => (
  <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-primary" />
      <h5 className="text-sm font-semibold">{title}</h5>
    </div>
    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
  </div>
)

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
}

const GeospatialVisualizer = () => {
  const [mode, setMode] = useState("h3") // h3, quadtree
  const [resolution, setResolution] = useState(1)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-500" />
          Uber Geospatial Indexing: H3 vs Quadtree
        </CardTitle>
        <CardDescription>
          Visualize how different spatial indexing methods divide the map for
          rider-driver matching.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex bg-muted p-1 rounded-lg">
            <Button
              variant={mode === "h3" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("h3")}
              className="gap-2"
            >
              <Hexagon className="w-4 h-4" /> H3 (Hexagons)
            </Button>
            <Button
              variant={mode === "quadtree" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("quadtree")}
              className="gap-2"
            >
              <Square className="w-4 h-4" /> Quadtree (Squares)
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Resolution:</span>
            {[1, 2, 3].map((r) => (
              <Button
                key={r}
                variant={resolution === r ? "secondary" : "outline"}
                size="sm"
                onClick={() => setResolution(r)}
              >
                L{r}
              </Button>
            ))}
          </div>
        </div>

        <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border-4 border-slate-800 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-500 rounded-full blur-3xl" />
          </div>

          <div className="relative w-full h-full flex items-center justify-center p-8">
            {mode === "h3" ? (
              <HexGrid resolution={resolution} />
            ) : (
              <QuadGrid resolution={resolution} />
            )}
          </div>

          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 text-[10px] text-white space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary/40 border border-primary rounded-sm" />
              <span>Active Cell</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span>Driver</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              <span>Rider</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            title="Smoothing"
            desc={
              mode === "h3"
                ? "Hexagons have equal distance to all neighbors, making movement calculations smoother."
                : "Squares have different distances to diagonal vs orthogonal neighbors."
            }
            icon={Maximize2}
          />
          <FeatureCard
            title="Hierarchies"
            desc={
              mode === "h3"
                ? "H3 supports hierarchical containment, allowing Uber to aggregate data at different scales."
                : "Quadtrees are great for point-indexing but suffer from edge-case boundary issues."
            }
            icon={Layers}
          />
          <FeatureCard
            title="Matching"
            desc={
              mode === "h3"
                ? "Uber uses H3 to shard their marketplace, ensuring riders and drivers in the same cell are on the same node."
                : "Traditional grids can lead to 'hotspots' where one cell has 100x more traffic than neighbors."
            }
            icon={Info}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default GeospatialVisualizer
