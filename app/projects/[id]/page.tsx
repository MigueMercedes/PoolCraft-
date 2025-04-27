import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { redirect } from "next/navigation"
import { PoolPreview } from "@/components/pool/pool-preview"
import { ExportButton } from "@/components/pool/export-button"

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
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
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Volver</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/projects/${project.id}/edit`}>Editar Proyecto</Link>
          </Button>
        </div>
      </div>

      {project.description && <p className="text-gray-600 mb-6">{project.description}</p>}

      <p className="text-sm text-gray-500 mb-8">Creado el {formatDate(project.createdAt)}</p>

      {project.poolConfig ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Piscina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-md border p-4 h-[400px] flex items-center justify-center">
                    <PoolPreview config={project.poolConfig} />
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-500">Forma</h3>
                      <p>
                        {project.poolConfig.shape === "RECTANGLE"
                          ? "Rectangular"
                          : project.poolConfig.shape === "OVAL"
                            ? "Ovalada"
                            : project.poolConfig.shape === "KIDNEY"
                              ? "Riñón"
                              : "Personalizada"}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-500">Dimensiones</h3>
                      <p>
                        {project.poolConfig.width}m x {project.poolConfig.length}m
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-500">Profundidad</h3>
                      <p>{project.poolConfig.depth}m</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-500">Material</h3>
                      <p>
                        {project.poolConfig.material === "concrete"
                          ? "Hormigón"
                          : project.poolConfig.material === "fiberglass"
                            ? "Fibra de vidrio"
                            : project.poolConfig.material === "vinyl"
                              ? "Vinilo"
                              : "Gunite"}
                      </p>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button asChild>
                        <Link href={`/projects/${project.id}/configure`}>Editar Configuración</Link>
                      </Button>
                      <ExportButton config={project.poolConfig} projectId={project.id} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Este proyecto aún no tiene una configuración de piscina</h2>
              <p className="text-gray-500 mb-6">Configura tu piscina para visualizarla y exportar los planos</p>
              <Button asChild>
                <Link href={`/projects/${project.id}/configure`}>Configurar Piscina</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
