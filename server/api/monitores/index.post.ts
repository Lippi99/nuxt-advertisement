import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
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
