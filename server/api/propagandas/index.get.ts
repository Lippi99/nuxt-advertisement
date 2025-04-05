import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const propagandas = await prisma.advertisement.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },

    orderBy: {
      id: "asc",
    },
  });

  return { propagandas };
});
