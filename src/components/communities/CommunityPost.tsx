
"use client";

import Image from "next/image"
import { Heart, MessageCircle, Star, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";
import type { Song, User, Comment } from "@/lib/mock-data"
import { currentUser } from "@/lib/mock-data"
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface CommunityPostProps {
  post: {
    id: string;
    user: User
    song: Song
    text: string
    rating: number
    comments: Comment[]
    likes: number
  }
}

export function CommunityPost({ post }: CommunityPostProps) {
  const { user, song, text, rating } = post
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");


  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentObject: Comment = {
        id: `comment-${Date.now()}`,
        user: currentUser,
        text: newComment,
    };

    setComments([newCommentObject, ...comments]);
    setNewComment("");
  }

  return (
    <Sheet>
        <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
            <CardTitle className="text-base">{user.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">{song.genre} Expert</Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>{text}</p>
            <div className="flex gap-4 rounded-lg border p-3">
            <Image
                src={song.albumArt}
                alt={`Album art for ${song.title}`}
                width={80}
                height={80}
                className="aspect-square w-20 h-20 rounded-md object-cover"
                data-ai-hint={`${song.genre} ${song.artist}`}
            />
            <div className="flex flex-col justify-center">
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
                <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                    />
                ))}
                </div>
            </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-start gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground" onClick={handleLike}>
                <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} /> 
                <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </Button>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{comments.length} Comments</span>
                </Button>
            </SheetTrigger>
        </CardFooter>
        </Card>
        <SheetContent className="flex flex-col">
            <SheetHeader>
            <SheetTitle>Comments</SheetTitle>
            <SheetDescription>
                Join the conversation about {`'${song.title}'`}.
            </SheetDescription>
            </SheetHeader>
            <Separator className="my-4" />
            <ScrollArea className="flex-grow h-[calc(100%-200px)]">
                <div className="space-y-4 pr-4">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">{comment.user.name}</p>
                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
                    )}
                </div>
            </ScrollArea>
            <Separator className="my-4" />
            <form onSubmit={handleCommentSubmit} className="flex items-start gap-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                    <Textarea 
                        placeholder="Add a comment..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={2}
                    />
                     <Button type="submit" size="sm">
                        <Send className="mr-2 h-4 w-4" /> Post
                    </Button>
                </div>
            </form>
        </SheetContent>
    </Sheet>
  )
}
