import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const estabelecimentos = await prisma.establishment.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return { estabelecimentos };
});
