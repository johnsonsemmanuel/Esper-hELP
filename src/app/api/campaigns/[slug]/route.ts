import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await props.params
    const campaign = await prisma.campaign.findUnique({
      where: { slug },
      include: {
        category: true,
        user: { select: { name: true, image: true } },
        updates: { orderBy: { createdAt: "desc" } },
        donations: {
          where: { status: "successful" },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        media: true,
        _count: { select: { donations: true } },
      },
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 })
  }
}
