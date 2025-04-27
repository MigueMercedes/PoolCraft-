"use client"

import { useEffect, useRef, useState } from "react"
import type { PoolConfig } from "@/types"
import { DimensionMarkers } from "./dimension-markers"
import { renderPool } from "@/lib/pool-renderer"

interface PoolPreviewProps {
  config: PoolConfig
}

export function PoolPreview({ config }: PoolPreviewProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (svgRef.current) {
      const { width, height } = renderPool(svgRef.current, config)
      setDimensions({ width, height })
    }
  }, [config])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative">
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" />
        <DimensionMarkers config={config} width={dimensions.width} height={dimensions.height} />
      </div>
    </div>
  )
}
