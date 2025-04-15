import { MoreHorizontal, Play } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Appointment } from "./appointment"
import { Button } from "@/components/ui/button"
import { NotAvailableArea } from "./not-available-area"

interface AppointmentData {
  id: string
  patientName: string
  startTime: string
  endTime: string
  treatment: string
  status: "finished" | "encounter" | "registered" | "waiting"
  color: "pink" | "green" | "blue" | "yellow"
  startSlot: number // 0 = 9am, 1 = 9:30am, 2 = 10am, etc.
  endSlot: number // Slot where the appointment ends
}

interface DentistColumnProps {
  dentist: {
    id: string
    name: string
    avatar: string
    appointments: number
    patients: number
  }
  appointments: AppointmentData[]
  showNotAvailable?: boolean
  showBreakTime?: boolean
  showWaitingPayment?: boolean
  showPlayButton?: boolean
}

export function DentistColumn({
  dentist,
  appointments,
  showNotAvailable = false,
  showBreakTime = false,
  showWaitingPayment = false,
  showPlayButton = false,
}: DentistColumnProps) {
  // Create slots for each half hour (9am to 4:30pm)
  const slots = Array(16).fill(null)

  // Fill slots with appointments
  appointments.forEach((appointment) => {
    // Mark all slots that this appointment spans
    for (let i = appointment.startSlot; i <= appointment.endSlot; i++) {
      if (i === appointment.startSlot) {
        slots[i] = { ...appointment, isStart: true }
      } else {
        slots[i] = { ...appointment, isStart: false }
      }
    }
  })

  return (
    <div className="flex-1 min-w-[250px] border-r">
      <div className="flex items-center justify-between h-10 mb-2 px-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={dentist.avatar || "/placeholder.svg"} alt={dentist.name} />
              <AvatarFallback>{dentist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{dentist.name}</span>
          </div>
          <div className="text-xs text-gray-400 ml-8">Today's appointments: {dentist.appointments} patient(s)</div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {slots.map((slot, index) => {
        // Only render appointment at its start slot
        const shouldRenderAppointment = slot && slot.isStart
        const isHalfHour = index % 2 !== 0

        return (
          <div
            key={index}
            className={`h-12 ${index > 0 ? "border-t border-gray-200" : ""} ${isHalfHour ? "border-t-dashed" : ""} relative`}
          >
            {shouldRenderAppointment ? (
              <div
                className="absolute z-10 px-1 py-0.5"
                style={{
                  top: 0,
                  left: 4,
                  right: 4,
                  height: `${(slot.endSlot - slot.startSlot + 1) * 48}px`,
                }}
              >
                <Appointment
                  id={slot.id}
                  patientName={slot.patientName}
                  startTime={slot.startTime}
                  endTime={slot.endTime}
                  treatment={slot.treatment}
                  status={slot.status}
                  color={slot.color}
                />
              </div>
            ) : null}

            {index === 5 && showPlayButton && !slot ? (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Play className="h-6 w-6 text-white ml-1" />
                </div>
              </div>
            ) : null}

            {index === 7 && showBreakTime && !slot ? (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 z-10">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                  BREAK TIME
                </span>
              </div>
            ) : null}

            {index === 13 && showWaitingPayment && !slot ? (
              <div className="absolute inset-0 bg-yellow-100 flex items-center justify-center text-sm text-yellow-700 font-medium z-10">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-700"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  WAITING PAYMENT FOR RAIHAN
                </span>
              </div>
            ) : null}

            {showNotAvailable && index > 5 && !slot ? <NotAvailableArea /> : null}
          </div>
        )
      })}
    </div>
  )
}
