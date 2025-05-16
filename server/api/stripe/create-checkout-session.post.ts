import { defineEventHandler } from "h3";
import { useServerStripe } from "#stripe/server";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const auth = await getAuthUser(event);

  const stripe = await useServerStripe(event);

  const existingSubscriptions = await stripe.subscriptions.list({
    customer: auth.stripe_customer_id,
    status: "active",
    limit: 1,
  });

  if (existingSubscriptions.data.length > 0) {
    throw createError({
      status: 400,
      message: "Você já possui uma assinatura ativa.",
    });
  }

  if (auth && auth.stripe_customer_id && auth.plan_id === null) {
    const prices = await stripe.prices.list({
      lookup_keys: ["basic"],
      expand: ["data.product"],
    });

    const session = await stripe.checkout.sessions.create({
      customer: auth.stripe_customer_id,
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
    });

    if (session.url) {
      return { url: session.url };
    }
  }
});
