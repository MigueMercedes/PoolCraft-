"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types"
import { formatDate } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  onDelete: (id: number) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {project.description ? (
          <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">Sin descripción</p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Creado: {project.createdAt ? formatDate(project.createdAt) : "Fecha desconocida"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/projects/${project.id}`}>Ver</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/projects/${project.id}/edit`}>Editar</Link>
        </Button>
        <Button variant="destructive" onClick={() => project.id && onDelete(project.id)}>
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  )
}
