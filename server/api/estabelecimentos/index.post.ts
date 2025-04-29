import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await getAuthUser(event);

  await requireRole(event, ["admin"]);

  await prisma.establishment.create({
    data: {
      name: body.name,
      userId: user.id,
    },
  });

  return setResponseStatus(event, 201);
});
