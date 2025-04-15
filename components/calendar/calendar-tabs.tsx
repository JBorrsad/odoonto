import Link from "next/link"

export function CalendarTabs() {
  return (
    <div className="flex border-b">
      <Link href="/reservations" className="px-6 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">
        Calendar
      </Link>
      <Link href="/reservations/log-history" className="px-6 py-3 text-gray-500">
        Log History
      </Link>
    </div>
  )
}
