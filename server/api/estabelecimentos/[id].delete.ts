import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  console.log(id);

  const establishment = await prisma.establishment.delete({
    where: {
      id,
    },
  });

  if (!establishment) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found",
    });
  }

  return setResponseStatus(event, 200);
});
