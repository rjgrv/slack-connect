import { Button } from "@/components/ui/button-enhanced"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Hash, Trash2, Edit, MessageSquare } from "lucide-react"

interface ScheduledMessage {
  id: string
  channel: string
  message: string
  scheduledDate: string
  scheduledTime: string
  status: "pending" | "sent" | "failed"
}

const mockScheduledMessages: ScheduledMessage[] = [
  {
    id: "1",
    channel: "general",
    message: "Good morning team! Don't forget about our standup meeting at 10 AM.",
    scheduledDate: "2024-01-15",
    scheduledTime: "09:00",
    status: "pending"
  },
  {
    id: "2", 
    channel: "dev-team",
    message: "Reminder: Code review session scheduled for this afternoon.",
    scheduledDate: "2024-01-15",
    scheduledTime: "14:30",
    status: "pending"
  },
  {
    id: "3",
    channel: "announcements",
    message: "Weekly team lunch is happening tomorrow!",
    scheduledDate: "2024-01-14",
    scheduledTime: "12:00",
    status: "sent"
  }
]

const ScheduledMessages = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground"
      case "sent":
        return "bg-success text-success-foreground"
      case "failed":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="w-full bg-gradient-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          Scheduled Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockScheduledMessages.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No scheduled messages</h3>
            <p className="text-muted-foreground">
              Schedule your first message to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockScheduledMessages.map((msg) => (
              <div
                key={msg.id}
                className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-card/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{msg.channel}</span>
                    <Badge className={getStatusColor(msg.status)}>
                      {msg.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {msg.message}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(msg.scheduledDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {msg.scheduledTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ScheduledMessages