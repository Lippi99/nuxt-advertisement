import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
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
