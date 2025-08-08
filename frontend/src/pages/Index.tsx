import Header from "@/components/layout/Header"
import HeroSection from "@/components/sections/HeroSection"
import MessageComposer from "@/components/dashboard/MessageComposer"
import ScheduledMessages from "@/components/dashboard/ScheduledMessages"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* Dashboard Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Message Dashboard</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Compose, schedule, and manage your Slack messages with our intuitive interface.
                Connect your workspace to get started.
              </p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
              <MessageComposer />
              <ScheduledMessages />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
