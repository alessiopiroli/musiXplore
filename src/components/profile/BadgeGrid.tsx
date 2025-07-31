import { Award, Music, Users, History } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { badges as badgeData } from "@/lib/mock-data"

const iconMap: { [key: string]: React.ElementType } = {
  Rap: Music,
  Pop: Music,
  Jazz: Music,
  Social: Users,
  General: History,
};


export function BadgeGrid() {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {badgeData.map((badge) => {
          const Icon = iconMap[badge.genre] || Award
          return (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors">
                  <div className="p-3 rounded-full bg-muted">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-center">{badge.name}</Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{badge.description}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
