import { getAuthUser } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";
import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const { organization } = await readBody(event);
  const stripe = await useServerStripe(event);

  if (!organization) {
    throw createError({
      statusCode: 400,
      message: "Organization name is required",
    });
  }

  const stripeCustomer = await stripe.customers.create({
    name: organization,
    email: user.email,
    metadata: {
      created_by_user_id: user.id.toString(),
    },
  });

  // Inserir a organização no banco com stripe_customer_id
  const organizationCreated = await pool.query(
    `
    INSERT INTO "organization" (name, stripe_customer_id, created_at, updated_at) 
    VALUES ($1, $2, now(), now())
    RETURNING id, name
    `,
    [organization, stripeCustomer.id]
  );

  const org = organizationCreated.rows[0];

  // Associar usuário à organização recém-criada
  await pool.query(
    `
    UPDATE "user"
    SET organization_id = $1
    WHERE id = $2
    `,
    [org.id, user.id]
  );

  return {
    status: 201,
    organization: org,
  };
});
