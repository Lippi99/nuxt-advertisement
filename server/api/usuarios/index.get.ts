import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const usuarios = await prisma.user.findMany({
    where: {
      id: {
        not: user.id,
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },

    orderBy: {
      id: "asc",
    },
  });

  return { usuarios };
});
