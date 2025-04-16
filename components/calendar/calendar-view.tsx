"use client"

import { useState } from "react"
import { CalendarHeader } from "./calendar-header"
import { TimeColumn } from "./time-column"
import { DentistColumn } from "./dentist-column"
import { CalendarTabs } from "./calendar-tabs"
import { Button } from "@/components/ui/button"
import { Plus, MessageCircle } from "lucide-react"

export function CalendarView() {
  const [date, setDate] = useState(new Date(2022, 4, 16)) // May 16, 2022
  const [view, setView] = useState<"day" | "week">("day")

  const handlePrevious = () => {
    const newDate = new Date(date)
    if (view === "day") {
      newDate.setDate(date.getDate() - 1)
    } else {
      newDate.setDate(date.getDate() - 7)
    }
    setDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(date)
    if (view === "day") {
      newDate.setDate(date.getDate() + 1)
    } else {
      newDate.setDate(date.getDate() + 7)
    }
    setDate(newDate)
  }

  const handleToday = () => {
    setDate(new Date(2022, 4, 16)) // Reset to May 16, 2022 for demo
  }

  // Sample data
  const dentists = [
    {
      id: "1",
      name: "Doctor 1",
      avatar: "/placeholder.svg",
      appointments: 4,
      patients: 3,
    },
    {
      id: "2",
      name: "Doctor 2",
      avatar: "/placeholder.svg",
      appointments: 2,
      patients: 2,
    },
    {
      id: "3",
      name: "Doctor 3",
      avatar: "/placeholder.svg",
      appointments: 1,
      patients: 1,
    },
  ]

  const appointments = [
    {
      dentistId: "1",
      appointments: [
        {
          id: "1",
          patientName: "Paciente 1",
          startTime: "09:00 AM",
          endTime: "10:00 AM",
          treatment: "General Checkup",
          status: "finished" as const,
          color: "pink" as const,
          startSlot: 0,
          endSlot: 1,
        },
        {
          id: "2",
          patientName: "Paciente 2",
          startTime: "10:00 AM",
          endTime: "11:00 AM",
          treatment: "Scaling",
          status: "finished" as const,
          color: "green" as const,
          startSlot: 2,
          endSlot: 3,
        },
        {
          id: "5",
          patientName: "Paciente 3",
          startTime: "12:00 PM",
          endTime: "01:00 PM",
          treatment: "Extraction",
          status: "encounter" as const,
          color: "blue" as const,
          startSlot: 6,
          endSlot: 7,
        },
        {
          id: "6",
          patientName: "Paciente 4",
          startTime: "02:30 PM",
          endTime: "03:30 PM",
          treatment: "General Checkup",
          status: "registered" as const,
          color: "blue" as const,
          startSlot: 11,
          endSlot: 13,
        },
      ],
    },
    {
      dentistId: "2",
      appointments: [
        {
          id: "3",
          patientName: "Paciente 5",
          startTime: "11:00 AM",
          endTime: "12:00 PM",
          treatment: "Bleaching",
          status: "finished" as const,
          color: "green" as const,
          startSlot: 4,
          endSlot: 5,
        },
      ],
    },
    {
      dentistId: "3",
      appointments: [],
    },
  ]

  return (
    <div className="bg-white rounded-md">
      <CalendarTabs />

      <div className="p-4">
        <CalendarHeader
          date={date}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          view={view}
          onViewChange={setView}
        />

        <div className="mt-4 flex border rounded-md overflow-hidden relative">
          <TimeColumn />

          {dentists.map((dentist, index) => {
            const dentistAppointments = appointments.find((a) => a.dentistId === dentist.id)?.appointments || []
            return (
              <DentistColumn
                key={dentist.id}
                dentist={dentist}
                appointments={dentistAppointments}
                showNotAvailable={index === 2}
                showBreakTime={index === 1}
                showWaitingPayment={index === 0}
                showPlayButton={index === 1}
              />
            )
          })}

          <div className="w-10 flex flex-col items-center border-l">
            <div className="h-16"></div>
            {Array(16)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className={`h-12 ${index > 0 ? "border-t border-gray-200" : ""} ${index % 2 !== 0 ? "border-t-dashed" : ""} w-full flex justify-center pt-2`}
                >
                  {index === 15 && (
                    <Button size="icon" variant="ghost" className="h-6 w-6 text-blue-600">
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
          </div>

          {/* Current time indicator (red line) */}
          <div
            className="absolute left-0 right-0 border-t-2 border-red-500 z-10"
            style={{ top: "480px", height: "2px" }}
          >
          </div>

          {/* Time marker - rectángulo negro con texto blanco centrado */}
          <div
            className="absolute bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-sm z-10 left-1/2 transform -translate-x-1/2"
            style={{ top: "472px" }}
          >
            13:30
          </div>
        </div>
      </div>
    </div>
  )
}
