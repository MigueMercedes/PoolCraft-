import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)

    // Verificar que el proyecto pertenece al usuario
    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    })

    if (!existingProject) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    // Verificar si ya existe una configuración para este proyecto
    const existingConfig = await prisma.poolConfig.findUnique({
      where: {
        projectId,
      },
    })

    if (existingConfig) {
      return NextResponse.json({ error: "Ya existe una configuración para este proyecto" }, { status: 400 })
    }

    const {
      shape,
      width,
      length,
      depth,
      cornerRadius,
      material,
      finish,
      color,
      hasStairs,
      stairsPosition,
      customShapeData,
    } = await request.json()

    const poolConfig = await prisma.poolConfig.create({
      data: {
        projectId,
        shape,
        width,
        length,
        depth,
        cornerRadius,
        material,
        finish,
        color,
        hasStairs,
        stairsPosition,
        customShapeData,
      },
    })

    return NextResponse.json(poolConfig, { status: 201 })
  } catch (error) {
    console.error("Error al crear configuración de piscina:", error)
    return NextResponse.json({ error: "Error al crear configuración de piscina" }, { status: 500 })
  }
}
