
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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { friends, type User, type Song } from "@/lib/mock-data";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface RecommendToFriendsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  song: Song;
  onRecommend: (selectedFriends: User[]) => void;
}

export function RecommendToFriendsDialog({
  isOpen,
  onOpenChange,
  song,
  onRecommend,
}: RecommendToFriendsDialogProps) {
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);

  const handleFriendSelect = (friend: User, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFriends((prev) => [...prev, friend]);
    } else {
      setSelectedFriends((prev) => prev.filter((f) => f.id !== friend.id));
    }
  };

  const handleSubmit = () => {
    onRecommend(selectedFriends);
    setSelectedFriends([]); // Reset after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
            setSelectedFriends([]); // Reset on close
        }
        onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Recommend '{song.title}'</DialogTitle>
          <DialogDescription>
            Select the friends you want to share this song with.
          </DialogDescription>
        </DialogHeader>

        <Separator />
        
        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-4 my-4">
            {friends.map((friend) => (
              <Label
                key={friend.id}
                htmlFor={`friend-${friend.id}`}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
              >
                <Checkbox
                  id={`friend-${friend.id}`}
                  onCheckedChange={(checked) => handleFriendSelect(friend, !!checked)}
                  checked={selectedFriends.some(f => f.id === friend.id)}
                />
                <Avatar className="h-10 w-10">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">{friend.playerType}</p>
                </div>
              </Label>
            ))}
          </div>
        </ScrollArea>

        <Separator />

        <DialogFooter className="mt-4">
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={selectedFriends.length === 0}
          >
            Send Recommendation ({selectedFriends.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

