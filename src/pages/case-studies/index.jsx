/* global IntersectionObserver, document */
import {
  BookOpen,
  ArrowRight,
  Globe,
  MessageSquare,
  MapPin,
  Users,
} from "lucide-react"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const CaseStudyCard = ({ id, title, company, challenge, icon: Icon, tags }) => {
  const navigate = useNavigate()
  return (
    <Card
      className="h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 group"
      onClick={() => navigate(`/case-studies/${id}`)}
    >
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex gap-1 flex-wrap justify-end">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {company}: {title}
        </CardTitle>
        <CardDescription className="font-medium line-clamp-2">
          {challenge}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="flex items-center text-sm font-bold text-primary gap-2 group-hover:gap-3 transition-all">
          Explore Architecture <ArrowRight className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  )
}

CaseStudyCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  challenge: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const HeroSection = () => (
  <section className="mb-12 text-center py-12 bg-slate-50 rounded-3xl border border-slate-100">
    <div className="flex items-center justify-center gap-3 mb-4">
      <Badge variant="outline" className="px-3 py-1 bg-white">
        Module 10
      </Badge>
      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
        Real-World Case Studies
      </span>
    </div>
    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-slate-900">
      Learning from the <span className="text-primary">Giants</span>
    </h1>
    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
      Theory is good, but practice is better. Explore how the world&apos;s
      leading engineering teams solved their most difficult scaling,
      reliability, and performance challenges.
    </p>
  </section>
)

const CaseStudiesGrid = () => {
  const studies = [
    {
      id: "netflix",
      company: "Netflix",
      title: "The Microservices Pioneer",
      challenge:
        "Transitioning from a monolithic DVD service to a global streaming platform.",
      icon: Globe,
      tags: ["Microservices", "Chaos Eng", "AWS"],
    },
    {
      id: "uber",
      company: "Uber",
      title: "Geospatial Scaling",
      challenge:
        "Matching millions of riders and drivers in real-time with sub-second latency.",
      icon: MapPin,
      tags: ["Geospatial", "H3", "Real-time"],
    },
    {
      id: "discord",
      company: "Discord",
      title: "Trillions of Messages",
      challenge:
        "Storing trillions of messages and handling massive concurrent spikes.",
      icon: MessageSquare,
      tags: ["ScyllaDB", "Rust", "Data Locality"],
    },
    {
      id: "twitter",
      company: "Twitter",
      title: "The Fan-out Problem",
      challenge:
        "Delivering tweets to millions of followers instantly (The 'Celebrity' problem).",
      icon: Users,
      tags: ["Fan-out", "Redis", "Hybrid Architecture"],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {studies.map((study) => (
        <div
          key={study.id}
          className="reveal-on-scroll opacity-0 translate-y-4 transition-all duration-700"
        >
          <CaseStudyCard {...study} />
        </div>
      ))}
    </div>
  )
}

const CaseStudiesPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-4")
          }
        })
      },
      { threshold: 0.1 }
    )

    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <HeroSection />
      <CaseStudiesGrid />

      <section className="mt-16 p-12 bg-slate-900 text-white rounded-3xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Design Your Own?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            You&apos;ve completed the essentials! From core principles to
            real-world case studies, you now have the mental models to build
            scalable, resilient systems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="default"
              onClick={() => navigate("/topics")}
              className="gap-2 h-14 px-8 text-lg font-bold"
            >
              Back to Topics <BookOpen className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
              className="gap-2 h-14 px-8 text-lg font-bold bg-transparent border-white/20 hover:bg-white/10 text-white"
            >
              Home <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CaseStudiesPage
