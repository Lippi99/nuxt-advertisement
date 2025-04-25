import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const body = await readBody(event);

  await prisma.playlist.create({
    data: {
      name: body.name,
    },
  });

  return setResponseStatus(event, 201);
});
