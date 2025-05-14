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
  pgm.createTable("plan", {
    id: "id",
    name: {
      type: "text",
      notNull: true,
    },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.addColumn("user", {
    plan_id: {
      type: "integer",
      notNull: false,
      references: '"plan"(id)',
      cascade: "SET NULL",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("plan");

  pgm.dropColumn("user", "plan_id");
};
