import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

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
