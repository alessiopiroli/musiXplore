
import { ListeningHabitsChart } from "@/components/dashboard/ListeningHabitsChart"
import { DailyChallenges } from "@/components/dashboard/DailyChallenges"
import { ListeningStreak } from "@/components/dashboard/ListeningStreak"

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Welcome back!</h1>
        <ListeningHabitsChart />
        <DailyChallenges />
        <ListeningStreak />
      </div>
    </div>
  )
}
