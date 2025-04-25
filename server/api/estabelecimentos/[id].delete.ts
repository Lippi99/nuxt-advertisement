import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);

  await requireRole(event, ["admin"]);

  const id = parseInt(getRouterParam(event, "id") as string);

  const establishmentToBeDeleted = await prisma.establishment.findUnique({
    where: { id },
  });

  if (!establishmentToBeDeleted) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found",
    });
  }

  if (establishmentToBeDeleted.userId !== user.id) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to update this establishment",
    });
  }

  const establishment = await prisma.establishment.delete({
    where: {
      id,
    },
  });

  if (!establishment) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found",
    });
  }

  return setResponseStatus(event, 200);
});
