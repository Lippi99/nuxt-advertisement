import { defineEventHandler } from "h3";
import { useServerStripe } from "#stripe/server";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readRawBody(event, false);
  const stripe = await useServerStripe(event);
  const signature = getHeader(event, "stripe-signature");

  if (!body || !signature) {
    return { error: "Invalid webhook request" };
  }

  let stripeEvent: any;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripeWebhookSecretKey
    );
  } catch (err) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: `Webhook error: ${err}`,
      })
    );
  }

  let subscription;
  let status;

  switch (stripeEvent.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      subscription = stripeEvent.data.object;
      status = subscription.status;

      const updatedSub = await stripe.subscriptions.retrieve(subscription.id);
      const updatedInvoice = await stripe.invoices.retrieve(
        updatedSub.latest_invoice as string
      );

      const updatedStart = new Date(
        updatedInvoice.lines.data[0].period.start * 1000
      );
      const updatedEnd = new Date(
        updatedInvoice.lines.data[0].period.end * 1000
      );

      await pool.query(
        `
        UPDATE "organization"
        SET
          stripe_subscription_id = $1,
          subscription_status = $2,
          subscription_current_period_start = $3,
          subscription_current_period_end = $4,
          subscription_cancelled = $5
        WHERE stripe_customer_id = $6
        `,
        [
          updatedSub.id,
          status,
          updatedStart,
          updatedEnd,
          updatedSub.cancel_at_period_end,
          updatedSub.customer,
        ]
      );
      break;

    case "customer.subscription.deleted":
      subscription = stripeEvent.data.object;
      status = subscription.status;

      const deletedSub = await stripe.subscriptions.retrieve(subscription.id);
      const deletedInvoice = await stripe.invoices.retrieve(
        deletedSub.latest_invoice as string
      );

      const deletedStart = new Date(
        deletedInvoice.lines.data[0].period.start * 1000
      );
      const deletedEnd = new Date(
        deletedInvoice.lines.data[0].period.end * 1000
      );

      await pool.query(
        `
        UPDATE "organization"
        SET
          subscription_status = $1,
          subscription_current_period_start = $2,
          subscription_current_period_end = $3,
          subscription_cancelled = true
        WHERE stripe_customer_id = $4
        `,
        [status, deletedStart, deletedEnd, subscription.customer]
      );
      break;

    default:
      console.log(`Unhandled event type ${stripeEvent.type}.`);
  }

  return { received: true };
});
