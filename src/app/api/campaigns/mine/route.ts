import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json([])
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
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
