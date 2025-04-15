import type React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  ClipboardList,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Package,
  Printer,
  FileText,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-64 border-r bg-white", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">Z</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Odoonto</h2>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center text-xs">C</div>
              <h3 className="text-sm font-medium">Clínica Dental</h3>
            </div>
            <p className="text-xs text-muted-foreground ml-8">Dirección de ejemplo #123</p>
          </div>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <span>Dashboard</span>
            </Link>
          </div>
        </div>

        <div className="px-3">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-gray-400">CLINIC</h3>
          <div className="space-y-1">
            <Link
              href="/reservations"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-blue-600 font-medium transition-all"
            >
              <div className="flex items-center justify-center w-6 h-6 text-blue-600">
                <Calendar className="h-5 w-5" />
              </div>
              <span>Reservations</span>
            </Link>
            <Link
              href="/patients"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <Users className="h-5 w-5" />
              </div>
              <span>Patients</span>
            </Link>
            <Link
              href="/treatments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span>Treatments</span>
            </Link>
            <Link
              href="/staff"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <ClipboardList className="h-5 w-5" />
              </div>
              <span>Staff List</span>
            </Link>
          </div>
        </div>

        <div className="px-3">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-gray-400">FINANCE</h3>
          <div className="space-y-1">
            <Link
              href="/accounts"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <DollarSign className="h-5 w-5" />
              </div>
              <span>Accounts</span>
            </Link>
            <Link
              href="/sales"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span>Sales</span>
            </Link>
            <Link
              href="/purchases"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span>Purchases</span>
            </Link>
            <Link
              href="/payment-method"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <span>Payment Method</span>
            </Link>
          </div>
        </div>
        <div className="px-3">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-gray-400">PHYSICAL ASSET</h3>
          <div className="space-y-1">
            <Link
              href="/stocks"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <Package className="h-5 w-5" />
              </div>
              <span>Stocks</span>
            </Link>
            <Link
              href="/peripherals"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <Printer className="h-5 w-5" />
              </div>
              <span>Peripherals</span>
            </Link>
          </div>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            <Link
              href="/report"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <FileText className="h-5 w-5" />
              </div>
              <span>Report</span>
            </Link>
            <Link
              href="/customer-support"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <span>Customer Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
