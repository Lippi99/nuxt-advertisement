import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const propagandas = await prisma.advertisement.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          images: true,
        },
      },
      createdAt: true,
    },

    orderBy: {
      id: "asc",
    },
  });

  return { propagandas };
});
