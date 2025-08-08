import { Button } from "@/components/ui/button-enhanced"
import { MessageSquare, Calendar, Settings, User } from "lucide-react"
import slackIcon from "@/assets/slack-icon.jpg"
import { connectSlack } from "@/lib/utils"

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={slackIcon} alt="Slack Connect" className="w-8 h-8 rounded-lg" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Slack Connect
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#messages" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Messages
            </a>
            <a href="#scheduled" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Scheduled
            </a>
            <a href="#settings" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Button variant="slack" size="sm" onClick={connectSlack}>
              Connect Slack
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header