import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string; configId: string } }) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)
    const configId = Number.parseInt(params.configId)

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

    const poolConfig = await prisma.poolConfig.findUnique({
      where: {
        id: configId,
        projectId,
      },
    })

    if (!poolConfig) {
      return NextResponse.json({ error: "Configuración de piscina no encontrada" }, { status: 404 })
    }

    return NextResponse.json(poolConfig)
  } catch (error) {
    console.error("Error al obtener configuración de piscina:", error)
    return NextResponse.json({ error: "Error al obtener configuración de piscina" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string; configId: string } }) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)
    const configId = Number.parseInt(params.configId)

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

    // Verificar que la configuración existe
    const existingConfig = await prisma.poolConfig.findUnique({
      where: {
        id: configId,
        projectId,
      },
    })

    if (!existingConfig) {
      return NextResponse.json({ error: "Configuración de piscina no encontrada" }, { status: 404 })
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

    const updatedPoolConfig = await prisma.poolConfig.update({
      where: {
        id: configId,
      },
      data: {
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

    return NextResponse.json(updatedPoolConfig)
  } catch (error) {
    console.error("Error al actualizar configuración de piscina:", error)
    return NextResponse.json({ error: "Error al actualizar configuración de piscina" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string; configId: string } }) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)
    const configId = Number.parseInt(params.configId)

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

    // Verificar que la configuración existe
    const existingConfig = await prisma.poolConfig.findUnique({
      where: {
        id: configId,
        projectId,
      },
    })

    if (!existingConfig) {
      return NextResponse.json({ error: "Configuración de piscina no encontrada" }, { status: 404 })
    }

    await prisma.poolConfig.delete({
      where: {
        id: configId,
      },
    })

    return NextResponse.json({ message: "Configuración de piscina eliminada correctamente" })
  } catch (error) {
    console.error("Error al eliminar configuración de piscina:", error)
    return NextResponse.json({ error: "Error al eliminar configuración de piscina" }, { status: 500 })
  }
}
