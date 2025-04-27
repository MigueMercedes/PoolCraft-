import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Acerca de PoolCraft</h1>

        <div className="prose prose-blue max-w-none">
          <p className="text-xl mb-8">
            PoolCraft es un configurador paramétrico de piscinas que te permite diseñar y visualizar tu piscina ideal de
            manera sencilla y profesional.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestra Misión</h2>
          <p>
            Nuestra misión es simplificar el proceso de diseño de piscinas, permitiendo a los usuarios visualizar sus
            ideas antes de la construcción. Creemos que la planificación adecuada es clave para el éxito de cualquier
            proyecto.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Características Principales</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Configuración paramétrica de forma, dimensiones y materiales</li>
            <li>Visualización 2D en tiempo real con cotas</li>
            <li>Exportación de planos a PDF con especificaciones técnicas</li>
            <li>Gestión de múltiples proyectos</li>
            <li>Interfaz intuitiva y fácil de usar</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Tecnologías Utilizadas</h2>
          <p>
            PoolCraft está construido con tecnologías modernas para garantizar una experiencia de usuario fluida y
            eficiente:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Next.js 15 con App Router para una navegación rápida y eficiente</li>
            <li>Prisma ORM para una gestión de base de datos segura y tipada</li>
            <li>PostgreSQL para almacenamiento de datos robusto</li>
            <li>Tailwind CSS para un diseño responsivo y moderno</li>
            <li>SVG para renderizado vectorial de alta calidad</li>
          </ul>

          <div className="mt-12 text-center">
            <p className="text-lg mb-6">¿Listo para comenzar a diseñar tu piscina ideal?</p>
            <Button size="lg" asChild>
              <Link href="/register">Comenzar Ahora</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
