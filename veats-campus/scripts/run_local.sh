#!/usr/bin/env bash
# VEats — Run Local Development
# Usage: ./scripts/run_local.sh

set -euo pipefail

echo "🚀 VEats Local Dev Startup"
echo "=========================="
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
  echo "⚠️  Docker not found. Install Docker Desktop: https://docker.com"
  exit 1
fi

echo "1/4 Starting PostgreSQL..."
cd infra
docker-compose up -d postgres
sleep 3

echo ""
echo "2/4 Running backend migrations & installing deps..."
cd ../backend
cp .env.example .env 2>/dev/null || true
npm install
npx prisma migrate dev --name init --skip-generate 2>/dev/null || npx prisma db push
npx prisma generate

echo ""
echo "3/4 Seeding database..."
cd ..
bash scripts/seed_dev_db.sh

echo ""
echo "4/4 Starting services..."
echo "   Backend:  http://localhost:3001"
echo "   Frontend: http://localhost:3000"
echo ""

# Start backend in background
cd backend
npm run start:dev &
BACKEND_PID=$!

# Start frontend
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 VEats running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all services."

# Cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; docker-compose -f infra/docker-compose.yml stop postgres" EXIT

wait
