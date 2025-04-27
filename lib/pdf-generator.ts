import type { PoolConfig } from "@/types"

export async function generatePDF(config: PoolConfig, projectId: number): Promise<void> {
  // En un entorno real, esto generaría un PDF usando jsPDF o similar
  // Para esta demo, simplemente mostramos un mensaje

  alert(`
    PDF generado con éxito!
    
    Configuración de Piscina:
    - Forma: ${getShapeName(config.shape)}
    - Dimensiones: ${config.width}m x ${config.length}m
    - Profundidad: ${config.depth}m
    - Material: ${getMaterialName(config.material)}
    - Acabado: ${getFinishName(config.finish)}
    - Color: ${config.color}
    
    En una implementación real, esto generaría un PDF con el plano y las especificaciones.
  `)
}

function getShapeName(shape: string): string {
  switch (shape) {
    case "RECTANGLE":
      return "Rectangular"
    case "OVAL":
      return "Ovalada"
    case "KIDNEY":
      return "Riñón"
    case "CUSTOM":
      return "Personalizada"
    default:
      return shape
  }
}

function getMaterialName(material: string): string {
  switch (material) {
    case "concrete":
      return "Hormigón"
    case "fiberglass":
      return "Fibra de vidrio"
    case "vinyl":
      return "Vinilo"
    case "gunite":
      return "Gunite"
    default:
      return material
  }
}

function getFinishName(finish: string): string {
  switch (finish) {
    case "plaster":
      return "Yeso"
    case "pebble":
      return "Guijarros"
    case "tile":
      return "Azulejos"
    case "quartz":
      return "Cuarzo"
    default:
      return finish
  }
}
