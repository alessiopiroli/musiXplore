
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { CommunityPost } from "@/components/communities/CommunityPost"
import { CreatePostDialog } from "@/components/communities/CreatePostDialog";
import { FindCommunitiesDialog } from "@/components/communities/FindCommunitiesDialog";
import { allCommunities, currentUser } from "@/lib/mock-data"
import type { Community, Post, Comment } from "@/lib/mock-data";


export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isFindOpen, setIsFindOpen] = useState(false);

  useEffect(() => {
    const savedCommunities = localStorage.getItem('joinedCommunities');
    if (savedCommunities) {
      const communityIds = JSON.parse(savedCommunities) as string[];
      const userCommunities = allCommunities.filter(c => communityIds.includes(c.id));
      setCommunities(userCommunities);
    } else {
      // Default to first two communities if nothing is saved
      const defaultCommunities = allCommunities.slice(0, 2);
      setCommunities(defaultCommunities);
      localStorage.setItem('joinedCommunities', JSON.stringify(defaultCommunities.map(c => c.id)));
    }
  }, []);

  const updateJoinedCommunities = (updatedCommunities: Community[]) => {
    setCommunities(updatedCommunities);
    localStorage.setItem('joinedCommunities', JSON.stringify(updatedCommunities.map(c => c.id)));
  }

  const handleCreatePost = (postData: {
    communityId: string;
    songTitle: string;
    artist: string;
    rating: number;
    text: string;
  }) => {
    const newPost: Post = {
        id: `post-${Date.now()}`,
        user: currentUser,
        song: {
            id: `song-${Date.now()}`,
            title: postData.songTitle,
            artist: postData.artist,
            albumArt: 'https://placehold.co/400x400.png',
            genre: communities.find(c => c.id === postData.communityId)?.name || 'Misc'
        },
        text: postData.text,
        rating: postData.rating,
        comments: [] as Comment[],
        likes: 0
    };

    const updatedCommunities = communities.map(community => {
        if (community.id === postData.communityId) {
            // Add the new post to the top of the feed
            return {
                ...community,
                feed: [newPost, ...community.feed]
            };
        }
        return community;
    });
    // Note: This only updates state for this page, not mock-data.ts
    setCommunities(updatedCommunities);
    setIsCreatePostOpen(false);
  };
  
  const handleJoinCommunity = (community: Community) => {
    const updatedCommunities = [community, ...communities];
    updateJoinedCommunities(updatedCommunities);
    setIsFindOpen(false);
  };

  const unjoinedCommunities = allCommunities.filter(
    (ac) => !communities.some((c) => c.id === ac.id)
  );

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold font-headline">Communities</h1>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsFindOpen(true)}>Find</Button>
            <Button onClick={() => setIsCreatePostOpen(true)}>Post!</Button>
        </div>
      </div>

       <CreatePostDialog
        isOpen={isCreatePostOpen}
        onOpenChange={setIsCreatePostOpen}
        communities={communities}
        onCreatePost={handleCreatePost}
      />
      
      <FindCommunitiesDialog
        isOpen={isFindOpen}
        onOpenChange={setIsFindOpen}
        unjoinedCommunities={unjoinedCommunities}
        onJoinCommunity={handleJoinCommunity}
      />

      <div className="space-y-8">
        {communities.map((community) => (
          <div key={community.id}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold font-headline">{community.name}</h2>
                <Button variant="link" className="text-primary">Take me there!</Button>
            </div>
            <div className="space-y-4">
              {community.feed.map((post) => (
                <CommunityPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
