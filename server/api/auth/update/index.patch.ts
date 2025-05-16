// server/api/users/update.put.ts
import { defineEventHandler } from "h3";
import bcrypt from "bcryptjs";
import { pool } from "~/server/services/db";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const auth = await getAuthUser(event); // Get logged-in user
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const { name, lastName, email, birth, password } = await readBody(event);

  if (!name || !lastName || !email || !birth) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  let hashedPassword = null;
  if (password && password.length >= 8) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  await pool.query(
    `
    UPDATE "user"
    SET 
      name = $1,
      last_name = $2,
      email = $3,
      birth = $4,
      updated_at = now()
      ${hashedPassword ? ", password = $5" : ""}
    WHERE id = $${hashedPassword ? 6 : 5}
    `,
    hashedPassword
      ? [name, lastName, email, new Date(birth), hashedPassword, auth.id]
      : [name, lastName, email, new Date(birth), auth.id]
  );

  return { message: "User updated successfully" };
});
