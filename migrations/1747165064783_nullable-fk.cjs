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
  pgm.dropConstraint("monitor", "monitor_playlist_id_fkey");

  pgm.addConstraint("monitor", "monitor_playlist_id_fkey", {
    foreignKeys: {
      columns: "playlist_id",
      references: "playlist(id)",
      onDelete: "SET NULL",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("monitor", "monitor_playlist_id_fkey");

  pgm.addConstraint("monitor", "monitor_playlist_id_fkey", {
    foreignKeys: {
      columns: "playlist_id",
      references: "playlist(id)",
      onDelete: "CASCADE",
    },
  });
};
