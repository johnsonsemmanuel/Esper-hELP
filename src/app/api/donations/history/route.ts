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
