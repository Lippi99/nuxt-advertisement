import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
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
