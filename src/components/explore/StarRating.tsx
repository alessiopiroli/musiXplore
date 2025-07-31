
"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  count?: number
  initialRating?: number
  onRatingChange?: (rating: number) => void
}

const HalfStar = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
        <path d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" fill="transparent" />
        <path d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
    </svg>
);


export function StarRating({ count = 5, initialRating = 0, onRatingChange }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleRating = (rate: number) => {
    setRating(rate)
    if (onRatingChange) {
      onRatingChange(rate)
    }
  }

  return (
    <div className="flex items-center space-x-0">
      {[...Array(count)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <button
            key={index}
            type="button"
            className="relative"
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRating(ratingValue)}
            aria-label={`Rate ${ratingValue} stars`}
          >
             <div className="flex">
                <div 
                    className="w-3 h-6 cursor-pointer" 
                    onMouseEnter={() => setHover(ratingValue - 0.5)}
                    onClick={(e) => { e.stopPropagation(); handleRating(ratingValue - 0.5); }}
                />
                <div 
                    className="w-3 h-6 cursor-pointer" 
                    onMouseEnter={() => setHover(ratingValue)}
                    onClick={(e) => { e.stopPropagation(); handleRating(ratingValue); }}
                />
            </div>
            <div className="absolute top-0 left-0 pointer-events-none">
            {ratingValue <= (hover || rating) ? (
                 <Star
                    className={cn(
                        'h-6 w-6 text-yellow-400 fill-yellow-400'
                    )}
                 />
            ) : ratingValue - 0.5 === (hover || rating) ? (
                 <div className="relative h-6 w-6">
                    <Star className="h-6 w-6 text-yellow-400" />
                    <div className="absolute top-0 left-0 h-6 w-3 overflow-hidden">
                        <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    </div>
                </div>
            ) : (
                <Star
                    className={cn(
                        'h-6 w-6 text-muted-foreground'
                    )}
                />
            )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
