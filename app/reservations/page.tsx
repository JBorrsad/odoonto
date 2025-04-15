import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { CalendarView } from "@/components/calendar/calendar-view"

export default function ReservationsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4">
          <CalendarView />
        </main>
      </div>
    </div>
  )
}
