import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Activity } from "lucide-react"
import type { Metrics } from "@/lib/types"

interface MetricsCardsProps {
  metrics: Metrics
}

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.userGrowthRate > 0 ? "+" : ""}
            {metrics.userGrowthRate}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeSessions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.sessionGrowthRate > 0 ? "+" : ""}
            {metrics.sessionGrowthRate}% from last hour
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.salesRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.revenueGrowthRate > 0 ? "+" : ""}
            {metrics.revenueGrowthRate}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
