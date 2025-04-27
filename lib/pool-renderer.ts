import type { PoolConfig } from "@/types"

export function renderPool(svgElement: SVGSVGElement, config: PoolConfig): { width: number; height: number } {
  // Limpiar SVG
  while (svgElement.firstChild) {
    svgElement.removeChild(svgElement.firstChild)
  }

  // Calcular dimensiones y escala
  const padding = 40
  const maxWidth = 800 - padding * 2
  const maxHeight = 600 - padding * 2

  const aspectRatio = config.length / config.width
  let width, height

  if (aspectRatio > maxWidth / maxHeight) {
    // Limitar por ancho
    width = maxWidth
    height = width / aspectRatio
  } else {
    // Limitar por alto
    height = maxHeight
    width = height * aspectRatio
  }

  // Crear elemento de piscina según la forma
  let poolElement: SVGElement

  switch (config.shape) {
    case "RECTANGLE":
      poolElement = createRectangle(svgElement, width, height, config)
      break
    case "OVAL":
      poolElement = createOval(svgElement, width, height, config)
      break
    case "KIDNEY":
      poolElement = createKidney(svgElement, width, height, config)
      break
    case "CUSTOM":
      poolElement = createCustom(svgElement, width, height, config)
      break
    default:
      poolElement = createRectangle(svgElement, width, height, config)
  }

  // Añadir escaleras si es necesario
  if (config.hasStairs && config.stairsPosition) {
    addStairs(svgElement, width, height, config)
  }

  // Centrar en el SVG
  const viewBox = `${-padding} ${-padding} ${width + padding * 2} ${height + padding * 2}`
  svgElement.setAttribute("viewBox", viewBox)

  return { width, height }
}

function createRectangle(svgElement: SVGSVGElement, width: number, height: number, config: PoolConfig): SVGElement {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")

  rect.setAttribute("x", "0")
  rect.setAttribute("y", "0")
  rect.setAttribute("width", width.toString())
  rect.setAttribute("height", height.toString())

  if (config.cornerRadius) {
    const cornerRadius = Math.min(
      config.cornerRadius * Math.min(width / config.width, height / config.length),
      Math.min(width, height) / 4, // Limitar a 1/4 de la dimensión más pequeña
    )
    rect.setAttribute("rx", cornerRadius.toString())
    rect.setAttribute("ry", cornerRadius.toString())
  }

  rect.setAttribute("fill", config.color)
  rect.setAttribute("stroke", "#000")
  rect.setAttribute("stroke-width", "2")

  svgElement.appendChild(rect)
  return rect
}

function createOval(svgElement: SVGSVGElement, width: number, height: number, config: PoolConfig): SVGElement {
  const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse")

  ellipse.setAttribute("cx", (width / 2).toString())
  ellipse.setAttribute("cy", (height / 2).toString())
  ellipse.setAttribute("rx", (width / 2).toString())
  ellipse.setAttribute("ry", (height / 2).toString())

  ellipse.setAttribute("fill", config.color)
  ellipse.setAttribute("stroke", "#000")
  ellipse.setAttribute("stroke-width", "2")

  svgElement.appendChild(ellipse)
  return ellipse
}

function createKidney(svgElement: SVGSVGElement, width: number, height: number, config: PoolConfig): SVGElement {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

  // Crear forma de riñón
  const indentSize = width * 0.2
  const indentPosition = height * 0.3
  const indentHeight = height * 0.4

  const d = `
    M ${width},${height / 2}
    A ${width / 2},${height / 2} 0 0 1 ${width / 2},${height}
    A ${width / 2},${height / 2} 0 0 1 0,${height / 2}
    A ${width / 2},${height / 2} 0 0 1 ${width / 2},0
    A ${width / 2},${height / 2} 0 0 1 ${width},${height / 2}
    Z
    M ${width - indentSize},${indentPosition}
    A ${indentSize},${indentHeight / 2} 0 0 0 ${width - indentSize},${indentPosition + indentHeight}
    A ${indentSize * 2},${indentHeight} 0 0 1 ${width - indentSize},${indentPosition}
    Z
  `

  path.setAttribute("d", d)
  path.setAttribute("fill", config.color)
  path.setAttribute("stroke", "#000")
  path.setAttribute("stroke-width", "2")

  svgElement.appendChild(path)
  return path
}

function createCustom(svgElement: SVGSVGElement, width: number, height: number, config: PoolConfig): SVGElement {
  // Para la forma personalizada, usamos un polígono simple
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")

  const points = [
    `0,0`,
    `${width * 0.7},0`,
    `${width},${height * 0.3}`,
    `${width},${height}`,
    `${width * 0.3},${height}`,
    `0,${height * 0.7}`,
  ].join(" ")

  polygon.setAttribute("points", points)
  polygon.setAttribute("fill", config.color)
  polygon.setAttribute("stroke", "#000")
  polygon.setAttribute("stroke-width", "2")

  svgElement.appendChild(polygon)
  return polygon
}

function addStairs(svgElement: SVGSVGElement, width: number, height: number, config: PoolConfig): void {
  const stairsWidth = width * 0.15
  const stairsHeight = height * 0.15

  let x = 0
  let y = 0

  switch (config.stairsPosition) {
    case "TOP_LEFT":
      x = 0
      y = 0
      break
    case "TOP_RIGHT":
      x = width - stairsWidth
      y = 0
      break
    case "BOTTOM_LEFT":
      x = 0
      y = height - stairsHeight
      break
    case "BOTTOM_RIGHT":
      x = width - stairsWidth
      y = height - stairsHeight
      break
    default:
      x = 0
      y = 0
  }

  // Crear escaleras
  const stairs = document.createElementNS("http://www.w3.org/2000/svg", "rect")

  stairs.setAttribute("x", x.toString())
  stairs.setAttribute("y", y.toString())
  stairs.setAttribute("width", stairsWidth.toString())
  stairs.setAttribute("height", stairsHeight.toString())
  stairs.setAttribute("fill", "#fff")
  stairs.setAttribute("stroke", "#000")
  stairs.setAttribute("stroke-width", "1")

  // Añadir líneas para representar los escalones
  const numSteps = 3
  const stepHeight = stairsHeight / numSteps

  for (let i = 1; i < numSteps; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line.setAttribute("x1", x.toString())
    line.setAttribute("y1", (y + i * stepHeight).toString())
    line.setAttribute("x2", (x + stairsWidth).toString())
    line.setAttribute("y2", (y + i * stepHeight).toString())
    line.setAttribute("stroke", "#000")
    line.setAttribute("stroke-width", "1")
    svgElement.appendChild(line)
  }

  svgElement.appendChild(stairs)
}
