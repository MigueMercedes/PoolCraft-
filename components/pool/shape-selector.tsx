"use client"

import type React from "react"
import type { PoolShape } from "@/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ShapeSelectorProps {
  value: PoolShape
  onChange: (shape: PoolShape) => void
}

export function ShapeSelector({ value, onChange }: ShapeSelectorProps) {
  const shapes: { id: PoolShape; label: string; icon: React.ReactNode }[] = [
    {
      id: "RECTANGLE",
      label: "Rectangular",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <rect x="3" y="6" width="18" height="12" rx="1" />
        </svg>
      ),
    },
    {
      id: "OVAL",
      label: "Ovalada",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <ellipse cx="12" cy="12" rx="9" ry="6" />
        </svg>
      ),
    },
    {
      id: "KIDNEY",
      label: "Riñón",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M21,12c0,3.31-4.03,6-9,6s-9-2.69-9-6s4.03-6,9-6c0.83,0,1.62,0.08,2.36,0.22C17.79,7.46,21,9.5,21,12z" />
          <path d="M13,8c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S13,6.9,13,8z" fill="white" />
        </svg>
      ),
    },
    {
      id: "CUSTOM",
      label: "Personalizada",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M4,6L4,18L20,18L20,6Z M17.5,14L17.5,16L14,16L14,14Z M14,10L14,12L17.5,12L17.5,10Z M6.5,10L6.5,12L10,12L10,10Z M6.5,14L6.5,16L10,16L10,14Z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {shapes.map((shape) => (
        <Button
          key={shape.id}
          type="button"
          variant={value === shape.id ? "default" : "outline"}
          className={cn(
            "flex flex-col items-center justify-center h-24 p-2",
            value === shape.id ? "border-2 border-primary" : "",
          )}
          onClick={() => onChange(shape.id)}
        >
          <div className="mb-2">{shape.icon}</div>
          <span>{shape.label}</span>
        </Button>
      ))}
    </div>
  )
}
