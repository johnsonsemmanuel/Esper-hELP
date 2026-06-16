import "dotenv/config"
import { PrismaClient } from "../generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const tursoUrl = process.env["TURSO_DATABASE_URL"]
const tursoToken = process.env["TURSO_AUTH_TOKEN"]

const adapter = new PrismaLibSql(
  tursoUrl
    ? { url: tursoUrl, authToken: tursoToken }
    : { url: process.env["DATABASE_URL"] || "file:./prisma/dev.db" },
)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
