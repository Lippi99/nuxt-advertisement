import { defineEventHandler } from "h3";
import { useServerStripe } from "#stripe/server";
import { getAuthUser } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  try {
    const stripe = await useServerStripe(event);
    const user = await getAuthUser(event);

    const baseUrl = "http://localhost:3000";

    if (!user) {
      return { error: "User not authenticated" };
    }

    // Buscar stripe_customer_id da ORGANIZAÇÃO
    const orgResult = await pool.query(
      `SELECT stripe_customer_id FROM "organization" WHERE id = $1`,
      [user.organization_id]
    );

    const organization = orgResult.rows[0];

    if (!organization?.stripe_customer_id) {
      return { error: "Stripe customer not found for organization." };
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: organization.stripe_customer_id,
      return_url: baseUrl,
    });

    return { url: portalSession.url };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : String(error),
    });
  }
});
