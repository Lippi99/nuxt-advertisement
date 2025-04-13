import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const body = await readBody(event);

  const id = parseInt(getRouterParam(event, "id") as string);
  const playlistId = parseInt(body.playlistId);

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
      playlistId: playlistId,
    },
  });

  return setResponseStatus(event, 200);
});
