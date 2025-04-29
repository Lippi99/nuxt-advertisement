import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await getAuthUser(event);

  await requireRole(event, ["admin", "employee"]);
  const body = await readBody(event);

  const code = getRouterParam(event, "id");

  const monitorAlreadyPaired = await prisma.unpairedMonitor.findMany({
    where: {
      id: body.monitorId,
      paired: true,
    },
  });

  if (monitorAlreadyPaired.length > 1) {
    throw createError({
      statusCode: 400,
      message: "This monitor was already paired!",
    });
  }

  const unpaired = await prisma.unpairedMonitor.update({
    where: {
      code: code,
    },
    data: {
      paired: body.paired,
      monitorId: body.monitorId,
    },
  });

  if (!unpaired.paired) {
    await prisma.unpairedMonitor.delete({
      where: {
        code,
      },
    });
  }

  return { unpaired };
});
