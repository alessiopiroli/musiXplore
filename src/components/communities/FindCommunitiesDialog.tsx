
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Community } from "@/lib/mock-data";
import { PlusCircle } from "lucide-react";

interface FindCommunitiesDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  unjoinedCommunities: Community[];
  onJoinCommunity: (community: Community) => void;
}

export function FindCommunitiesDialog({
  isOpen,
  onOpenChange,
  unjoinedCommunities,
  onJoinCommunity,
}: FindCommunitiesDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Discover Communities</DialogTitle>
          <DialogDescription>
            Join new communities to explore different genres.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] my-4">
          <div className="space-y-3 pr-4">
            {unjoinedCommunities.length > 0 ? (
              unjoinedCommunities.map((community) => (
                <div
                  key={community.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <p className="font-semibold">{community.name}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onJoinCommunity(community)}
                    className="text-primary hover:text-primary"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Join
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                You've joined all available communities!
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
