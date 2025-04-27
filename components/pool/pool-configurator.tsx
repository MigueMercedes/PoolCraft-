"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PoolForm } from "./pool-form"
import { PoolPreview } from "./pool-preview"
import { ExportButton } from "./export-button"
import type { PoolConfig } from "@/types"

interface PoolConfiguratorProps {
  projectId: number
  initialConfig?: PoolConfig
}

const defaultConfig: PoolConfig = {
  shape: "RECTANGLE",
  width: 4,
  length: 8,
  depth: 1.5,
  cornerRadius: 0.5,
  material: "concrete",
  finish: "plaster",
  color: "#0099ff",
  hasStairs: true,
  stairsPosition: "TOP_LEFT",
}

export function PoolConfigurator({ projectId, initialConfig }: PoolConfiguratorProps) {
  const router = useRouter()
  const [config, setConfig] = useState<PoolConfig>(initialConfig || { ...defaultConfig, projectId })
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("form")

  const handleConfigChange = (newConfig: Partial<PoolConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }))
  }

  const handleSave = async () => {
    setError(null)
    setIsSaving(true)

    try {
      const url = initialConfig?.id
        ? `/api/projects/${projectId}/pool-config/${initialConfig.id}`
        : `/api/projects/${projectId}/pool-config`
      const method = initialConfig?.id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar la configuración")
      }

      router.push(`/projects/${projectId}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la configuración")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Configurador de Piscina</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Guardando..." : "Guardar Configuración"}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <PoolForm config={config} onChange={handleConfigChange} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Vista Previa 2D</TabsTrigger>
                  <TabsTrigger value="specs">Especificaciones</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-0">
                  <div className="bg-white rounded-md border p-4 h-[500px] flex items-center justify-center">
                    <PoolPreview config={config} />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <ExportButton config={config} projectId={projectId} />
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="mt-0">
                  <div className="bg-white rounded-md border p-6">
                    <h3 className="text-xl font-bold mb-4">Especificaciones Técnicas</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-500">Forma</h4>
                        <p>
                          {config.shape === "RECTANGLE"
                            ? "Rectangular"
                            : config.shape === "OVAL"
                              ? "Ovalada"
                              : config.shape === "KIDNEY"
                                ? "Riñón"
                                : "Personalizada"}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500">Dimensiones</h4>
                        <p>
                          {config.width}m x {config.length}m
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500">Profundidad</h4>
                        <p>{config.depth}m</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500">Radio de Esquinas</h4>
                        <p>{config.cornerRadius}m</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500">Material</h4>
                        <p>
                          {config.material === "concrete"
                            ? "Hormigón"
                            : config.material === "fiberglass"
                              ? "Fibra de vidrio"
                              : config.material === "vinyl"
                                ? "Vinilo"
                                : "Gunite"}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500">Acabado</h4>
                        <p>
                          {config.finish === "plaster"
                            ? "Yeso"
                            : config.finish === "pebble"
                              ? "Guijarros"
                              : config.finish === "tile"
                                ? "Azulejos"
                                : "Cuarzo"}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500">Color</h4>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: config.color }}
                          />
                          <span>{config.color}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500">Escaleras</h4>
                        <p>{config.hasStairs ? "Sí" : "No"}</p>
                      </div>

                      {config.hasStairs && (
                        <div>
                          <h4 className="font-medium text-gray-500">Posición de Escaleras</h4>
                          <p>
                            {config.stairsPosition === "TOP_LEFT"
                              ? "Superior Izquierda"
                              : config.stairsPosition === "TOP_RIGHT"
                                ? "Superior Derecha"
                                : config.stairsPosition === "BOTTOM_LEFT"
                                  ? "Inferior Izquierda"
                                  : config.stairsPosition === "BOTTOM_RIGHT"
                                    ? "Inferior Derecha"
                                    : "Personalizada"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
