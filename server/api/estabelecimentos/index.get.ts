import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await getAuthUser(event);

  await requireRole(event, ["admin", "employee"]);

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
