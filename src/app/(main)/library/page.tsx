
"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, PlayCircle, Heart } from "lucide-react";
import { type Song } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function SavedSongCard({ song, onUnlike }: { song: Song, onUnlike: (songId: string) => void }) {
  return (
     <Card className="w-full overflow-hidden rounded-xl shadow-lg">
      <CardContent className="p-0 flex">
        <div className="relative w-1/3 min-w-[150px] max-w-[200px]">
          <Image
            src={song.albumArt}
            alt={`Album art for ${song.title}`}
            width={200}
            height={200}
            className="aspect-square w-full h-full object-cover"
            data-ai-hint="album cover"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <Badge variant="secondary" className="mb-1">
              {song.genre}
            </Badge>
            <h2 className="text-2xl font-bold font-headline">{song.title}</h2>
            <p className="text-sm text-muted-foreground">
              {song.artist} - <span className="italic">{song.album}</span>
            </p>
          </div>
          <div className="flex items-center justify-end gap-2 text-muted-foreground mt-4">
            <Button variant="ghost" size="icon">
              <PlayCircle className="h-10 w-10 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onUnlike(song.id)}>
              <Heart className="h-6 w-6 fill-red-500 text-red-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type SortKey = 'date' | 'genre' | 'artist' | 'album';


export default function LibraryPage() {
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('date');
  let lastGenre: string | null = null;

  useEffect(() => {
    const songsFromStorage = JSON.parse(localStorage.getItem('savedSongs') || '[]') as Song[];
    setSavedSongs(songsFromStorage);
  }, []);

  const handleUnlike = (songId: string) => {
    const updatedSongs = savedSongs.filter(s => s.id !== songId);
    setSavedSongs(updatedSongs);
    localStorage.setItem('savedSongs', JSON.stringify(updatedSongs));
  };

  const sortedSongs = useMemo(() => {
    const sorted = [...savedSongs];
    if (sortKey === 'date') {
      return sorted.reverse(); // Assuming newer songs are added to the end
    }
    sorted.sort((a, b) => {
        if (a[sortKey]! < b[sortKey]!) return -1;
        if (a[sortKey]! > b[sortKey]!) return 1;
        return 0;
    });
    return sorted;
  }, [savedSongs, sortKey]);

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold font-headline mb-4">Your Library</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
            variant={sortKey === 'date' ? 'default' : 'outline'}
            onClick={() => setSortKey('date')}
        >
            Recents
        </Button>
        <Button
            variant={sortKey === 'genre' ? 'default' : 'outline'}
            onClick={() => setSortKey('genre')}
        >
            Genre
        </Button>
        <Button
            variant={sortKey === 'artist' ? 'default' : 'outline'}
            onClick={() => setSortKey('artist')}
        >
            Artist
        </Button>
        <Button
            variant={sortKey === 'album' ? 'default' : 'outline'}
            onClick={() => setSortKey('album')}
        >
            Album
        </Button>
      </div>
      
      {sortedSongs.length > 0 ? (
        <div className="space-y-4">
          {sortedSongs.map(song => {
            const showHeader = sortKey === 'genre' && song.genre !== lastGenre;
            if (showHeader) {
              lastGenre = song.genre;
            }
            return (
              <Fragment key={song.id}>
                {showHeader && (
                    <div className="pt-4 pb-2">
                        <h2 className="text-xl font-bold tracking-tight">{song.genre}</h2>
                    </div>
                )}
                <SavedSongCard song={song} onUnlike={handleUnlike} />
              </Fragment>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
          <Music className="h-16 w-16 mb-4" />
          <h2 className="text-xl font-semibold">Your library is empty</h2>
          <p>Save songs by tapping the heart icon.</p>
        </div>
      )}
    </div>
  );
}
