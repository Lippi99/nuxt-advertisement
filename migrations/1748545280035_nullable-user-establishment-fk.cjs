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
  pgm.alterColumn("establishment", "user_id", {
    notNull: false,
  });

  pgm.dropConstraint("establishment", "establishment_user_id_fkey");

  pgm.addConstraint("establishment", "establishment_user_id_fkey", {
    foreignKeys: {
      columns: "user_id",
      references: '"user"(id)',
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
  pgm.dropConstraint("establishment", "establishment_user_id_fkey");

  pgm.addConstraint("establishment", "establishment_user_id_fkey", {
    foreignKeys: {
      columns: "user_id",
      references: '"user"(id)',
      onDelete: "RESTRICT",
    },
  });

  // Voltar a exigir NOT NULL
  pgm.alterColumn("establishment", "user_id", {
    notNull: true,
  });
};
