export function TimeColumn() {
  const hours = [
    { time: "09:00", isHalfHour: false },
    { time: "", isHalfHour: true },
    { time: "10:00", isHalfHour: false },
    { time: "", isHalfHour: true },
    { time: "11:00", isHalfHour: false },
    { time: "", isHalfHour: true },
    { time: "12:00", isHalfHour: false },
    { time: "", isHalfHour: true },
    { time: "13:00", isHalfHour: false },
    { time: "", isHalfHour: true },
    { time: "14:00", isHalfHour: false },
    { time: "", isHalfHour: true },
    { time: "15:00", isHalfHour: false },
    { time: "", isHalfHour: true },
    { time: "16:00", isHalfHour: false },
    { time: "", isHalfHour: true },
  ]

  return (
    <div className="w-16 pr-2 text-right border-r">
      <div className="h-10 text-xs font-medium text-gray-500 mb-2">
        GMT
        <br />
        +01:00
      </div>
      {hours.map((hour, index) => (
        <div
          key={index}
          className={`${hour.isHalfHour ? "h-12" : "h-12"} text-xs font-medium text-gray-500 ${hour.isHalfHour ? "" : ""}`}
        >
          {hour.time}
        </div>
      ))}
    </div>
  )
}
