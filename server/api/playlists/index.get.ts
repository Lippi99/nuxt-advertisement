import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
  const playlists = await prisma.playlist.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },

    orderBy: {
      id: "asc",
    },
  });

  return { playlists };
});
