import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { prisma } from "./prisma"
import { compare } from "bcryptjs"

const secret = new TextEncoder().encode(
  process.env["AUTH_SECRET"] || "super-secret-key-change-in-production-abc123xyz"
)

export interface AuthUser {
  id: string
  email: string
  name: string | null
  image: string | null
}

export async function createToken(user: AuthUser): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, name: user.name, picture: user.image })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: (payload.name as string) || null,
      image: (payload.picture as string) || null,
    }
  } catch {
    return null
  }
}

export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  if (!token) return null
  return verifyToken(token)
}

export async function validateCredentials(email: string, password: string): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) return null
  const isValid = await compare(password, user.password)
  if (!isValid) return null
  return { id: user.id, email: user.email, name: user.name, image: user.image }
}
