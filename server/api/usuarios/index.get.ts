import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const usuarios = await prisma.user.findMany({
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
