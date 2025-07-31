# musiXplore

musiXplore is a gamified music discovery application designed to create a personalized and engaging experience for music lovers. It uses a unique player-type quiz to tailor gamification elements and provides a rich set of features for discovering, sharing, and competing.

## Core Features

-   **Player Type Quiz**: An onboarding quiz to determine the user's Bartle player type (Socializer, Achiever, Explorer, Killer), which personalizes the app's features.
-   **Personalized Dashboard**: A central hub showing listening habits, daily challenges, and a listening streak to encourage engagement.
-   **Song Recommendations**: Discover new music recommended by friends, the community, or based on similar genres.
-   **Genre Leaderboards**: Explore and filter curated genre leaderboards.
-   **Community Hub**: Engage with other users in genre-specific communities, share songs, and join discussions.
-   **Profile and Badges**: Showcase your musical expertise with a profile that displays activity stats, listening time, and earned badges.
-   **Avatars**: Get a unique avatar based on your player type.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Prerequisites

-   **Node.js**: Make sure you have Node.js (version 18 or higher) installed. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Clone the Repository

Open your terminal, navigate to the directory where you want to store the project, and run the following command:

```bash
git clone <your-github-repository-url>
cd <project-folder-name>
```

### 3. Set Up Environment Variables

The application uses Genkit to connect to Google's Generative AI models, which requires an API key.

1.  **Get a Gemini API Key**: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Create `.env` file**: In the root of the project, create a file named `.env` and add your API key to it:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

    Replace `YOUR_API_KEY_HERE` with your actual key.

### 4. Install Dependencies

In your terminal, run the following command to install all the required packages:

```bash
npm install
```

### 5. Run the Application

This project requires two processes to run concurrently: the Next.js frontend and the Genkit AI server. You should open two separate terminals for this.

**Terminal 1: Start the Next.js App**

```bash
npm run dev
```

Your application will be running at `http://localhost:9002`.

**Terminal 2: Start the Genkit Server**

```bash
npm run genkit:watch
```

This starts the Genkit development UI, which you can view at `http://localhost:4000` to monitor your AI flows.

Now you can open your browser to `http://localhost:9002` to use the application. Enjoy!
