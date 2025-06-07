#!/bin/sh
set -e

echo "📦 DATABASE_URL = $DATABASE_URL"

# Confirm the environment variable is available
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is not set!"
  exit 1
fi

echo "🚀 Running database migration..."
DATABASE_URL="$DATABASE_URL" npx node-pg-migrate up --verbose

echo "✅ Migration done. Starting Nuxt server..."
node .output/server/index.mjs
