import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

const prisma = new PrismaClient();

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
