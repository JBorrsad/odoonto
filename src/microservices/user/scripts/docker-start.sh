#!/bin/bash
set -e

echo "🚀 Starting User Microservice..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
until pg_isready -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USER; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "✅ Database is ready!"

# Run migrations if needed
if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "🔄 Running database migrations..."
  npm run migration:run
fi

# Start the application
echo "🎯 Starting application..."
exec "$@" 