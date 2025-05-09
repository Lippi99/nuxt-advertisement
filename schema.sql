-- Drop tables in dependency order
DROP TABLE IF EXISTS unpaired_monitor;
DROP TABLE IF EXISTS advertisement_image;
DROP TABLE IF EXISTS advertisement;
DROP TABLE IF EXISTS monitor;
DROP TABLE IF EXISTS playlist;
DROP TABLE IF EXISTS establishment;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS role;

-- Create tables
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER NOT NULL REFERENCES role(id),
  birth TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE establishment (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE playlist (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE monitor (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  establishment_id INTEGER NOT NULL REFERENCES establishment(id),
  playlist_id INTEGER REFERENCES playlist(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE advertisement (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  playlist_id INTEGER REFERENCES playlist(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE advertisement_image (
  id SERIAL PRIMARY KEY,
  advertisement_id INTEGER NOT NULL REFERENCES advertisement(id) ON DELETE CASCADE,
  url TEXT NOT NULL
);

CREATE TABLE unpaired_monitor (
  id SERIAL PRIMARY KEY,
  code UUID UNIQUE NOT NULL,
  monitor_id INTEGER REFERENCES monitor(id) ON DELETE SET NULL,
  paired BOOLEAN NOT NULL
);
