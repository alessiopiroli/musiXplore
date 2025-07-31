"use client";

import { useState } from 'react';
import { Crown, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser, friends } from '@/lib/mock-data';

type LeaderboardEntry = {
  rank: number;
  user: string;
  exp: number;
  previousRank?: number;
};

interface LeaderboardDisplayProps {
  data: LeaderboardEntry[];
  isRelative?: boolean;
}

const allUsers = [
    currentUser, 
    ...friends, 
    {id: 'user-5', name: 'MC_Verse', avatar: 'https://placehold.co/100x100', playerType: 'Achiever'}, 
    {id: 'user-6', name: 'RhymeMaster', avatar: 'https://placehold.co/100x100', playerType: 'Killer'},
    {id: 'user-7', name: 'PopPrincess', avatar: 'https://placehold.co/100x100', playerType: 'Achiever'},
    {id: 'user-8', name: 'Starlight', avatar: 'https://placehold.co/100x100', playerType: 'Socializer'},
    {id: 'user-9', name: 'VibeQueen', avatar: 'https://placehold.co/100x100', playerType: 'Explorer'},
    {id: 'user-10', name: 'SaxMaster', avatar: 'https://placehold.co/100x100', playerType: 'Achiever'},
    {id: 'user-11', name: 'CoolCat', avatar: 'https://placehold.co/100x100', playerType: 'Explorer'},
    {id: 'user-12', name: 'GrooveSlinger', avatar: 'https://placehold.co/100x100', playerType: 'Socializer'},
];

const getUserAvatar = (username: string) => {
    return allUsers.find(u => u.name === username)?.avatar || 'https://placehold.co/100x100';
};

const getRankChangeIcon = (current: number, previous?: number) => {
    if (previous === undefined || current === previous) {
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
    if (current < previous) {
        return <ArrowUp className="h-4 w-4 text-green-500" />;
    }
    return <ArrowDown className="h-4 w-4 text-red-500" />;
};

export function LeaderboardDisplay({ data, isRelative = false }: LeaderboardDisplayProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {isRelative && <TableHead className="w-[50px]">Change</TableHead>}
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">EXP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.user} className={entry.user === currentUser.name ? 'bg-primary/10' : ''}>
            {isRelative && <TableCell>{getRankChangeIcon(entry.rank, entry.previousRank)}</TableCell>}
            <TableCell className="font-bold text-lg">{entry.rank}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={getUserAvatar(entry.user)} />
                  <AvatarFallback>{entry.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{entry.user}{entry.user === currentUser.name ? ' (You)' : ''}</span>
                {entry.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
              </div>
            </TableCell>
            <TableCell className="text-right font-mono">{entry.exp.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
