import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Definir rutas públicas
  const isPublicPath =
    path === "/" || path === "/login" || path === "/register" || path === "/about" || path.startsWith("/api/auth")

  // Obtener el token de la cookie
  const token = request.cookies.get("session")?.value

  // Redirigir a login si no hay token y la ruta no es pública
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirigir a dashboard si hay token y la ruta es login o register
  if ((path === "/login" || path === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configurar las rutas que deben ser procesadas por el middleware
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. Todas las rutas que comienzan con /api/auth (autenticación API)
     * 2. Todas las rutas que comienzan con /_next (archivos estáticos de Next.js)
     * 3. Todas las rutas que contienen un archivo (archivos estáticos)
     */
    "/((?!api/auth|_next|.*\\..*).*)",
  ],
}
