// server/api/users/create.post.ts
import bcrypt from "bcryptjs";
import { getAuthUser } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";
import { defineEventHandler } from "h3";

import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  // await getAuthUser(event);

  const { name, lastName, email, roleId, birth, password } = await readBody(
    event
  );

  // Validate required fields
  if (!name || !email || !password || !lastName || !roleId || !birth) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: "Password must be at least 8 characters long",
    });
  }

  const roleCheck = await pool.query(`SELECT id FROM "role" WHERE id = $1`, [
    parseInt(roleId),
  ]);
  if (roleCheck.rowCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Role not found",
    });
  }

  // Check if email already exists
  const userExists = await pool.query(
    `SELECT id FROM "user" WHERE email = $1`,
    [email]
  );
  if (userExists.rowCount && userExists.rowCount > 0) {
    throw createError({
      statusCode: 400,
      message: "Email already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const customer = await stripe.customers.create({ email });

  const result = await pool.query(
    `
    INSERT INTO "user" (name, last_name, email, password, role_id, birth, stripe_customer_id, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now())
    RETURNING id, name, last_name, email, role_id, birth, stripe_customer_id
    `,
    [
      name,
      lastName,
      email,
      hashedPassword,
      parseInt(roleId),
      new Date(birth),
      customer.id,
    ]
  );

  const user = result.rows[0];

  return {
    user: {
      ...user,
      lastName: user.last_name,
      roleId: user.role_id,
    },
  };
});
