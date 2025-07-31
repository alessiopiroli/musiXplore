
"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { LeaderboardCard } from '@/components/leaderboards/LeaderboardCard';
import { LeaderboardDisplay } from '@/components/leaderboards/LeaderboardDisplay';
import { leaderboardData, currentUser } from '@/lib/mock-data';
import { predictLeaderboardType } from '@/ai/flows/adaptive-leaderboard-type';
import { Skeleton } from '@/components/ui/skeleton';

type LeaderboardType = 'Absolute' | 'Relative';

export default function LeaderboardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [joinedCommunityNames, setJoinedCommunityNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchLeaderboardType = async () => {
      try {
        const storedPlayerType = localStorage.getItem('playerType') as 'Socializer' | 'Achiever' | 'Explorer' | 'Killer' | null;
        const playerType = storedPlayerType || 'Explorer'; // Default to Explorer
        
        const result = await predictLeaderboardType({
          playerType: playerType,
          engagementLevel: 'Medium', // Mock engagement level
        });
        setLeaderboardType(result.leaderboardType);
        setReasoning(result.reasoning);
      } catch (error) {
        console.error("Failed to predict leaderboard type:", error);
        setLeaderboardType('Relative'); // Fallback on error
      }
    };
    
    const savedCommunities = localStorage.getItem('joinedCommunities');
    if (savedCommunities) {
      const communityIds = JSON.parse(savedCommunities) as string[];
      // Assuming community IDs match leaderboard keys (e.g., 'comm-1' -> 'RAP')
      // This is a big assumption. A better mapping might be needed.
      // For now, we'll map based on what's in mock-data.
      const idToName: {[key: string]: string} = {
        'comm-1': 'RAP',
        'comm-2': 'POP',
        'comm-3': 'JAZZ',
        'comm-4': 'ELECTRONIC',
        'comm-5': 'INDIE',
        'comm-6': 'ROCK',
      }
      setJoinedCommunityNames(communityIds.map(id => idToName[id]).filter(Boolean));
    } else {
        // Default if nothing is in local storage
        setJoinedCommunityNames(['RAP', 'POP']);
    }


    fetchLeaderboardType();
  }, []);

  const handleViewLeaderboard = (genre: string) => {
    setSelectedGenre(genre);
    setIsModalOpen(true);
  };
  
  const getRelativeData = (data: typeof leaderboardData.RAP) => {
    const userIndex = data.findIndex(u => u.user === currentUser.name);
    if (userIndex === -1) return data;
    
    const start = Math.max(0, userIndex - 2);
    const end = Math.min(data.length, userIndex + 3);
    
    return data.slice(start, end).map(d => ({ ...d, previousRank: d.rank + Math.floor(Math.random() * 3) -1 }));
  }

  const displayedData = leaderboardType === 'Relative' 
    ? getRelativeData(leaderboardData[selectedGenre as keyof typeof leaderboardData] || [])
    : (leaderboardData[selectedGenre as keyof typeof leaderboardData] || []);

  const filteredLeaderboardData = Object.entries(leaderboardData)
    .filter(([genre]) => joinedCommunityNames.includes(genre))
    .sort(([genreA], [genreB]) => {
      return joinedCommunityNames.indexOf(genreA) - joinedCommunityNames.indexOf(genreB);
    });

  if (leaderboardType === null) {
      return (
        <div className="container mx-auto max-w-4xl p-4 space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-6 pt-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-64 w-full rounded-xl" />
            </div>
        </div>
      )
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold font-headline">Leaderboards</h1>
      <p className="text-muted-foreground mt-1">
        Showing <span className="font-semibold text-primary">{leaderboardType}</span> leaderboards based on your profile.
      </p>

      <div className="mt-6 space-y-6">
        {filteredLeaderboardData.length > 0 ? (
            filteredLeaderboardData.map(([genre, data]) => (
            <LeaderboardCard
                key={genre}
                genre={genre}
                data={data}
                onViewLeaderboard={() => handleViewLeaderboard(genre)}
            />
            ))
        ) : (
            <div className="text-center text-muted-foreground py-10">
                <p>No leaderboards to show.</p>
                <p>Join a community to see your rank!</p>
            </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{selectedGenre} Leaderboard</DialogTitle>
            <DialogDescription>
              {leaderboardType} ranking for this genre.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <LeaderboardDisplay data={displayedData} isRelative={leaderboardType === 'Relative'} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
