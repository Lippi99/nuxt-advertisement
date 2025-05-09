import { setResponseHeaders } from "h3";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, "id");

  setResponseHeaders(event, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  event.node.res.write(":\n\n"); // kickstart the SSE stream

  const interval = setInterval(async () => {
    try {
      const result = await pool.query(
        `SELECT paired FROM "unpaired_monitor" WHERE code = $1 LIMIT 1`,
        [code]
      );

      const paired = result.rows[0]?.paired ?? false;

      event.node.res.write(`data: ${JSON.stringify({ paired })}\n\n`);
    } catch (err) {
      event.node.res.write(`event: error\ndata: ${JSON.stringify(err)}\n\n`);
    }
  }, 1000);

  event.node.req.on("close", () => {
    clearInterval(interval);
  });
});
