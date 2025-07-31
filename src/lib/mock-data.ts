
export type User = {
  id: string;
  name: string;
  avatar: string;
  playerType: 'Socializer' | 'Achiever' | 'Explorer' | 'Killer';
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  genre: string;
  friendRatings: FriendRating[];
  communityRatings: CommunityRating;
};

export type Badge = {
  id: string;
  name: string;
  genre: string;
  description: string;
};

export type Comment = {
    id: string;
    user: User;
    text: string;
}

export type Post = {
    id: string;
    user: User;
    song: Song;
    text: string;
    rating: number;
    comments: Comment[];
    likes: number;
};

export type Community = {
    id: string;
    name: string;
    feed: Post[];
};

export type FriendRating = {
    friend: User;
    rating: number;
}

export type CommunityRating = {
    totalRatings: number;
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
}


export const currentUser: User = {
  id: 'user-1',
  name: 'MusicExplorer',
  avatar: 'https://placehold.co/100x100.png',
  playerType: 'Explorer',
};

export const friends: User[] = [
  { id: 'friend-1', name: 'alligatorTamer_7', avatar: 'https://placehold.co/100x100.png', playerType: 'Achiever' },
  { id: 'friend-2', name: 'BassNomad', avatar: 'https://placehold.co/100x100.png', playerType: 'Socializer' },
  { id: 'friend-3', name: 'TempoTitan', avatar: 'https://placehold.co/100x100.png', playerType: 'Killer' },
];

export const songs: Song[] = [
  { 
    id: 'song-1', 
    title: 'Cosmic Drift', 
    artist: 'Galaxy Runners', 
    album: 'Starlight', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Electronic',
    friendRatings: [
      { friend: friends[0], rating: 4.5 },
      { friend: friends[2], rating: 4 },
    ],
    communityRatings: { totalRatings: 1532, fiveStars: 900, fourStars: 450, threeStars: 100, twoStars: 52, oneStar: 30 }
  },
  { 
    id: 'song-2', 
    title: 'Midnight Jazz', 
    artist: 'The Night Owls', 
    album: 'After Hours', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Jazz',
    friendRatings: [
      { friend: friends[1], rating: 5 },
    ],
    communityRatings: { totalRatings: 876, fiveStars: 600, fourStars: 200, threeStars: 50, twoStars: 16, oneStar: 10 }
  },
  { 
    id: 'song-3', 
    title: 'Concrete Jungle', 
    artist: 'MC Flow', 
    album: 'Urban Legends', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Rap',
    friendRatings: [
      { friend: friends[1], rating: 4 },
      { friend: friends[2], rating: 5 },
    ],
    communityRatings: { totalRatings: 2345, fiveStars: 1800, fourStars: 400, threeStars: 100, twoStars: 30, oneStar: 15 }
  },
  { 
    id: 'song-4', 
    title: 'Sunset Serenade', 
    artist: 'Acoustic Waves', 
    album: 'Golden Hour', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Acoustic',
    friendRatings: [],
    communityRatings: { totalRatings: 654, fiveStars: 400, fourStars: 150, threeStars: 60, twoStars: 34, oneStar: 10 }
  },
  { 
    id: 'song-5', 
    title: 'Pop Sensation', 
    artist: 'Glitter Bomb', 
    album: 'Sugar Rush', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Pop',
    friendRatings: [
        { friend: friends[0], rating: 4 },
        { friend: friends[1], rating: 3.5 },
    ],
    communityRatings: { totalRatings: 3123, fiveStars: 2000, fourStars: 800, threeStars: 200, twoStars: 93, oneStar: 30 }
  },
  { 
    id: 'song-6', 
    title: 'Rhythm of the Street', 
    artist: 'Urban Groove', 
    album: 'City Lights', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Hip-Hop',
    friendRatings: [
        { friend: friends[2], rating: 4.5 },
    ],
    communityRatings: { totalRatings: 1897, fiveStars: 1200, fourStars: 500, threeStars: 150, twoStars: 37, oneStar: 10 }
  },
  { 
    id: 'song-7', 
    title: 'Indie Echoes', 
    artist: 'The Wanderers', 
    album: 'Faded Postcards', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Indie',
    friendRatings: [
        { friend: friends[0], rating: 5 },
        { friend: friends[1], rating: 4.5 },
        { friend: friends[2], rating: 4 },
    ],
    communityRatings: { totalRatings: 987, fiveStars: 700, fourStars: 200, threeStars: 57, twoStars: 20, oneStar: 10 }
  },
  { 
    id: 'song-8', 
    title: 'Rock Anthem', 
    artist: 'Static Fury', 
    album: 'Voltage', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Rock',
    friendRatings: [
        { friend: friends[2], rating: 5 },
    ],
    communityRatings: { totalRatings: 2589, fiveStars: 2000, fourStars: 450, threeStars: 100, twoStars: 30, oneStar: 9 }
  },
  { 
    id: 'song-9', 
    title: 'Synthwave Dreams', 
    artist: 'Galaxy Runners', 
    album: 'Starlight', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Electronic',
    friendRatings: [
        { friend: friends[0], rating: 4 },
    ],
    communityRatings: { totalRatings: 1234, fiveStars: 800, fourStars: 300, threeStars: 100, twoStars: 24, oneStar: 10 }
  },
  { 
    id: 'song-10', 
    title: 'Summer Pop', 
    artist: 'Glitter Bomb', 
    album: 'Sugar Rush', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Pop',
    friendRatings: [
        { friend: friends[1], rating: 4 },
    ],
    communityRatings: { totalRatings: 4211, fiveStars: 3000, fourStars: 1000, threeStars: 150, twoStars: 51, oneStar: 10 }
  },
  { 
    id: 'song-11', 
    title: 'Lofi Beats', 
    artist: 'Chillhop Crew', 
    album: 'Study Session', 
    albumArt: 'https://placehold.co/400x400.png', 
    genre: 'Hip-Hop',
    friendRatings: [],
    communityRatings: { totalRatings: 5321, fiveStars: 4500, fourStars: 600, threeStars: 150, twoStars: 61, oneStar: 10 }
  },
];

