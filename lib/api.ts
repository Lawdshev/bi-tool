import type { DashboardData } from "./types"

// Mock API function to fetch dashboard data
export async function fetchDashboardData(): Promise<DashboardData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock data
  return {
    metrics: {
      totalUsers: 12458,
      userGrowthRate: 12.3,
      activeSessions: 843,
      sessionGrowthRate: 5.7,
      salesRevenue: 87459,
      revenueGrowthRate: 8.2,
    },
    salesTrends: Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))

      return {
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        revenue: Math.floor(Math.random() * 5000) + 1000,
      }
    }),
    userGrowth: [
      { month: "Jan", users: 120 },
      { month: "Feb", users: 145 },
      { month: "Mar", users: 162 },
      { month: "Apr", users: 190 },
      { month: "May", users: 210 },
      { month: "Jun", users: 252 },
      { month: "Jul", users: 264 },
      { month: "Aug", users: 280 },
      { month: "Sep", users: 323 },
      { month: "Oct", users: 343 },
      { month: "Nov", users: 368 },
      { month: "Dec", users: 390 },
    ],
    categoryDistribution: [
      { name: "Electronics", value: 35, sales: 30450 },
      { name: "Clothing", value: 25, sales: 21750 },
      { name: "Home", value: 20, sales: 17400 },
      { name: "Sports", value: 15, sales: 13050 },
      { name: "Other", value: 5, sales: 4350 },
    ],
    recentSales: Array.from({ length: 10 }, (_, i) => {
      const statuses = ["Completed", "Processing", "Pending"]
      const products = [
        "Laptop",
        "Smartphone",
        "Headphones",
        "Monitor",
        "Keyboard",
        "Mouse",
        "Tablet",
        "Camera",
        "Speaker",
        "Smartwatch",
      ]
      const customers = [
        "John Doe",
        "Jane Smith",
        "Robert Johnson",
        "Emily Davis",
        "Michael Brown",
        "Sarah Wilson",
        "David Miller",
        "Lisa Moore",
        "James Taylor",
        "Jennifer Anderson",
      ]

      return {
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        customer: customers[Math.floor(Math.random() * customers.length)],
        product: products[Math.floor(Math.random() * products.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        amount: Math.floor(Math.random() * 1000) + 50,
      }
    }),
  }
}
