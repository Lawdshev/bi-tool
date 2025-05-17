"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { BarChart3, Home, LogOut, Menu, Package, Settings, ShoppingCart, Users, X } from "lucide-react"

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Analytics", href: "/dashboard/#", icon: BarChart3 },
    { name: "Products", href: "/dashboard/#", icon: Package },
    { name: "Customers", href: "/dashboard/#", icon: Users },
    { name: "Orders", href: "/dashboard/#", icon: ShoppingCart },
    { name: "Settings", href: "/dashboard/#", icon: Settings },
  ]

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="sticky left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:hidden">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <span className="ml-2 font-semibold">BI Dashboard</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{user?.fullName}</span>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 transform bg-background transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span className="font-semibold">BI Dashboard</span>
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex h-[calc(100vh-4rem)] flex-col justify-between p-4">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rounded-md px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-muted"></div>
              <div>
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden w-64 flex-shrink-0 border-r bg-background md:block">
        <div className="flex h-16 items-center border-b px-6">
          <span className="font-semibold">BI Dashboard</span>
        </div>
        <div className="flex h-[calc(100vh-4rem)] flex-col justify-between p-4">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rounded-md px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-muted"></div>
              <div>
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={closeSidebar}></div>
      )}
    </>
  )
}
