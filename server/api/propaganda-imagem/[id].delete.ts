import { prisma } from "@/server/services/prisma-service";
import { getAuthUser } from "~/server/services/auth-service";
import { deleteFile } from "~/server/services/aws-s3-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
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

  const url = new URL(advertisementImage.url);
  const key = decodeURIComponent(url.pathname.slice(1));
  await deleteFile(key);

  return setResponseStatus(event, 200);
});
