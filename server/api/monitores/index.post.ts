import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const body = await readBody(event);

  const establishmentId = parseInt(body.establishmentId);

  await prisma.monitor.create({
    data: {
      name: body.name,
      establishmentId,
    },
  });

  return setResponseStatus(event, 201);
});
