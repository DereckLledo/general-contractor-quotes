#!/bin/sh

echo "Starting application..."

# Wait for database to be ready
echo "Waiting for database..."
until npx prisma db push --accept-data-loss; do
  echo "Database not ready, waiting..."
  sleep 2
done

echo "Database is ready!"

# Generate Prisma client (in case it's not up to date)
echo "Generating Prisma client..."
npx prisma generate

echo "Starting development server..."
exec npm run dev