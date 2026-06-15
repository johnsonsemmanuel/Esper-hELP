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

    const donations = await prisma.donation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        campaign: { select: { title: true, slug: true } },
      },
    })

    return NextResponse.json(donations)
  } catch (error) {
    console.error("Donation history error:", error)
    return NextResponse.json([])
  }
}
