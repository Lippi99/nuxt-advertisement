import { getAuthUser } from "~/server/services/auth-service";
import { prisma } from "~/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);

  const roles = await prisma.role.findMany();

  if (!roles) {
    throw createError({
      statusCode: 404,
      message: "Role not found",
    });
  }

  return {
    roles,
  };
});
