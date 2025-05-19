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
  pgm.createTable("organization", {
    id: "id",
    name: {
      type: "text",
      notNull: true,
    },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.addColumn("user", {
    organization_id: {
      type: "integer",
      notNull: false,
      references: "organization(id)",
      onDelete: "SET NULL",
    },
  });

  pgm.addColumn("establishment", {
    organization_id: {
      type: "integer",
      notNull: false,
      references: "organization(id)",
      onDelete: "SET NULL",
    },
  });

  pgm.addColumn("monitor", {
    organization_id: {
      type: "integer",
      notNull: false,
      references: "organization(id)",
      onDelete: "SET NULL",
    },
  });

  pgm.addColumn("playlist", {
    organization_id: {
      type: "integer",
      notNull: false,
      references: "organization(id)",
      onDelete: "SET NULL",
    },
  });

  pgm.addColumn("advertisement", {
    organization_id: {
      type: "integer",
      notNull: false,
      references: "organization(id)",
      onDelete: "SET NULL",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropColumn("user", "organization_id");
  pgm.dropColumn("establishment", "organization_id");
  pgm.dropColumn("monitor", "organization_id");
  pgm.dropColumn("playlist", "organization_id");
  pgm.dropColumn("advertisement", "organization_id");
  pgm.dropTable("organization");
};
