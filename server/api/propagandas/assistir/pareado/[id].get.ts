import { prisma } from "@/server/services/prisma-service";
import { setResponseHeaders } from "h3";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  // Proper SSE headers
  setResponseHeaders(event, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // Keep the connection alive (some proxies close inactive connections)
  event.node.res.write(":\n\n"); // Comment to start stream

  const interval = setInterval(async () => {
    try {
      const monitor = await prisma.unpairedMonitor.findFirst({
        where: {
          code: id,
          paired: true,
        },
      });

      if (monitor?.paired) {
        event.node.res.write(`data: ${JSON.stringify({ paired: true })}\n\n`);
        clearInterval(interval);
        event.node.res.end();
      }
    } catch (err) {
      event.node.res.write(`event: error\ndata: ${JSON.stringify(err)}\n\n`);
    }
  }, 1000);

  event.node.req.on("close", () => {
    clearInterval(interval);
  });
});
