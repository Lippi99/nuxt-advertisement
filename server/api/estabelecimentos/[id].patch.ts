import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const body = await readBody(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  console.log(body);

  await prisma.establishment.update({
    where: {
      id,
    },
    data: {
      name: body.name,
    },
  });

  return setResponseStatus(event, 200);
});
