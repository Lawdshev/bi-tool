"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { CategoryDistribution } from "@/lib/types"

interface CategoryDistributionChartProps {
  data: CategoryDistribution[]
}

export default function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--primary) / 0.8)",
    "hsl(var(--primary) / 0.6)",
    "hsl(var(--primary) / 0.4)",
    "hsl(var(--primary) / 0.2)",
  ]

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="border-none shadow-md">
                    <CardContent className="p-2">
                      <div className="text-sm font-bold">{payload[0].name}</div>
                      <div className="text-xs">Sales: ${payload[0].payload.sales}</div>
                    </CardContent>
                  </Card>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
