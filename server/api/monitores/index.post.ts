import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
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
