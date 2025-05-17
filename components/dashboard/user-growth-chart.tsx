"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { UserGrowth } from "@/lib/types"

interface UserGrowthChartProps {
  data: UserGrowth[]
}

export default function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="border-none shadow-md">
                  <CardContent className="p-2">
                    <div className="text-sm font-bold">{payload[0].payload.month}</div>
                    <div className="text-xs">New Users: {payload[0].value}</div>
                  </CardContent>
                </Card>
              )
            }
            return null
          }}
        />
        <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
