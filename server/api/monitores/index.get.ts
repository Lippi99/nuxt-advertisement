import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const monitores = await prisma.monitor.findMany({
    select: {
      id: true,
      name: true,
      establishment: {
        select: {
          name: true,
        },
      },
      createdAt: true,
    },

    orderBy: {
      id: "asc",
    },
  });

  return { monitores };
});
