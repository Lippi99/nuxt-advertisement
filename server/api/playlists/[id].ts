import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const playlist = await prisma.playlist.findUnique({
    where: {
      id,
    },
  });

  if (!playlist) {
    throw createError({
      statusCode: 404,
      statusMessage: "Playlist doesn't exist",
    });
  }
  return { playlist };
});
