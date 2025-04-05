import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") as string);

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
