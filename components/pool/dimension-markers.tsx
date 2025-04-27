"use client"

import type { PoolConfig } from "@/types"

interface DimensionMarkersProps {
  config: PoolConfig
  width: number
  height: number
}

export function DimensionMarkers({ config, width, height }: DimensionMarkersProps) {
  // No renderizamos marcadores si no tenemos dimensiones
  if (!width || !height) return null

  const padding = 40
  const arrowSize = 10

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Marcador de ancho */}
      <div className="absolute top-0 left-0 right-0 flex justify-center items-start">
        <div className="relative h-8 flex items-center">
          <div className="absolute bottom-0 left-0 w-0.5 h-3 bg-gray-600" />
          <div className="h-0.5 bg-gray-600" style={{ width: width }} />
          <div className="absolute bottom-0 right-0 w-0.5 h-3 bg-gray-600" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-2 text-sm font-medium">
            {config.width} m
          </div>
        </div>
      </div>

      {/* Marcador de largo */}
      <div className="absolute top-0 bottom-0 left-0 flex justify-start items-center">
        <div className="relative w-8 flex flex-col items-center">
          <div className="absolute right-0 top-0 h-0.5 w-3 bg-gray-600" />
          <div className="w-0.5 bg-gray-600" style={{ height: height }} />
          <div className="absolute right-0 bottom-0 h-0.5 w-3 bg-gray-600" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 bg-white px-2 text-sm font-medium origin-left">
            {config.length} m
          </div>
        </div>
      </div>
    </div>
  )
}
