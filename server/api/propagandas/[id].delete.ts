import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
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
