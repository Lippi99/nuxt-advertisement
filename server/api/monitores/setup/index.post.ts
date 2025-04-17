import { prisma } from "@/server/services/prisma-service";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async () => {
  const code = uuidv4();

  await prisma.unpairedMonitor.create({
    data: {
      code,
      paired: false,
    },
  });

  return { code };
});
