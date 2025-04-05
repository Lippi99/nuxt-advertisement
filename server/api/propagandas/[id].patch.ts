import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const monitorId = parseInt(body.monitorId);
  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  await prisma.advertisement.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      monitorId,
      url: body.url,
      type: body.type,
    },
  });

  return setResponseStatus(event, 200);
});
