import {
  AssetLegalStatus,
  AssetType,
  PrismaClient,
} from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting full database seed...");

  await prisma.asset.createMany({
    data: [
      {
        name: "Lira City Headquarters Land",
        type: AssetType.LAND,
        location: "Lira City Central Division",
        size: "5 Acres",
        legalStatus: AssetLegalStatus.CLEAN,
      },
      {
        name: "Education Department Office Block",
        type: AssetType.COMMERCIAL,
        location: "Railway Division",
        size: "3 Floors",
        legalStatus: AssetLegalStatus.CLEAN,
      },
      {
        name: "Toyota Land Cruiser",
        type: AssetType.VEHICLE,
        location: "Administration Yard",
        legalStatus: AssetLegalStatus.CLEAN,
      },
      {
        name: "Road Maintenance Equipment Set",
        type: AssetType.MACHINERY,
        location: "Works Department Yard",
        legalStatus: AssetLegalStatus.DISPUTED,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Full database seeding completed");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
