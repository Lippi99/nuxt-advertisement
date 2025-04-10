import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const advertisement = await prisma.advertisement.findUnique({
    where: {
      id,
    },
    include: {
      images: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  });

  if (!advertisement) {
    throw createError({
      statusCode: 404,
      statusMessage: "advertisement doesn't exist",
    });
  }
  return { advertisement };
});
