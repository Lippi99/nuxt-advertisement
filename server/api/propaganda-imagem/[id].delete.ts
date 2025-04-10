import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") as string);

  const advertisementImage = await prisma.advertisementImage.delete({
    where: {
      id,
    },
  });

  if (!advertisementImage) {
    throw createError({
      statusCode: 404,
      message: "Image or video not found",
    });
  }

  return setResponseStatus(event, 200);
});
