import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Example seed data – expand as needed
  const delhi = await prisma.city.upsert({
    where: { slug: "delhi" },
    update: {},
    create: {
      name: "Delhi",
      state: "Delhi",
      slug: "delhi",
    },
  });

  const bangalore = await prisma.city.upsert({
    where: { slug: "bangalore" },
    update: {},
    create: {
      name: "Bangalore",
      state: "Karnataka",
      slug: "bangalore",
    },
  });

  console.log("Seeded cities:", { delhi, bangalore });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });