import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: session.user.id,
      },
      include: {
        poolConfig: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error al obtener proyecto:", error)
    return NextResponse.json({ error: "Error al obtener proyecto" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)
    const { name, description } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "El nombre del proyecto es obligatorio" }, { status: 400 })
    }

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

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        description,
      },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error al actualizar proyecto:", error)
    return NextResponse.json({ error: "Error al actualizar proyecto" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    })

    return NextResponse.json({ message: "Proyecto eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar proyecto:", error)
    return NextResponse.json({ error: "Error al eliminar proyecto" }, { status: 500 })
  }
}
