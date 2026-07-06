#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy

echo "Seeding initial data (admin account, defaults)..."
node prisma/seed.js

echo "Starting server..."
exec "$@"
