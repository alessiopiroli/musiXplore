
"use client"

import { Bar, BarChart, XAxis, YAxis, Rectangle } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { listeningHabitsData, chartConfig } from "@/lib/mock-data"

export function ListeningHabitsChart() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Listening Habits</CardTitle>
        <CardDescription>Your top genres this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={listeningHabitsData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 0,
            }}
          >
            <XAxis
              dataKey="genre"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={4}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="genre" hideIndicator />}
            />
            <Bar dataKey="value" fill="var(--color-primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
