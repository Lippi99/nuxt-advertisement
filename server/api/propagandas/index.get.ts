import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
  const advertisements = await prisma.advertisement.findMany({
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

  return { advertisements };
});
