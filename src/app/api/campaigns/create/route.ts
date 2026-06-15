import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.email } })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await req.json()
    const { title, slug, story, goalAmount, currency, categoryId, location, country, deadline, coverImage, videoUrl } = body

    const category = categoryId
      ? await prisma.category.findUnique({ where: { slug: categoryId } })
      : null

    const campaign = await prisma.campaign.create({
      data: {
        title,
        slug,
        story,
        goalAmount,
        currency: currency || "NGN",
        status: "active",
        categoryId: category?.id || null,
        location,
        country,
        userId: user.id,
        coverImage,
        videoUrl,
        deadline: deadline ? new Date(deadline) : null,
      },
    })

    await prisma.activity.create({
      data: {
        userId: user.id,
        type: "campaign_created",
        description: `Created campaign "${title}"`,
        campaignId: campaign.id,
      },
    })

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("Create campaign error:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
