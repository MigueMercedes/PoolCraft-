"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface MaterialSelectorProps {
  material: string
  finish: string
  color: string
  onChange: (materials: {
    material?: string
    finish?: string
    color?: string
  }) => void
}

export function MaterialSelector({ material, finish, color, onChange }: MaterialSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Material</Label>
        <RadioGroup
          value={material}
          onValueChange={(value) => onChange({ material: value })}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="concrete" id="concrete" />
            <Label htmlFor="concrete">Hormigón</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fiberglass" id="fiberglass" />
            <Label htmlFor="fiberglass">Fibra de vidrio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vinyl" id="vinyl" />
            <Label htmlFor="vinyl">Vinilo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gunite" id="gunite" />
            <Label htmlFor="gunite">Gunite</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="finish">Acabado</Label>
        <Select value={finish} onValueChange={(value) => onChange({ finish: value })}>
          <SelectTrigger id="finish">
            <SelectValue placeholder="Selecciona un acabado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plaster">Yeso</SelectItem>
            <SelectItem value="pebble">Guijarros</SelectItem>
            <SelectItem value="tile">Azulejos</SelectItem>
            <SelectItem value="quartz">Cuarzo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <div className="flex space-x-2">
          <Input
            id="color"
            type="color"
            value={color}
            onChange={(e) => onChange({ color: e.target.value })}
            className="w-12 h-10 p-1"
          />
          <Input value={color} onChange={(e) => onChange({ color: e.target.value })} className="flex-1" />
        </div>
      </div>
    </div>
  )
}
