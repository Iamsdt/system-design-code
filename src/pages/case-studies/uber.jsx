import {
  MapPin,
  ArrowLeft,
  Zap,
  Database,
  Layers,
  Navigation,
  Maximize,
  Hexagon,
} from "lucide-react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import GeospatialVisualizer from "./components/geospatial-visualizer"

const UberHeader = ({ onBack }) => {
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
              <div className="p-3 bg-black rounded-2xl text-white">
                <MapPin className="w-8 h-8" />
              </div>
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-700"
              >
                Logistics & Mobility
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Uber: Geospatial Scaling
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              How Uber uses H3 Hexagonal Indexing to match riders and drivers
              across the globe with sub-second precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

UberHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
}

const UberChallenge = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <Navigation className="w-6 h-6 text-primary" /> The Challenge
    </h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      Uber needs to perform millions of spatial queries per second. &quot;Find
      the 5 closest drivers to this rider&quot; or &quot;What is the surge
      multiplier in this specific neighborhood?&quot;
    </p>
    <p className="text-slate-600 leading-relaxed">
      Traditional databases aren&apos;t built for high-frequency spatial joins.
      Using raw latitude/longitude is computationally expensive for distance
      calculations at scale.
    </p>
  </section>
)

const UberSolution = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <Hexagon className="w-6 h-6 text-primary" /> The H3 Solution
    </h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      Uber developed <strong>H3</strong>, a hexagonal hierarchical geospatial
      indexing system. Why hexagons?
    </p>
    <ul className="space-y-4">
      <li className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
          1
        </div>
        <div>
          <h4 className="font-bold">Uniform Distance</h4>
          <p className="text-sm text-slate-600">
            Unlike squares (where diagonals are longer), the distance between a
            hexagon&apos;s center and its neighbors is constant for all 6
            neighbors.
          </p>
        </div>
      </li>
      <li className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 font-bold">
          2
        </div>
        <div>
          <h4 className="font-bold">Hierarchical</h4>
          <p className="text-sm text-slate-600">
            H3 supports multiple resolutions. You can represent a city as a few
            large hexagons or a street corner as many tiny ones.
          </p>
        </div>
      </li>
    </ul>
  </section>
)

const UberArchitecture = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
    <div className="lg:col-span-2 space-y-8">
      <UberChallenge />
      <UberSolution />
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
            <div className="p-2 bg-green-50 rounded-lg">
              <Database className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Schemaless</p>
              <p className="text-xs text-slate-500">Built on MySQL</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold">H3 Library</p>
              <p className="text-xs text-slate-500">Open Source C/Java/JS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Go / Java</p>
              <p className="text-xs text-slate-500">High-perf Services</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <h4 className="font-bold mb-2">Key Metric</h4>
        <p className="text-3xl font-black text-primary mb-1">100ms</p>
        <p className="text-xs text-slate-500">
          Max latency for driver-rider matching globally.
        </p>
      </div>
    </div>
  </div>
)

const UberDiagram = () => (
  <section className="mb-20">
    <h2 className="text-2xl font-bold mb-8 text-center">
      Visualizing the Grid: Squares vs Hexagons
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center">
        <div className="grid grid-cols-3 gap-1 mb-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div
              key={`square-${index}`}
              className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center"
            >
              {index === 4 && (
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
        <h4 className="font-bold text-sm mb-2">Quadtree (Squares)</h4>
        <p className="text-xs text-slate-500 text-center">
          Diagonals are √2 times longer. Inconsistent neighbor distances make
          smoothing and radius searches harder.
        </p>
      </div>

      <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <div className="flex gap-1">
            <Hexagon className="w-12 h-12 text-slate-200 fill-white" />
            <Hexagon className="w-12 h-12 text-slate-200 fill-white" />
          </div>
          <div className="flex gap-1 -mt-3">
            <Hexagon className="w-12 h-12 text-slate-200 fill-white" />
            <Hexagon className="w-12 h-12 text-primary fill-primary/10" />
            <Hexagon className="w-12 h-12 text-slate-200 fill-white" />
          </div>
          <div className="flex gap-1 -mt-3">
            <Hexagon className="w-12 h-12 text-slate-200 fill-white" />
            <Hexagon className="w-12 h-12 text-slate-200 fill-white" />
          </div>
        </div>
        <h4 className="font-bold text-sm mb-2">H3 (Hexagons)</h4>
        <p className="text-xs text-slate-500 text-center">
          All 6 neighbors are equidistant from the center. Perfect for
          calculating surge pricing and supply/demand clusters.
        </p>
      </div>
    </div>
  </section>
)

const UberCaseStudy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white pb-20">
      <UberHeader onBack={() => navigate("/case-studies")} />

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <UberArchitecture />
        <UberDiagram />

        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Maximize className="w-6 h-6 text-primary" /> Interactive Lab
            </h2>
            <p className="text-slate-600">
              Compare how H3 hexagons cover an area versus traditional
              quadtrees.
            </p>
          </div>
          <GeospatialVisualizer />
        </section>
      </div>
    </div>
  )
}

export default UberCaseStudy

