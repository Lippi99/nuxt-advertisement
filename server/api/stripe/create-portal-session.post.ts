import { defineEventHandler } from "h3";
import { useServerStripe } from "#stripe/server";
import { getAuthUser } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  try {
    const stripe = await useServerStripe(event);
    const session = await getAuthUser(event);

    const baseUrl = "http://localhost:3000";

    if (!session) {
      return { error: "User not authenticated" };
    }

    const account = await pool.query(`SELECT * FROM "user" WHERE email = $1`, [
      session.email,
    ]);

    const customer = account.rows[0];

    if (!customer.stripe_customer_id) {
      return { error: "Stripe customer not found" };
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.stripe_customer_id,
      return_url: baseUrl,
    });

    return { url: portalSession.url };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error as string,
    });
  }
});
