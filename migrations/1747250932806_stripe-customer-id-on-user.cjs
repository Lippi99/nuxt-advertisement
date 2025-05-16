/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.addColumn("user", {
    stripe_customer_id: {
      type: "text",
      unique: true,
      notNull: false,
    },

    subscription_current_period_start: {
      type: "timestamp",
      notNull: false,
    },
    subscription_current_period_end: {
      type: "timestamp",
      notNull: false,
    },
    subscription_cancelled: {
      type: "boolean",
      default: false,
      notNull: true,
    },

    is_subscribed: {
      type: "boolean",
      default: false,
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropColumns("user", [
    "stripe_customer_id",
    "is_subscribed",
    "subscription_current_period_start",
    "subscription_current_period_end",
    "subscription_cancelled",
  ]);
};
