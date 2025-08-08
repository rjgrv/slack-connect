import { useState } from "react"
import { Button } from "@/components/ui/button-enhanced"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Send, Plus } from "lucide-react"

const MessageComposer = () => {
  const [message, setMessage] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
          Compose Message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Channel Selection */}
        <div className="space-y-2">
          <Label htmlFor="channel" className="text-sm font-medium">
            Select Channel
          </Label>
          <Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a Slack channel..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general"># general</SelectItem>
              <SelectItem value="random"># random</SelectItem>
              <SelectItem value="dev-team"># dev-team</SelectItem>
              <SelectItem value="announcements"># announcements</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message Content */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">
            Message Content
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <div className="text-xs text-muted-foreground text-right">
            {message.length}/4000 characters
          </div>
        </div>

        {/* Schedule Options */}
        <div className="border-t pt-4">
          <Label className="text-sm font-medium mb-3 block">
            Schedule Options (Optional)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            variant="hero" 
            className="flex-1"
            disabled={!message || !selectedChannel}
          >
            <Send className="w-4 h-4" />
            Send Now
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1"
            disabled={!message || !selectedChannel || !scheduleDate || !scheduleTime}
          >
            <Plus className="w-4 h-4" />
            Schedule Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default MessageComposer