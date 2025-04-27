"use client"

import type { PoolConfig, StairsPosition } from "@/types"
import { ShapeSelector } from "./shape-selector"
import { DimensionsInput } from "./dimensions-input"
import { MaterialSelector } from "./material-selector"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PoolFormProps {
  config: PoolConfig
  onChange: (config: Partial<PoolConfig>) => void
}

export function PoolForm({ config, onChange }: PoolFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Forma de la Piscina</h3>
        <ShapeSelector value={config.shape} onChange={(shape) => onChange({ shape })} />
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Dimensiones</h3>
        <DimensionsInput
          width={config.width}
          length={config.length}
          depth={config.depth}
          cornerRadius={config.cornerRadius}
          onChange={(dimensions) => onChange(dimensions)}
          showCornerRadius={config.shape !== "CUSTOM"}
        />
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Materiales y Acabados</h3>
        <MaterialSelector
          material={config.material}
          finish={config.finish}
          color={config.color}
          onChange={(materials) => onChange(materials)}
        />
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Características Adicionales</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="hasStairs">Escaleras</Label>
            <Switch
              id="hasStairs"
              checked={config.hasStairs}
              onCheckedChange={(checked) => onChange({ hasStairs: checked })}
            />
          </div>

          {config.hasStairs && (
            <div className="space-y-2">
              <Label>Posición de Escaleras</Label>
              <RadioGroup
                value={config.stairsPosition}
                onValueChange={(value) => onChange({ stairsPosition: value as StairsPosition })}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TOP_LEFT" id="top-left" />
                  <Label htmlFor="top-left">Superior Izquierda</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TOP_RIGHT" id="top-right" />
                  <Label htmlFor="top-right">Superior Derecha</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BOTTOM_LEFT" id="bottom-left" />
                  <Label htmlFor="bottom-left">Inferior Izquierda</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BOTTOM_RIGHT" id="bottom-right" />
                  <Label htmlFor="bottom-right">Inferior Derecha</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
