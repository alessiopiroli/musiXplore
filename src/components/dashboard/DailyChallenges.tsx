"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dailyChallenges } from "@/lib/mock-data"

export function DailyChallenges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dailyChallenges.map((challenge) => (
            <div key={challenge.id} className="flex items-center space-x-3">
              <Checkbox id={challenge.id} checked={challenge.completed} />
              <label
                htmlFor={challenge.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {challenge.text}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