export const dailyChallenges = [
  { id: 'challenge-1', text: 'Listen to 3 new Jazz songs', completed: true },
  { id: 'challenge-2', text: 'Rate 5 songs from your recommendations', completed: false },
  { id: 'challenge-3', text: 'Share a song in the Pop community', completed: false },
];

export const listeningHabitsData = [
  { genre: 'Rap', value: 40, fill: 'var(--color-rap)' },
  { genre: 'Pop', value: 25, fill: 'var(--color-pop)' },
  { genre: 'Jazz', value: 15, fill: 'var(--color-jazz)' },
  { genre: 'Electronic', value: 10, fill: 'var(--color-electronic)' },
  { genre: 'Other', value: 10, fill: 'var(--color-other)' },
];

export const chartConfig = {
  rap: { label: 'Rap', color: 'hsl(var(--chart-1))' },
  pop: { label: 'Pop', color: 'hsl(var(--chart-2))' },
  jazz: { label: 'Jazz', color: 'hsl(var(--chart-3))' },
  electronic: { label: 'Electronic', color: 'hsl(var(--chart-4))' },
  other: { label: 'Other', color: 'hsl(var(--chart-5))' },
  value: {
    label: 'Value',
  },
  genre: {
    label: 'Genre',
  },
};

export const leaderboardData = {
  RAP: [
    { rank: 1, user: 'BassNomad', exp: 125182 },
    { rank: 2, user: 'TempoTitan', exp: 118345 },
    { rank: 3, user: 'MC_Verse', exp: 112987 },
    { rank: 4, user: 'RhymeMaster', exp: 105621 },
    { rank: 1523, user: 'MusicExplorer', exp: 4211 },
  ],
  POP: [
    { rank: 1, user: 'PopPrincess', exp: 150234 },
    { rank: 2, user: 'Starlight', exp: 142876 },
    { rank: 3, user: 'VibeQueen', exp: 138321 },
    { rank: 2148, user: 'MusicExplorer', exp: 8854 },
  ],
  JAZZ: [
    { rank: 1, user: 'SaxMaster', exp: 98123 },
    { rank: 2, user: 'CoolCat', exp: 95432 },
    { rank: 3, 'user': 'GrooveSlinger', exp: 71876 },
    { rank: 3401, user: 'MusicExplorer', exp: 0 },
  ],
  ELECTRONIC: [
    { rank: 1, user: 'Galaxy Runners', exp: 115932 },
    { rank: 2, user: 'alligatorTamer_7', exp: 108234 },
    { rank: 3, user: 'TempoTitan', exp: 92765 },
    { rank: 4193, user: 'MusicExplorer', exp: 0 },
  ],
  INDIE: [
    { rank: 1, user: 'The Wanderers', exp: 85432 },
    { rank: 2, user: 'BassNomad', exp: 78987 },
    { rank: 3, user: 'Starlight', exp: 75123 },
    { rank: 2917, user: 'MusicExplorer', exp: 0 },
  ],
  ROCK: [
    { rank: 1, user: 'Static Fury', exp: 135765 },
    { rank: 2, user: 'TempoTitan', exp: 130234 },
    { rank: 3, user: 'RhymeMaster', exp: 122876 },
    { rank: 5329, user: 'MusicExplorer', exp: 0 },
  ],
};

