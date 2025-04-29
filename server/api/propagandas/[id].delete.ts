import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const id = parseInt(getRouterParam(event, "id") as string);

  const advertisement = await prisma.advertisement.delete({
    where: {
      id,
    },
  });

  if (!advertisement) {
    throw createError({
      statusCode: 404,
      message: "Advertisement not found",
    });
  }

  return setResponseStatus(event, 200);
});
