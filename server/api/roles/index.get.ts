import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
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
