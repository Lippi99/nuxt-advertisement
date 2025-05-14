// migrations/1683986797221-init-schema.js

exports.up = (pgm) => {
  // Create tables
  pgm.createTable("role", {
    id: "id",
    name: { type: "text", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.createTable("user", {
    id: "id",
    email: { type: "text", notNull: true, unique: true },
    name: { type: "text", notNull: true },
    last_name: { type: "text", notNull: true },
    password: { type: "text", notNull: true },
    role_id: { type: "integer", notNull: true, references: "role(id)" },
    birth: { type: "timestamp", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.createTable("establishment", {
    id: "id",
    name: { type: "text", notNull: true },
    user_id: { type: "integer", notNull: true, references: '"user"(id)' },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.createTable("playlist", {
    id: "id",
    name: { type: "text", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.createTable("monitor", {
    id: "id",
    name: { type: "text", notNull: true },
    establishment_id: {
      type: "integer",
      notNull: true,
      references: "establishment(id)",
    },
    playlist_id: { type: "integer", references: "playlist(id)" },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.createTable("advertisement", {
    id: "id",
    name: { type: "text", notNull: true },
    playlist_id: { type: "integer", references: "playlist(id)" },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.createTable("advertisement_image", {
    id: "id",
    advertisement_id: {
      type: "integer",
      notNull: true,
      references: "advertisement(id)",
      onDelete: "CASCADE",
    },
    url: { type: "text", notNull: true },
  });

  pgm.createTable("unpaired_monitor", {
    id: "id",
    code: { type: "uuid", notNull: true, unique: true },
    monitor_id: {
      type: "integer",
      references: "monitor(id)",
      onDelete: "SET NULL",
    },
    paired: { type: "boolean", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("unpaired_monitor");
  pgm.dropTable("advertisement_image");
  pgm.dropTable("advertisement");
  pgm.dropTable("monitor");
  pgm.dropTable("playlist");
  pgm.dropTable("establishment");
  pgm.dropTable("user");
  pgm.dropTable("role");
};
