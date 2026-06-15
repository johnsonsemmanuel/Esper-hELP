import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const sort = searchParams.get("sort") || "newest"
  const limit = parseInt(searchParams.get("limit") || "12")
  const page = parseInt(searchParams.get("page") || "1")

  const where: any = {
    status: "active",
  }

  if (query) {
    where.OR = [
      { title: { contains: query } },
      { story: { contains: query } },
    ]
  }

  if (category) {
    where.category = { slug: category }
  }

  let orderBy: any = { createdAt: "desc" }
  switch (sort) {
    case "most_funded":
      orderBy = { raisedAmount: "desc" }
      break
    case "most_donors":
      orderBy = { donations: { _count: "desc" } }
      break
    case "ending_soon":
      orderBy = { deadline: "asc" }
      break
  }

  try {
    const campaigns = await prisma.campaign.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        _count: { select: { donations: true } },
        user: { select: { name: true, image: true } },
      },
    })

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json([], { status: 500 })
  }
}
