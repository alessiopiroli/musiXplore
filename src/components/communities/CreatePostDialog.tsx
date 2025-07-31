
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarRating } from "@/components/explore/StarRating";
import type { Community } from "@/lib/mock-data";

interface CreatePostDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  communities: Community[];
  onCreatePost: (postData: {
    communityId: string;
    songTitle: string;
    artist: string;
    rating: number;
    text: string;
  }) => void;
}

export function CreatePostDialog({
  isOpen,
  onOpenChange,
  communities,
  onCreatePost,
}: CreatePostDialogProps) {
  const [communityId, setCommunityId] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!communityId || !songTitle || !artist || rating === 0 || !text) {
      setError("Please fill out all fields.");
      return;
    }
    onCreatePost({ communityId, songTitle, artist, rating, text });
    // Reset form
    setCommunityId("");
    setSongTitle("");
    setArtist("");
    setRating(0);
    setText("");
    setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Create a New Post</DialogTitle>
          <DialogDescription>
            Share a song with one of your communities.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="community" className="text-right">
              Community
            </Label>
            <Select onValueChange={setCommunityId} value={communityId}>
              <SelectTrigger id="community" className="col-span-3">
                <SelectValue placeholder="Select a community" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community) => (
                  <SelectItem key={community.id} value={community.id}>
                    {community.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="song-title" className="text-right">
              Song Title
            </Label>
            <Input
              id="song-title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artist" className="text-right">
              Artist
            </Label>
            <Input
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <div className="col-span-3">
              <StarRating initialRating={rating} onRatingChange={setRating} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="comment" className="text-right pt-2">
              Comment
            </Label>
            <Textarea
              id="comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="col-span-3"
              placeholder="Why are you recommending this song?"
            />
          </div>
          {error && <p className="col-span-4 text-center text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Post It!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
