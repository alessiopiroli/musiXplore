import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser, friends } from "@/lib/mock-data"
import { Crown } from "lucide-react"

type LeaderboardEntry = {
  rank: number
  user: string
  exp: number
}

interface LeaderboardCardProps {
  genre: string
  data: LeaderboardEntry[]
  onViewLeaderboard: () => void
}

const allUsers = [currentUser, ...friends, {id: 'user-5', name: 'MC_Verse', avatar: 'https://placehold.co/100x100', playerType: 'Achiever'}, {id: 'user-6', name: 'RhymeMaster', avatar: 'https://placehold.co/100x100', playerType: 'Killer'}]

const getUserAvatar = (username: string) => {
    return allUsers.find(u => u.name === username)?.avatar || 'https://placehold.co/100x100'
}

export function LeaderboardCard({ genre, data, onViewLeaderboard }: LeaderboardCardProps) {
  const topThree = data.slice(0, 3)
  const userRank = data.find((entry) => entry.user === currentUser.name)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{genre}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {topThree.map((entry) => (
            <div key={entry.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg w-8 text-center">{entry.rank}</span>
                <Avatar>
                  <AvatarImage src={getUserAvatar(entry.user)} />
                  <AvatarFallback>{entry.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{entry.user}</span>
                {entry.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
              </div>
              <span className="font-mono text-sm text-muted-foreground">{entry.exp} EXP</span>
            </div>
          ))}
        </div>
        {userRank && (
          <>
            <div className="flex items-center justify-center text-muted-foreground">...</div>
            <div className="flex items-center justify-between rounded-md bg-primary/10 p-3">
               <div className="flex items-center gap-3">
                <span className="font-bold text-lg w-10 text-center">{userRank.rank}</span>
                <Avatar>
                  <AvatarImage src={getUserAvatar(userRank.user)} />
                  <AvatarFallback>{userRank.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-primary">{userRank.user} (You)</span>
              </div>
              <span className="font-mono text-sm font-semibold text-primary">{userRank.exp} EXP</span>
            </div>
          </>
        )}
        <Button onClick={onViewLeaderboard} className="w-full">View Leaderboard</Button>
      </CardContent>
    </Card>
  )
}
