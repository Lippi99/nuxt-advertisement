import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
  const monitores = await prisma.monitor.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      establishment: {
        select: {
          name: true,
        },
      },
      unpairedMonitors: {
        take: 1,
        orderBy: { id: "desc" },
        select: {
          code: true,
          paired: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const monitoresComFlatPaired = monitores.map((monitor) => ({
    ...monitor,
    code: monitor.unpairedMonitors[0]?.code ?? "",
    paired: monitor.unpairedMonitors[0]?.paired ?? false,
  }));

  return { monitores: monitoresComFlatPaired };
});
