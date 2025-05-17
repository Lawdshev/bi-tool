export interface Metrics {
  totalUsers: number
  userGrowthRate: number
  activeSessions: number
  sessionGrowthRate: number
  salesRevenue: number
  revenueGrowthRate: number
}

export interface SalesTrend {
  date: string
  revenue: number
}

export interface UserGrowth {
  month: string
  users: number
}

export interface CategoryDistribution {
  name: string
  value: number
  sales: number
}

export interface Sale {
  id: string
  date: string
  customer: string
  product: string
  status: string
  amount: number
}

export interface DashboardData {
  metrics: Metrics
  salesTrends: SalesTrend[]
  userGrowth: UserGrowth[]
  categoryDistribution: CategoryDistribution[]
  recentSales: Sale[]
}
