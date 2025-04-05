import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  await prisma.monitor.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      establishmentId: body.establishmentId,
    },
  });

  return setResponseStatus(event, 200);
});
