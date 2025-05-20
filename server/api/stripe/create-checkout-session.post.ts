import { defineEventHandler } from "h3";
import { useServerStripe } from "#stripe/server";
import { getAuthUser } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const auth = await getAuthUser(event);
  const stripe = await useServerStripe(event);

  // Buscar dados da organização do usuário
  const orgResult = await pool.query(
    `SELECT id, stripe_customer_id FROM organization WHERE id = $1`,
    [auth.organization_id]
  );

  const organization = orgResult.rows[0];

  if (!organization) {
    throw createError({
      statusCode: 400,
      message: "Organização não encontrada.",
    });
  }

  // Verifica se já tem uma assinatura ativa
  const existingSubscriptions = await stripe.subscriptions.list({
    customer: organization.stripe_customer_id,
    status: "active",
    limit: 1,
  });

  if (existingSubscriptions.data.length > 0) {
    throw createError({
      statusCode: 400,
      message: "A organização já possui uma assinatura ativa.",
    });
  }

  const prices = await stripe.prices.list({
    lookup_keys: ["basic"],
    expand: ["data.product"],
  });

  // Cria sessão de checkout vinculada à ORGANIZAÇÃO
  const session = await stripe.checkout.sessions.create({
    customer: organization.stripe_customer_id,
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancelled",
    metadata: {
      organizationId: organization.id, // Facilita no webhook
    },
  });

  return { url: session.url };
});
