import { prisma } from "@/server/services/prisma-service";
import { uploadFiles } from "@/server/services/aws-s3-service";
import { generateKey } from "~/utils/aws";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const body = await readBody(event);

  await prisma.playlist.create({
    data: {
      name: body.name,
    },
  });

  return setResponseStatus(event, 201);
});
