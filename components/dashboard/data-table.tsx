"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search } from "lucide-react"
import type { Sale } from "@/lib/types"

interface DataTableProps {
  data: Sale[]
}

export default function DataTable({ data }: DataTableProps) {
  const [sortField, setSortField] = useState<keyof Sale>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: keyof Sale) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredData = data.filter((item) => {
    return (
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
    }

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Date
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("customer")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Customer
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("product")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Product
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("amount")}
                  className="flex items-center gap-1 p-0 font-medium justify-end w-full"
                >
                  Amount
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        sale.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : sale.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">${sale.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
