import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()
    if (!session?.email) {
      return NextResponse.json([])
    }

    const user = await prisma.user.findUnique({ where: { email: session.email } })
    if (!user) {
      return NextResponse.json([])
    }

    const campaigns = await prisma.campaign.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        _count: { select: { donations: true } },
      },
    })

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("My campaigns error:", error)
    return NextResponse.json([])
  }
}
