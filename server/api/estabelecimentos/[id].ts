import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const id = parseInt(getRouterParam(event, "id") as string);

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

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const estabelecimento = await prisma.establishment.findUnique({
    where: {
      id,
    },
  });

  if (!estabelecimento) {
    throw createError({
      statusCode: 404,
      statusMessage: "Establishment doesn't exist",
    });
  }
  return { estabelecimento };
});
