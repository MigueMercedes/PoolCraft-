import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import type { User } from "@/types"
import bcrypt from "bcryptjs"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_please_change")

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(user: User): Promise<string> {
  // Eliminar la contraseña del objeto de usuario
  const { password, ...userWithoutPassword } = user

  // Crear un token JWT
  const token = await new SignJWT({ user: userWithoutPassword })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  return token
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get("session")?.value

  if (!token) return null

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as { user: User }
  } catch (err) {
    return null
  }
}

export async function setSessionCookie(token: string) {
  cookies().set({
    name: "session",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 semana
  })
}

export async function removeSessionCookie() {
  cookies().delete("session")
}
