import { ProjectForm } from "@/components/projects/project-form"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function EditProjectPage({ params }: { params: { id: string } }) {
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
  })

  if (!project) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ProjectForm project={project} isEditing={true} />
    </div>
  )
}
