import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await getAuthUser(event);

  await prisma.establishment.create({
    data: {
      name: body.name,
      userId: user.id,
    },
  });

  return setResponseStatus(event, 201);
});
