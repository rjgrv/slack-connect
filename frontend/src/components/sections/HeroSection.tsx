import { Button } from "@/components/ui/button-enhanced"
import { ArrowRight, Zap, Shield, Clock } from "lucide-react"
import heroBackground from "@/assets/hero-background.jpg"

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-600/30" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Seamless Slack
            </span>
            <br />
            <span className="text-foreground">
              Integration
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Send instant messages, schedule deliveries, and manage your Slack workspace 
            with enterprise-grade security and reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" className="animate-pulse-glow">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              View Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Send messages instantly to any Slack channel with real-time delivery confirmation
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
              <p className="text-muted-foreground text-sm">
                Schedule messages for optimal delivery times with timezone awareness
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure OAuth</h3>
              <p className="text-muted-foreground text-sm">
                Enterprise-grade security with automatic token refresh and encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection