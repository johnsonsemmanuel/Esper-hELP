import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ campaigns: [], stats: { totalCampaigns: 0, totalRaised: 0, totalDonors: 0, activeCampaigns: 0 } })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) {
      return NextResponse.json({ campaigns: [], stats: { totalCampaigns: 0, totalRaised: 0, totalDonors: 0, activeCampaigns: 0 } })
    }

    const campaigns = await prisma.campaign.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { donations: true } },
      },
    })

    const stats = {
      totalCampaigns: campaigns.length,
      totalRaised: campaigns.reduce((sum, c) => sum + c.raisedAmount, 0),
      totalDonors: campaigns.reduce((sum, c) => sum + c._count.donations, 0),
      activeCampaigns: campaigns.filter((c) => c.status === "active").length,
    }

    return NextResponse.json({ campaigns, stats })
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ campaigns: [], stats: { totalCampaigns: 0, totalRaised: 0, totalDonors: 0, activeCampaigns: 0 } })
  }
}
