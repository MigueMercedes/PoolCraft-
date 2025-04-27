import { PoolConfigurator } from "@/components/pool/pool-configurator"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function ConfigurePoolPage({ params }: { params: { id: string } }) {
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
      <PoolConfigurator projectId={project.id} initialConfig={project.poolConfig || undefined} />
    </div>
  )
}
