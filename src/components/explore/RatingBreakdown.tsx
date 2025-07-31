"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, Users, User } from "lucide-react"
import type { FriendRating, CommunityRating } from "@/lib/mock-data"
import { StarRatingDisplay } from "./StarRatingDisplay"

interface ExpandedRatingsProps {
  friendRatings: FriendRating[];
  communityRatings: CommunityRating;
}

export function ExpandedRatings({ friendRatings, communityRatings }: ExpandedRatingsProps) {

  const calculateFriendAverage = () => {
    if (friendRatings.length === 0) return 0;
    const total = friendRatings.reduce((acc, r) => acc + r.rating, 0);
    return total / friendRatings.length;
  }

  const calculateCommunityAverage = () => {
    const { totalRatings, fiveStars, fourStars, threeStars, twoStars, oneStar } = communityRatings;
    if (totalRatings === 0) return 0;
    const weightedTotal = (fiveStars * 5) + (fourStars * 4) + (threeStars * 3) + (twoStars * 2) + (oneStar * 1);
    return weightedTotal / totalRatings;
  }
  
  const friendAverage = calculateFriendAverage();
  const communityAverage = calculateCommunityAverage();

  return (
    <Card className="rounded-t-none border-t-0 -mt-2">
        <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Friends' Average</h3>
                </div>
                <div className="flex items-center gap-2">
                    <StarRatingDisplay rating={friendAverage} />
                    <span className="font-bold text-sm w-8 text-right">{friendAverage.toFixed(1)}</span>
                </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Community Average</h3>
                </div>
                <div className="flex items-center gap-2">
                    <StarRatingDisplay rating={communityAverage} />
                    <span className="font-bold text-sm w-8 text-right">{communityAverage.toFixed(1)}</span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}