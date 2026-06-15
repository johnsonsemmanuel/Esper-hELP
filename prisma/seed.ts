import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import { hash } from "bcryptjs"

const dbUrl = process.env["DATABASE_URL"] || "file:./prisma/dev.db"
const adapter = new PrismaLibSql({ url: dbUrl })
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── Categories ──
  const categories = [
    { name: "Business & Startup", slug: "business-startup", description: "Fund your business idea or startup", icon: "briefcase" },
    { name: "Community & Social", slug: "community-social", description: "Support community projects and social causes", icon: "users" },
    { name: "Education & Training", slug: "education-training", description: "Raise funds for education and skill development", icon: "graduation-cap" },
    { name: "Health & Medical", slug: "health-medical", description: "Medical bills, treatments, and health initiatives", icon: "heart-pulse" },
    { name: "Agriculture & Farming", slug: "agriculture-farming", description: "Agricultural projects and farming initiatives", icon: "wheat" },
    { name: "Technology & Innovation", slug: "technology-innovation", description: "Tech projects, apps, and innovative solutions", icon: "cpu" },
    { name: "Arts & Culture", slug: "arts-culture", description: "Creative projects, art, music, and cultural events", icon: "palette" },
    { name: "Emergency & Crisis", slug: "emergency-crisis", description: "Emergency relief and crisis support", icon: "alert-triangle" },
    { name: "Environment & Sustainability", slug: "environment-sustainability", description: "Environmental projects and green initiatives", icon: "leaf" },
    { name: "Sports & Recreation", slug: "sports-recreation", description: "Sports teams, events, and recreational projects", icon: "trophy" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }
  console.log("✓ Categories seeded")

  // ── Demo Users ──
  const password = await hash("password123", 12)

  const users = [
    {
      name: "Kwame Asante",
      email: "kwame@example.com",
      password,
      userType: "business",
      location: "Accra, Ghana",
      businessName: "Asante Ventures Ltd",
      businessRegNumber: "CS-2024-5678",
      businessTin: "TIN-GH-123456789",
      businessAddress: "45 Independence Avenue, Accra, Ghana",
    },
    {
      name: "Amara Okafor",
      email: "amara@example.com",
      password,
      userType: "business",
      location: "Lagos, Nigeria",
      businessName: "Mama Fresh Foods Ltd",
      businessRegNumber: "RC-3456789",
      businessTin: "TIN-NG-987654321",
      businessAddress: "12 Awolowo Road, Ikoyi, Lagos",
    },
    {
      name: "Jane Wanjiku",
      email: "jane@example.com",
      password,
      userType: "individual",
      location: "Nairobi, Kenya",
    },
    {
      name: "Emmanuel Sowah",
      email: "emmanuel@example.com",
      password,
      userType: "individual",
      location: "Kumasi, Ghana",
    },
    {
      name: "Grace Osei",
      email: "grace@example.com",
      password,
      userType: "nonprofit",
      location: "Accra, Ghana",
      businessName: "Grace Foundation",
      businessRegNumber: "NGO-GH-2024-001",
      businessTin: "TIN-GH-456789012",
      businessAddress: "23 Ring Road, Accra, Ghana",
    },
  ]

  const createdUsers: any[] = []
  for (const user of users) {
    const existing = await prisma.user.findUnique({ where: { email: user.email } })
    if (existing) {
      createdUsers.push(existing)
      continue
    }
    const created = await prisma.user.create({ data: user })
    createdUsers.push(created)
  }
  console.log("✓ Demo users created")

  const [kwame, amara, jane, emmanuel, grace] = createdUsers

  // ── Campaigns ──
  function slug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim() + "-" + Date.now().toString(36)
  }

  const cat = (slug: string) => prisma.category.findUnique({ where: { slug } })

  const campaigns = [
    // ── BUSINESS CAMPAIGNS ──
    {
      title: "TechUp Africa — Scaling Ghana's Largest EdTech Platform",
      slug: slug("TechUp Africa EdTech"),
      story: `At TechUp Africa, we're on a mission to bring quality coding education to every Ghanaian student. Over the past 3 years, we've taught 5,000+ students across Accra, Kumasi, and Takoradi.

We're raising ₵15,000,000 to:
• Build a mobile app that works on low-end smartphones
• Train 200 teachers in underserved communities
• Provide 10,000 scholarships to girls in STEM
• Expand to all 16 regions of Ghana

Every cedi counts. Support the next generation of Ghanaian tech leaders! 🇬🇭`,
      goalAmount: 15000000,
      raisedAmount: 12450000,
      currency: "GHS",
      status: "active",
      campaignType: "business",
      location: "Accra, Ghana",
      coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
      featured: true,
      userId: kwame.id,
      categorySlug: "technology-innovation",
    },
    {
      title: "Akosombo Textiles — Reviving Ghana's Kente Weaving Industry",
      slug: slug("Akosombo Textiles"),
      story: `I'm Nana Yaw, a third-generation kente weaver from Akosombo. Our traditional weaving industry is struggling against cheap imported fabrics.

With ₵500,000, we will:
• Purchase modern looms that double production speed
• Train 50 young apprentices in traditional weaving
• Create an online marketplace for Ghanaian kente
• Export to international markets

Help us preserve Ghana's cultural heritage while creating sustainable jobs.`,
      goalAmount: 500000,
      raisedAmount: 125000,
      currency: "GHS",
      status: "active",
      campaignType: "business",
      location: "Akosombo, Ghana",
      coverImage: "https://images.unsplash.com/photo-1601599969562-29325e4f4552?w=800&h=400&fit=crop",
      featured: false,
      userId: kwame.id,
      categorySlug: "business-startup",
    },
    {
      title: "Mama Fresh Catering — From Home Kitchen to Restaurant Chain",
      slug: slug("Mama Fresh Catering"),
      story: `I'm Amara Okafor, and my jollof rice is legendary in Surulere! For 7 years I've been cooking from home, feeding hundreds of Lagosians daily.

With ₦8,000,000, I'll open my first restaurant:
• Rent and renovate a space in Ikeja
• Hire 10 staff from the local community
• Buy industrial kitchen equipment
• Launch a delivery app

Nigeria's best jollof deserves a permanent home! 🇳🇬`,
      goalAmount: 8000000,
      raisedAmount: 4800000,
      currency: "NGN",
      status: "active",
      campaignType: "business",
      location: "Ikeja, Lagos, Nigeria",
      coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop",
      featured: true,
      userId: amara.id,
      categorySlug: "business-startup",
    },
    {
      title: "SolarKazi — Powering Kenyan Schools with Clean Energy",
      slug: slug("SolarKazi Kenya"),
      story: `Many schools in rural Kenya have no electricity. SolarKazi installs solar panels in off-grid schools so students can study after dark.

We need KES 5,000,000 to:
• Install solar in 25 rural schools
• Train local youth as solar technicians
• Provide battery storage for 100+ computers
• Monitor and maintain systems for 3 years

Every child deserves light to study by. Help us power Kenya's future! ☀️`,
      goalAmount: 5000000,
      raisedAmount: 2100000,
      currency: "KES",
      status: "active",
      campaignType: "business",
      location: "Nairobi, Kenya",
      coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop",
      featured: false,
      userId: jane.id,
      categorySlug: "technology-innovation",
    },
    {
      title: "Umoja Fashion House — Tanzania's Sustainable Fashion Brand",
      slug: slug("Umoja Fashion House"),
      story: `I'm Zuri from Dar es Salaam. I design contemporary fashion using traditional Kitenge fabrics, creating jobs for local tailors.

With TZS 30,000,000 I'll:
• Rent a flagship store in Dar es Salaam
• Hire 15 local tailors and artisans
• Launch an e-commerce site for international shipping
• Create a training program for young women

African fashion deserves a global stage. Support sustainable style!`,
      goalAmount: 30000000,
      raisedAmount: 4500000,
      currency: "KES",
      status: "active",
      campaignType: "business",
      location: "Dar es Salaam, Tanzania",
      coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
      featured: false,
      userId: jane.id,
      categorySlug: "arts-culture",
    },

    // ── PERSONAL CAUSES ──
    {
      title: "Adom's University Dream — School Fees Fundraiser",
      slug: slug("Adom School Fees"),
      story: `Hi, I'm Adom, 18 years old from Kumasi. I got accepted to Kwame Nkrumah University to study Computer Science, but my family can't afford the fees.

I need ₵8,000 for my first year:
• Tuition: ₵4,500
• Accommodation: ₵2,000
• Books & supplies: ₵1,000
• Living expenses: ₵500

I promise to work hard and make every contributor proud. My dream is to build apps that solve Ghanaian problems. Any amount helps! 🙏`,
      goalAmount: 8000,
      raisedAmount: 8000,
      currency: "GHS",
      status: "active",
      campaignType: "personal",
      location: "Kumasi, Ghana",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c296?w=800&h=400&fit=crop",
      featured: false,
      userId: emmanuel.id,
      categorySlug: "education-training",
    },
    {
      title: "Naomi's Kidney Dialysis — Help Save My Sister",
      slug: slug("Naomi Kidney Dialysis"),
      story: `My sister Naomi (24) was diagnosed with chronic kidney disease. She needs dialysis twice weekly while waiting for a transplant.

We're raising ₦3,000,000 for:
• Dialysis sessions: ₦150,000/week
• Medications: ₦80,000/month
• Transplant surgery fund: ₦2,000,000
• Post-surgery care: ₦500,000

Naomi is a vibrant young woman who dreams of becoming a nurse. Please help us give her a second chance at life. Every naira brings her closer to recovery. ❤️`,
      goalAmount: 3000000,
      raisedAmount: 2160000,
      currency: "NGN",
      status: "active",
      campaignType: "personal",
      location: "Surulere, Lagos, Nigeria",
      coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
      featured: true,
      userId: amara.id,
      categorySlug: "health-medical",
    },
    {
      title: "Borehole for Bawku Community — Clean Water Now",
      slug: slug("Bawku Borehole"),
      story: `Our community of 2,000 people in Bawku, Upper East Region, has no access to clean water. Women and children walk 5km daily for water.

We need ₵120,000 to:
• Drill a mechanized borehole
• Install a solar-powered pump
• Build a 10,000-litre storage tank
• Create a water committee for maintenance

Clean water changes everything — health, education, dignity. Help us bring water to Bawku! 💧`,
      goalAmount: 120000,
      raisedAmount: 54000,
      currency: "GHS",
      status: "active",
      campaignType: "personal",
      location: "Bawku, Upper East Region, Ghana",
      coverImage: "https://images.unsplash.com/photo-1542321937-0418a3d2c330?w=800&h=400&fit=crop",
      featured: false,
      userId: emmanuel.id,
      categorySlug: "community-social",
    },

    // ── NGO / NONPROFIT CAMPAIGNS ──
    {
      title: "Feed 500 Children in Accra — Christmas Outreach 2025",
      slug: slug("Feed 500 Children"),
      story: `This Christmas, Grace Foundation wants to feed 500 children in the Jamestown and Nima communities of Accra. Many of these kids eat only one meal a day.

₵250,000 will provide:
• Nutritious meals for 500 children for 1 month
• School supplies for 200 kids
• Health screening and deworming
• Christmas celebration with gifts

Join us to put smiles on the faces of 500 children. No child should go to bed hungry in Ghana. 🎄`,
      goalAmount: 250000,
      raisedAmount: 95000,
      currency: "GHS",
      status: "active",
      campaignType: "personal",
      location: "Accra, Ghana",
      coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop",
      featured: false,
      userId: grace.id,
      categorySlug: "community-social",
    },
    {
      title: "Plant a Million Trees — Restoring Ghana's Forests",
      slug: slug("Plant a Million Trees"),
      story: `Ghana has lost 60% of its forest cover in the last 30 years. Grace Foundation is fighting back with our "Plant a Million Trees" initiative.

We need ₵1,000,000 to:
• Grow 1 million seedlings in 5 nurseries
• Employ 100 local community members
• Plant across 2,000 hectares in 5 regions
• Monitor survival rates for 3 years

Each tree planted is an investment in our children's future. Help us reforest Ghana! 🌳`,
      goalAmount: 1000000,
      raisedAmount: 220000,
      currency: "GHS",
      status: "active",
      campaignType: "personal",
      location: "Eastern Region, Ghana",
      coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
      featured: true,
      userId: grace.id,
      categorySlug: "environment-sustainability",
    },
  ]

  for (const c of campaigns) {
    const category = await cat(c.categorySlug)
    if (!category) continue

    const existing = await prisma.campaign.findFirst({ where: { slug: c.slug } })
    if (existing) continue

    await prisma.campaign.create({
      data: {
        title: c.title,
        slug: c.slug,
        story: c.story,
        goalAmount: c.goalAmount,
        raisedAmount: c.raisedAmount,
        currency: c.currency,
        status: c.status,
        campaignType: c.campaignType,
        location: c.location,
        coverImage: c.coverImage,
        featured: c.featured,
        userId: c.userId,
        categoryId: category.id,
      },
    })
  }
  console.log("✓ Campaigns seeded")

  // ── Donations ──
  const allCampaigns = await prisma.campaign.findMany({ take: 5 })
  const supporterNames = [
    "Kojo Mensah", "Ama Serwaa", "Yaw Boateng", "Efua Sarpong",
    "Chidi Okonkwo", "Nkechi Eze", "Tunde Balogun", "Funmi Adebayo",
    "Wanjiku Kimani", "Otieno Omondi", "Akinyi Odhiambo",
    "Nana Akuffo", "Abena Osei", "Kwesi Appiah",
  ]

  for (const campaign of allCampaigns) {
    const numDonations = 3 + Math.floor(Math.random() * 5)
    for (let i = 0; i < numDonations; i++) {
      const amount = [5000, 10000, 20000, 50000, 100000, 200000][Math.floor(Math.random() * 6)]
      const name = supporterNames[Math.floor(Math.random() * supporterNames.length)]
      const ref = "HLP-" + Math.random().toString(36).substring(2, 12).toUpperCase()

      const existing = await prisma.donation.findUnique({ where: { reference: ref } })
      if (existing) continue

      await prisma.donation.create({
        data: {
          amount,
          currency: campaign.currency,
          status: "successful",
          campaignId: campaign.id,
          donorName: name,
          anonymous: Math.random() > 0.7,
          reference: ref,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
        },
      })
    }
  }
  console.log("✓ Donations seeded")

  // ── Activities ──
  for (const campaign of allCampaigns) {
    await prisma.activity.create({
      data: {
        userId: campaign.userId,
        type: "campaign_created",
        description: `Created campaign "${campaign.title}"`,
        campaignId: campaign.id,
      },
    })
  }
  console.log("✓ Activities seeded")

  console.log("\n🎉 Seed complete! Login with any demo user: email@example.com / password123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
