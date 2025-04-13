import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const body = await readBody(event);

  const establishmentId = parseInt(body.establishmentId);
  const playlistId = parseInt(body.playlistId);

  await prisma.monitor.create({
    data: {
      name: body.name,
      establishmentId,
      playlistId,
    },
  });

  return setResponseStatus(event, 201);
});
