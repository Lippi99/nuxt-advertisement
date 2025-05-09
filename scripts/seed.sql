-- scripts/seed.sql

INSERT INTO "role" (name) VALUES ('admin'), ('employee')
ON CONFLICT (name) DO NOTHING;
