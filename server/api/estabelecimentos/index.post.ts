import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await prisma.establishment.create({
    data: {
      name: body.name,
    },
  });

  return setResponseStatus(event, 201);
});
