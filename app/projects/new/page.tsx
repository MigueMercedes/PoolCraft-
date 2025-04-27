import { ProjectForm } from "@/components/projects/project-form"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function NewProjectPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ProjectForm />
    </div>
  )
}
