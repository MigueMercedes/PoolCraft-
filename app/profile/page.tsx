import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      _count: {
        select: {
          projects: true,
        },
      },
    },
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Detalles de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
              <p>{user.name || "No especificado"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Correo Electrónico</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Miembro desde</h3>
              <p>{formatDate(user.createdAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Proyectos</h3>
              <p>{user._count.projects}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">Editar Perfil</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
