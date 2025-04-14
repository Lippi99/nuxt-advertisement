import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const body = await readBody(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  await requireRole(event, ["admin", "employee"]);

  const establishment = await prisma.establishment.findUnique({
    where: { id },
  });

  if (!establishment) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found",
    });
  }

  if (establishment.userId !== user.id) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to update this establishment",
    });
  }

  await prisma.establishment.update({
    where: {
      id,
    },
    data: {
      name: body.name,
    },
  });

  return setResponseStatus(event, 200);
});
