"use client"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface DimensionsInputProps {
  width: number
  length: number
  depth: number
  cornerRadius?: number
  showCornerRadius?: boolean
  onChange: (dimensions: {
    width?: number
    length?: number
    depth?: number
    cornerRadius?: number
  }) => void
}

export function DimensionsInput({
  width,
  length,
  depth,
  cornerRadius = 0,
  showCornerRadius = true,
  onChange,
}: DimensionsInputProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="width">Ancho</Label>
          <span className="text-sm text-gray-500">{width} m</span>
        </div>
        <Slider
          id="width"
          min={2}
          max={10}
          step={0.1}
          value={[width]}
          onValueChange={(value) => onChange({ width: value[0] })}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="length">Largo</Label>
          <span className="text-sm text-gray-500">{length} m</span>
        </div>
        <Slider
          id="length"
          min={2}
          max={20}
          step={0.1}
          value={[length]}
          onValueChange={(value) => onChange({ length: value[0] })}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="depth">Profundidad</Label>
          <span className="text-sm text-gray-500">{depth} m</span>
        </div>
        <Slider
          id="depth"
          min={0.5}
          max={3}
          step={0.1}
          value={[depth]}
          onValueChange={(value) => onChange({ depth: value[0] })}
        />
      </div>

      {showCornerRadius && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="cornerRadius">Radio de Esquinas</Label>
            <span className="text-sm text-gray-500">{cornerRadius} m</span>
          </div>
          <Slider
            id="cornerRadius"
            min={0}
            max={2}
            step={0.1}
            value={[cornerRadius || 0]}
            onValueChange={(value) => onChange({ cornerRadius: value[0] })}
          />
        </div>
      )}
    </div>
  )
}
