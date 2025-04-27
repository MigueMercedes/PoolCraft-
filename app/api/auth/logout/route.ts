import { NextResponse } from "next/server"
import { removeSessionCookie } from "@/lib/auth"

export async function POST() {
  try {
    await removeSessionCookie()
    return NextResponse.json({ message: "Sesión cerrada correctamente" })
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    return NextResponse.json({ error: "Error al cerrar sesión" }, { status: 500 })
  }
}
