
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Clock, Star, Users, Settings, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/profile/StatCard"
import { BadgeGrid } from "@/components/profile/BadgeGrid"
import { currentUser, profileStats } from "@/lib/mock-data"
import { generateAvatar } from "@/ai/flows/generate-avatar-flow";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const getAvatar = async () => {
      try {
        const storedAvatar = localStorage.getItem('userAvatar');
        if (storedAvatar) {
          setAvatarUrl(storedAvatar);
          return;
        }
        
        const result = await generateAvatar({ playerType: currentUser.playerType });
        setAvatarUrl(result.imageDataUri);
        localStorage.setItem('userAvatar', result.imageDataUri);
      } catch (error) {
        console.error("Failed to generate avatar:", error);
        // Fallback to the original placeholder if generation fails
        setAvatarUrl(currentUser.avatar);
      }
    };
    getAvatar();
  }, []);

  if (!mounted) {
      return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-primary/20 h-24 relative">
            <div className="absolute top-4 right-4 flex gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={toggleTheme}>
                                <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Toggle Theme</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon">
                                <Link href="/profile/settings">
                                    <Settings className="h-6 w-6" />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
        <CardContent className="flex flex-col items-center text-center -mt-16 p-6">
          <Avatar className="h-24 w-24 border-4 border-background">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={currentUser.name} />
            ) : (
              <Skeleton className="h-full w-full rounded-full" />
            )}
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold font-headline mt-4">{currentUser.name}</h1>
          <p className="text-muted-foreground">{currentUser.playerType}</p>
          <Button variant="outline" className="mt-4">Edit Profile</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-4">
                <StatCard title="Recommendations Liked" value={profileStats.recommendationsLiked} icon={Heart} />
                <StatCard title="Listening Time" value={profileStats.listeningTime} icon={Clock} />
                <StatCard title="Songs Rated" value={profileStats.songsRated} icon={Star} />
                <StatCard title="Communities Joined" value={profileStats.communitiesJoined} icon={Users} />
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent>
            <BadgeGrid />
        </CardContent>
      </Card>
    </div>
  )
}
