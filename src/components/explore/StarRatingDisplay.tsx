
"use client"

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingDisplayProps {
  rating: number
  count?: number
}

export function StarRatingDisplay({ rating, count = 5 }: StarRatingDisplayProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = count - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      ))}
      {halfStar && (
         <div className="relative h-5 w-5">
            <Star className="h-5 w-5 text-yellow-400" />
            <div className="absolute top-0 left-0 h-5 w-2.5 overflow-hidden">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>
        </div>
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground" />
      ))}
    </div>
  )
}
