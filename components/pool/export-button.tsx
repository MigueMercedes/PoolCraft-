"use client"

import { Button } from "@/components/ui/button"
import type { PoolConfig } from "@/types"
import { Download } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"

interface ExportButtonProps {
  config: PoolConfig
  projectId: number
}

export function ExportButton({ config, projectId }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      await generatePDF(config, projectId)
    } catch (error) {
      console.error("Error al exportar PDF:", error)
      alert("Error al generar el PDF. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <Button onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Exportar a PDF
    </Button>
  )
}
