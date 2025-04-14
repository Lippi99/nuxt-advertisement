import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await getAuthUser(event);

  await requireRole(event, ["admin", "employee"]);

  await prisma.establishment.create({
    data: {
      name: body.name,
      userId: user.id,
    },
  });

  return setResponseStatus(event, 201);
});
