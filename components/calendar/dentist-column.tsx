import { MoreHorizontal, Play } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Appointment } from "./appointment"
import { Button } from "@/components/ui/button"
import { NotAvailableArea } from "./not-available-area"
import { BreakTime } from "./break-time"
import { useEffect, useState, useRef } from "react"

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

interface NotAvailableBlock {
  startIndex: number;
  endIndex: number;
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
  const [notAvailableBlocks, setNotAvailableBlocks] = useState<NotAvailableBlock[]>([])
  const prevBlocksRef = useRef<NotAvailableBlock[]>([]);

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

  // Función para agrupar celdas NOT AVAILABLE consecutivas
  useEffect(() => {
    if (!showNotAvailable) {
      if (notAvailableBlocks.length > 0) {
        setNotAvailableBlocks([]);
      }
      return;
    }

    const blocks: NotAvailableBlock[] = [];
    let currentBlock: NotAvailableBlock | null = null;

    // Encuentra bloques consecutivos de celdas vacías
    slots.forEach((slot, index) => {
      // Si el slot está vacío y estamos después del índice 5
      if (index > 5 && !slot) {
        if (!currentBlock) {
          // Inicia un nuevo bloque
          currentBlock = { startIndex: index, endIndex: index };
        } else {
          // Extiende el bloque actual
          currentBlock.endIndex = index;
        }
      } else {
        // Si hay un bloque activo, guárdalo y reinicia
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
      }
    });

    // No olvides el último bloque si existe
    if (currentBlock) {
      blocks.push(currentBlock);
    }

    // Comparar si los bloques realmente cambiaron para evitar renderizados innecesarios
    const areBlocksEqual = blocks.length === prevBlocksRef.current.length &&
      blocks.every((block, index) =>
        block.startIndex === prevBlocksRef.current[index]?.startIndex &&
        block.endIndex === prevBlocksRef.current[index]?.endIndex
      );
    
    if (!areBlocksEqual) {
      prevBlocksRef.current = blocks;
      setNotAvailableBlocks(blocks);
    }
  }, [slots, showNotAvailable, notAvailableBlocks.length]);

  return (
    <div className="flex-1 min-w-[250px] border-r">
      <div className="flex justify-between h-16 border-b border-gray-200 px-4 w-full">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 flex-shrink-0 mr-3">
            <AvatarImage src={dentist.avatar || "/placeholder.svg"} alt={dentist.name} />
            <AvatarFallback>{dentist.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <span className="font-medium">{dentist.name}</span>
            <div className="text-xs text-gray-400">Today's appointments: {dentist.appointments} patient(s)</div>
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {slots.map((slot, index) => {
        // Only render appointment at its start slot
        const shouldRenderAppointment = slot && slot.isStart
        const isHalfHour = index % 2 !== 0

        // Verificar si este índice es el inicio de un bloque NOT AVAILABLE
        const isNotAvailableStart = notAvailableBlocks.some(block => block.startIndex === index);
        
        // Obtener el bloque si este índice es el inicio
        const notAvailableBlock = notAvailableBlocks.find(block => block.startIndex === index);
        
        // Verificar si este índice es parte de un bloque (pero no el inicio)
        const isPartOfNotAvailableBlock = notAvailableBlocks.some(
          block => index > block.startIndex && index <= block.endIndex
        );

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
              <div className="absolute inset-0 z-10">
                <BreakTime />
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

            {/* Renderizar NOT AVAILABLE solo para el primer índice del bloque */}
            {isNotAvailableStart && notAvailableBlock && showNotAvailable ? (
              <div 
                className="absolute z-10"
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  height: `${(notAvailableBlock.endIndex - notAvailableBlock.startIndex + 1) * 48}px`,
                }}
              >
                <NotAvailableArea />
              </div>
            ) : null}

            {/* Renderizar NOT AVAILABLE para celdas individuales que no forman parte de ningún bloque */}
            {!slot && showNotAvailable && index > 5 && !isNotAvailableStart && !isPartOfNotAvailableBlock ? (
              <div className="absolute inset-0 z-10">
                <NotAvailableArea />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
