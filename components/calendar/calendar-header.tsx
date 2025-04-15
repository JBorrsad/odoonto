"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarHeaderProps {
  date: Date
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
  view: "day" | "week"
  onViewChange: (view: "day" | "week") => void
}

export function CalendarHeader({ date, onPrevious, onNext, onToday, view, onViewChange }: CalendarHeaderProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center bg-gray-100 p-2 rounded-md">
          <CalendarIcon className="h-5 w-5 text-gray-700" />
          <span className="ml-2 font-semibold">16</span>
        </div>
        <div className="text-sm text-gray-500">total appointments</div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToday} className="rounded-full px-4">
          Today
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">{formattedDate}</div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex border rounded-md overflow-hidden">
          <Button
            variant={view === "day" ? "default" : "ghost"}
            size="sm"
            className={`rounded-none ${view === "day" ? "bg-blue-600" : "bg-white text-gray-700"}`}
            onClick={() => onViewChange("day")}
          >
            Day
          </Button>
          <Button
            variant={view === "week" ? "default" : "ghost"}
            size="sm"
            className={`rounded-none ${view === "week" ? "bg-blue-600" : "bg-white text-gray-700"}`}
            onClick={() => onViewChange("week")}
          >
            Week
          </Button>
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select Dentist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Doctores</SelectItem>
            <SelectItem value="doctor1">Doctor 1</SelectItem>
            <SelectItem value="doctor2">Doctor 2</SelectItem>
            <SelectItem value="doctor3">Doctor 3</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  )
}
