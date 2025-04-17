import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const monitor = await prisma.unpairedMonitor.findFirst({
    where: {
      code: id,
      paired: true,
    },

    include: {
      monitor: {
        select: {
          name: true,
          playlist: {
            include: {
              advertisements: {
                select: {
                  id: true,
                  images: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return { monitor };
});
