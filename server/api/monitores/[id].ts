import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const monitor = await prisma.monitor.findUnique({
    where: {
      id,
    },
  });

  if (!monitor) {
    throw createError({
      statusCode: 404,
      statusMessage: "Monitor doesn't exist",
    });
  }
  return { monitor };
});
