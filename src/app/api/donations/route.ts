import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { generateReference } from "@/lib/utils"

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    const body = await req.json()
    const { campaignId, amount, currency, donorName, donorEmail, message, anonymous } = body

    if (!campaignId || !amount || amount < 100) {
      return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 })
    }

    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } })
    if (!campaign || campaign.status !== "active") {
      return NextResponse.json({ error: "Campaign not available" }, { status: 400 })
    }

    const user = session?.email
      ? await prisma.user.findUnique({ where: { email: session.email } })
      : null

    const reference = generateReference()

    // Create pending donation
    await prisma.donation.create({
      data: {
        amount,
        currency: currency || campaign.currency,
        status: "pending",
        campaignId,
        userId: user?.id || null,
        donorName: anonymous ? "Anonymous" : (donorName || "Anonymous"),
        donorEmail: donorEmail || user?.email,
        message,
        anonymous,
        reference,
      },
    })

    // For now, simulate successful donation (in production, integrate Paystack/Flutterwave)
    // Update donation to successful and add to campaign
    await prisma.donation.update({
      where: { reference },
      data: { status: "successful" },
    })

    await prisma.campaign.update({
      where: { id: campaignId },
      data: { raisedAmount: { increment: amount } },
    })

    if (campaign.userId) {
      await prisma.activity.create({
        data: {
          userId: campaign.userId,
          type: "donation_received",
          description: `Received ${currency || campaign.currency} ${amount.toLocaleString()} donation`,
          campaignId,
        },
      })
    }

    return NextResponse.json({ success: true, reference })
  } catch (error) {
    console.error("Donation error:", error)
    return NextResponse.json({ error: "Donation failed" }, { status: 500 })
  }
}
