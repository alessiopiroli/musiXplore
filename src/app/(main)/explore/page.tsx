
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SongCard } from "@/components/explore/SongCard"
import { songs, friends } from "@/lib/mock-data"

export default function ExplorePage() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold font-headline mb-4">Explore Music</h1>
      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="genres">Our Genres</TabsTrigger>
        </TabsList>
        <TabsContent value="friends" className="mt-4 flex flex-col items-center gap-6">
           <SongCard song={songs[1]} recommender={friends[0]} />
           <SongCard song={songs[3]} recommender={friends[1]} />
        </TabsContent>
        <TabsContent value="community" className="mt-4 flex flex-col items-center gap-6">
           <SongCard song={songs[2]} recommender={friends[2]} />
           <SongCard song={songs[0]} />
        </TabsContent>
        <TabsContent value="genres" className="mt-4 flex flex-col items-center gap-6">
           <SongCard song={songs[4]} />
           <SongCard song={songs[5]} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
