import { defineEventHandler } from "h3";
import { useServerStripe } from "#stripe/server";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readRawBody(event, false);

  const stripe = await useServerStripe(event);

  const signature = getHeader(event, "stripe-signature");

  let stripeEvent: any = body;
  let subscription;
  let status;

  if (!body) {
    return { error: "Invalid request body" };
  }

  if (!signature) {
    return { error: "Invalid stripe-signature" };
  }

  try {
    // 3
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripeWebhookSecretKey
    );
  } catch (err) {
    const error = createError({
      statusCode: 400,
      statusMessage: `Webhook error: ${err}`,
    });
    return sendError(event, error);
  }
  switch (stripeEvent.type) {
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
        UPDATE "user"
        SET 
          is_subscribed = $1,
          subscription_current_period_start = $2,
          subscription_current_period_end = $3,
          subscription_cancelled = $4
        WHERE stripe_customer_id = $5
        `,
        [
          status === "active",
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
          UPDATE "user"
          SET 
            is_subscribed = $1,
            subscription_current_period_start = $2,
            subscription_current_period_end = $3
          WHERE stripe_customer_id = $4
          `,
        [false, deletedStart, deletedEnd, subscription.customer]
      );
      break;

    // 6
    case "customer.subscription.created":
      subscription = stripeEvent.data.object;
      status = subscription.status;

      const fullSub = await stripe.subscriptions.retrieve(subscription.id);
      const invoice = await stripe.invoices.retrieve(
        fullSub.latest_invoice as string
      );

      const startDate = new Date(invoice.lines.data[0].period.start * 1000);
      const endDate = new Date(invoice.lines.data[0].period.end * 1000);

      await pool.query(
        `
        UPDATE "user"
        SET 
          is_subscribed = $1,
          subscription_current_period_start = $2,
          subscription_current_period_end = $3
        WHERE stripe_customer_id = $4
        `,
        [true, startDate, endDate, subscription.customer]
      );

      break;
    default:
      console.log(`Unhandled event type ${stripeEvent.type}.`);
  }
  return { received: true };
});
