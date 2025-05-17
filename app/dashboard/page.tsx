"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchDashboardData } from "@/lib/api"
import MetricsCards from "@/components/dashboard/metrics-cards"
import SalesChart from "@/components/dashboard/sales-chart"
import UserGrowthChart from "@/components/dashboard/user-growth-chart"
import CategoryDistributionChart from "@/components/dashboard/category-distribution-chart"
import DataTable from "@/components/dashboard/data-table"
import type { DashboardData } from "@/lib/types"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Failed to load dashboard data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="day">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <MetricsCards metrics={dashboardData.metrics} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Trends</CardTitle>
            <CardDescription>Daily sales revenue for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart data={dashboardData.salesTrends} />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users per month</CardDescription>
          </CardHeader>
          <CardContent>
            <UserGrowthChart data={dashboardData.userGrowth} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Sales by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryDistributionChart data={dashboardData.categoryDistribution} />
          </CardContent>
        </Card>
        <Card className="col-span-4 overflow-hidden">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={dashboardData.recentSales} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
