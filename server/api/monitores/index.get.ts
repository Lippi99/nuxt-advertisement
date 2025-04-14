import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
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