export const allCommunities: Community[] = [
    { id: 'comm-1', name: 'RAP', feed: [
      { id: 'post-1', user: friends[1], song: songs[2], text: 'This track is fire! Absolute classic.', rating: 5, likes: 120, comments: [
          { id: 'comment-1', user: currentUser, text: 'Totally agree!' },
          { id: 'comment-2', user: friends[2], text: 'A true masterpiece.' },
      ]},
      { id: 'post-2', user: friends[2], song: songs[5], text: 'Found this gem, what do you guys think?', rating: 4, likes: 35, comments: [
           { id: 'comment-3', user: friends[0], text: 'Not bad, not bad at all.' },
      ] },
    ]},
    { id: 'comm-2', name: 'POP', feed: [
      { id: 'post-3', user: friends[0], song: songs[4], text: 'Can\'t get this out of my head!', rating: 5, likes: 256, comments: [
        {id: 'comment-4', user: friends[1], text: 'Seriously, it\'s so catchy!'}
      ] },
    ]},
    { id: 'comm-3', name: 'JAZZ', feed: [
        { id: 'post-4', user: friends[2], song: songs[1], text: 'The solos in this are just incredible. A must-listen for any jazz fan.', rating: 5, likes: 88, comments: [] },
    ]},
    { id: 'comm-4', name: 'ELECTRONIC', feed: [
        { id: 'post-5', user: friends[1], song: songs[0], text: 'Perfect for late night drives. The synth work is amazing.', rating: 4, likes: 42, comments: [] },
    ]},
    { id: 'comm-5', name: 'INDIE', feed: [
        { id: 'post-6', user: friends[0], song: songs[6], text: 'Such a chill vibe from this track. Discovered it last week and it\'s been on repeat.', rating: 5, likes: 15, comments: [] },
    ]},
    { id: 'comm-6', name: 'ROCK', feed: [
        { id: 'post-7', user: friends[2], song: songs[7], text: 'This goes hard! The guitar riff is insane.', rating: 4, likes: 99, comments: [] },
    ]},
  ];
  
  export const communities: Community[] = [
    allCommunities[0],
    allCommunities[1],
  ];

export const profileStats = {
  recommendationsLiked: 42,
  listeningTime: '128h 34m',
  songsRated: 256,
  communitiesJoined: 3,
};

export const badges: Badge[] = [
    { id: 'badge-1', name: 'Rap Connoisseur', genre: 'Rap', description: 'Rated over 50 Rap songs.' },
    { id: 'badge-2', name: 'Pop Pioneer', genre: 'Pop', description: 'Discovered 10 trending Pop artists.' },
    { id: 'badge-3', name: 'Jazz Aficionado', genre: 'Jazz', description: 'Listened to over 100 Jazz tracks.' },
    { id: 'badge-4', name: 'Community Builder', genre: 'Social', description: 'Top contributor in 3+ communities.' },
    { id: 'badge-5', name: 'Streak Keeper', genre: 'General', description: 'Maintained a listening streak for 30 days.' },
];

export const quizQuestions = [
    {
      question: "When you play a new game, what's your primary goal?",
      answers: {
        a: { text: "To make new friends and socialize.", type: "Socializer" },
        b: { text: "To gain power, points, and be the best.", type: "Achiever" },
        c: { text: "To explore the world and discover its secrets.", type: "Explorer" },
        d: { text: "To compete with others and dominate the competition.", type: "Killer" },
      },
    },
    {
      question: "How do you prefer to discover new music?",
      answers: {
        a: { text: "Through recommendations from my friends.", type: "Socializer" },
        b: { text: "By climbing genre leaderboards and unlocking achievements.", type: "Achiever" },
        c: { text: "By diving into unknown genres and seeing what I find.", type: "Explorer" },
        d: { text: "By seeing what's topping the charts and proving my taste is better.", type: "Killer" },
      },
    },
    {
      question: "What makes a music app engaging for you?",
      answers: {
        a: { text: "Sharing playlists and discussing music with a community.", type: "Socializer" },
        b: { text: "Earning badges for my music knowledge and listening habits.", type: "Achiever" },
        c: { text: "Having a vast library and tools to find obscure tracks.", type: "Explorer" },
        d: { text: "Comparing my listening stats against other users.", type: "Killer" },
      },
    },
    {
        question: "You find a new favorite song. What's your first instinct?",
        answers: {
          a: { text: "Share it with my friends or a community I'm in.", type: "Socializer" },
          b: { text: "Add it to my 'Perfected Genre' playlist to show my expertise.", type: "Achiever" },
          c: { text: "Check out the artist's entire discography and related artists.", type: "Explorer" },
          d: { text: "See if it's on any popular charts and feel validated.", type: "Killer" },
        },
    }
];

export const friendRatings: FriendRating[] = [
    { friend: friends[0], rating: 5 },
    { friend: friends[1], rating: 4 },
];

export const communityRatings: CommunityRating = {
    totalRatings: 1284,
    fiveStars: 890,
    fourStars: 250,
    threeStars: 80,
    twoStars: 44,
    oneStar: 20,
};

    