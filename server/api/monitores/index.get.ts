import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const monitores = await prisma.monitor.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },

    orderBy: {
      id: "asc",
    },
  });

  return { monitores };
});
