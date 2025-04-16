import React from "react";
import { Coffee } from "lucide-react";

interface BreakTimeProps {
  className?: string;
}

export function BreakTime({ className = "" }: BreakTimeProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Fondo blanco con rayas diagonales */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(230, 230, 230, 0.4) 8px,
            rgba(230, 230, 230, 0.4) 16px
          )`,
        }}
      />
      
      {/* Contenido de BREAK TIME */}
      <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 z-10">
        <span className="flex items-center gap-2">
          <Coffee className="h-4 w-4 text-gray-400" />
          BREAK TIME
        </span>
      </div>
    </div>
  );
} 