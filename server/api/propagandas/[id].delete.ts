import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
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
