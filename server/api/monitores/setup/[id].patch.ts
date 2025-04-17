import { prisma } from "@/server/services/prisma-service";
import { getAuthUser, requireRole } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);

  await requireRole(event, ["admin", "employee"]);
  const body = await readBody(event);

  const code = getRouterParam(event, "id");

  const unpaired = await prisma.unpairedMonitor.update({
    where: {
      code: code,
    },
    data: {
      paired: true,
      monitorId: body.monitorId,
    },
  });

  return { unpaired };
});
