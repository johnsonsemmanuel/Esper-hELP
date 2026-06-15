import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
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

  console.log("Categories seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
