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
  pgm.createTable("organization_files", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    organization_id: {
      type: "integer",
      notNull: true,
      references: "organization(id)",
      onDelete: "cascade",
    },
    file_name: {
      type: "text",
      notNull: true,
    },
    s3_key: {
      type: "text",
      unique: true,
      notNull: true,
    },
    file_size_bytes: {
      type: "bigint",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("now()"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("organization_files");
};
