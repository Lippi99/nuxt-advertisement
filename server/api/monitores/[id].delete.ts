import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") as string);

  const monitor = await prisma.monitor.delete({
    where: {
      id,
    },
  });

  if (!monitor) {
    throw createError({
      statusCode: 404,
      message: "Monitor not found",
    });
  }

  return setResponseStatus(event, 200);
});
