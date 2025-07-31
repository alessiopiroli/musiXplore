import { Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ListeningStreak() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Listening Streak</CardTitle>
        <Flame className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">12 days</div>
        <p className="text-xs text-muted-foreground">Keep it going!</p>
      </CardContent>
    </Card>
  )
}
