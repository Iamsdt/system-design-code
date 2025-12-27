import {
  BookOpen,
  ArrowRight,
  Globe,
  MessageSquare,
  MapPin,
  Users,
} from "lucide-react"
import PropTypes from "prop-types"
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
      className="h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer border-2 group"
      style={{
        backgroundColor: '#ffffff',
        color: '#0f172a',
        borderColor: '#e2e8f0'
      }}
      onClick={() => navigate(`/case-studies/${id}`)}
    >
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div 
            className="p-2 rounded-lg group-hover:bg-blue-600 transition-colors"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
          >
            <Icon 
              className="w-6 h-6 group-hover:text-white transition-colors" 
              style={{ color: '#334155' }}
            />
          </div>
          <div className="flex gap-1 flex-wrap justify-end">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-[10px]"
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#334155'
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardTitle 
          className="text-xl group-hover:text-blue-600 transition-colors"
          style={{ color: '#0f172a' }}
        >
          {company}: {title}
        </CardTitle>
        <CardDescription 
          className="font-medium line-clamp-2"
          style={{ color: '#475569' }}
        >
          {challenge}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div 
          className="flex items-center text-sm font-bold gap-2 group-hover:gap-3 transition-all"
          style={{ color: '#3b82f6' }}
        >
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
  <section 
    className="relative gradient-overlay py-20 md:py-32 overflow-hidden mb-16"
    style={{ backgroundColor: '#ffffff' }}
  >
    <div className="container-custom relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
          style={{
            backgroundColor: '#faf5ff',
            borderColor: '#f3e8ff'
          }}
        >
          <span 
            className="text-sm font-medium"
            style={{ color: '#7c3aed' }}
          >
            Module 10
          </span>
        </div>
        <h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          style={{ color: '#0f172a' }}
        >
          Learning from the <span className="text-gradient">Giants</span>
        </h1>
        <p 
          className="text-lg md:text-xl mb-8 mx-auto"
          style={{ color: '#475569' }}
        >
          Theory is good, but practice is better. Explore how the world&apos;s
          leading engineering teams solved their most difficult scaling,
          reliability, and performance challenges.
        </p>
      </div>
    </div>
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
          className="reveal-on-scroll opacity-100 translate-y-0 transition-all duration-700"
        >
          <CaseStudyCard {...study} />
        </div>
      ))}
    </div>
  )
}

const CaseStudiesPage = () => {
  const navigate = useNavigate()
  // Animation is now handled by starting visible, so no observer needed

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <HeroSection />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <CaseStudiesGrid />

        <section 
          className="mt-16 p-12 rounded-3xl text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
            border: '1px solid #e2e8f0'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div 
              className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]"
              style={{ backgroundColor: '#3b82f6' }}
            />
            <div 
              className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]"
              style={{ backgroundColor: '#60a5fa' }}
            />
          </div>
          <div className="relative z-10">
            <h2 
              className="text-3xl md:text-4xl font-black mb-6"
              style={{ color: '#0f172a' }}
            >
              Ready to Design Your Own?
            </h2>
            <p 
              className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#475569' }}
            >
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
                className="gap-2 h-14 px-8 text-lg font-bold"
                style={{
                  borderColor: '#cbd5e1',
                  color: '#0f172a',
                  backgroundColor: 'transparent'
                }}
              >
                Home <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CaseStudiesPage
