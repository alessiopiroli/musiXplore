
"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, PlayCircle, Rewind } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "./StarRating";
import type { Song, User } from "@/lib/mock-data";
import { RecommendToFriendsDialog } from "./RecommendToFriendsDialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ExpandedRatings } from "./ExpandedRatings";


interface SongCardProps {
  song: Song;
  recommender?: User;
}

export function SongCard({ song, recommender }: SongCardProps) {
  const [userRating, setUserRating] = useState(0);
  const [isRecommendDialogOpen, setIsRecommendDialogOpen] = useState(false);
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [showRatings, setShowRatings] = useState(false);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    setShowRatings(true);
  }

  const handleRecommend = (selectedFriends: User[]) => {
    setIsRecommendDialogOpen(false);
    toast({
        title: "Recommendation Sent!",
        description: `You recommended '${song.title}' to ${selectedFriends.length} friend(s).`
    })
  }
  
  const handleLike = () => {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      
      const savedSongs = JSON.parse(localStorage.getItem('savedSongs') || '[]') as Song[];
      if (newLikedState) {
          localStorage.setItem('savedSongs', JSON.stringify([...savedSongs, song]));
          toast({
              title: "Saved to Library",
              description: `'${song.title}' has been added to your library.`,
          });
      } else {
          localStorage.setItem('savedSongs', JSON.stringify(savedSongs.filter(s => s.id !== song.id)));
          toast({
              title: "Removed from Library",
              description: `'${song.title}' has been removed from your library.`,
              variant: "destructive"
          });
      }
  }

  return (
    <>
    <div className="w-full">
        <Card className="w-full overflow-hidden rounded-xl shadow-lg">
        <CardContent className="p-0 flex">
            <div className="relative w-[200px] flex-shrink-0">
                <Image
                    src={song.albumArt}
                    alt={`Album art for ${song.title}`}
                    width={400}
                    height={400}
                    className="aspect-square w-full h-full object-cover"
                    data-ai-hint="album cover"
                />
                 {recommender && (
                    <div className="absolute top-2 left-2">
                        <div className="flex items-center gap-2 rounded-full bg-black/50 p-1 pr-3 text-primary-foreground backdrop-blur-sm max-w-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={recommender.avatar} alt={recommender.name} />
                                <AvatarFallback>{recommender.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                                <p className="text-xs font-semibold truncate">{recommender.name}</p>
                                <Badge variant="secondary" className="text-xs truncate">{song.genre} Expert</Badge>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <Badge variant="secondary" className="mb-1">{song.genre}</Badge>
                    <h2 className="text-2xl font-bold font-headline">{song.title}</h2>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>

                <div className="flex items-center justify-around text-muted-foreground my-4">
                    <Button variant="ghost" size="icon"><Rewind className="h-6 w-6" /></Button>
                    <Button variant="ghost" size="icon"><PlayCircle className="h-10 w-10 text-primary" /></Button>
                    <Button variant="ghost" size="icon" onClick={handleLike}>
                        <Heart className={cn("h-6 w-6", isLiked && "fill-red-500 text-red-500")} />
                    </Button>
                </div>
                
                <div className="space-y-3">
                    <Separator />
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground text-center">
                            Rate this song
                        </p>
                        <StarRating onRatingChange={handleRating} initialRating={userRating} />
                    </div>
                    <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setIsRecommendDialogOpen(true)}
                    >
                        Recommend to Friends
                    </Button>
                </div>
            </div>
        </CardContent>
        </Card>
        {showRatings && <ExpandedRatings friendRatings={song.friendRatings} communityRatings={song.communityRatings} />}
    </div>
    <RecommendToFriendsDialog 
        isOpen={isRecommendDialogOpen}
        onOpenChange={setIsRecommendDialogOpen}
        song={song}
        onRecommend={handleRecommend}
    />
    </>
  );
}

    