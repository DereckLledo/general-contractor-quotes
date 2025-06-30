import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seed...")

  // Create admin user first
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  })

  // Create regular user
  await prisma.user.create({
    data: {
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "USER",
    },
  })

  // Fetch all users to verify
  const allUsers = await prisma.user.findMany()
  console.log("All users in database:", allUsers)
}

main()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
