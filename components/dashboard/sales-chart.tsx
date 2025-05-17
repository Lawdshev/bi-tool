"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { SalesTrend } from "@/lib/types"

interface SalesChartProps {
  data: SalesTrend[]
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="border-none shadow-md">
                  <CardContent className="p-2">
                    <div className="text-sm font-bold">{payload[0].payload.date}</div>
                    <div className="text-xs">Revenue: ${payload[0].value}</div>
                  </CardContent>
                </Card>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 0 }}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
