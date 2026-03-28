# 🍽️ VEats — Campus Takeaway App

Queue-free pick-up app with multi-vendor single-checkout, nutrition tracking, QR pickup, PhonePe payment stubs, vendor & admin panels.

---

## 📁 Repository Structure

```
vi_eat/
  frontend/          # Next.js + TypeScript + Tailwind CSS
  mobile/            # Flutter (Dart) — Android scaffold
  backend/           # NestJS + Prisma + PostgreSQL
  supabase/          # Optional: SQL migrations + Edge Functions
  infra/             # Docker + Dockerfiles
  scripts/           # Seed data & local dev scripts
  .github/           # GitHub Actions CI/CD
  Jenkinsfile.example
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ | **npm** 9+
- **Docker Desktop** (for PostgreSQL)
- **Flutter SDK** (for mobile only)

### 1. Clone & Setup Environment

```bash
git clone <your-repo-url> veats
cd veats

# Backend env vars
cp backend/.env.example backend/.env
# Edit backend/.env to set your DATABASE_URL and JWT_SECRET

# Frontend env vars
cp frontend/.env.example frontend/.env.local
```

### 2. Start PostgreSQL

```bash
cd infra
docker-compose up -d postgres
```

### 3. Run Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run start:dev
# → http://localhost:3001
```

### 4. Seed the Database

```bash
# From project root
bash scripts/seed_dev_db.sh
# Seeds: 3 vendors, 9 menu items, demo users
```

### 5. Run Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### 6. Run Mobile (Flutter)

```bash
cd mobile
flutter pub get
flutter run
# See mobile/README.md for details
```

### 7. Run All via Docker Compose

```bash
cd infra
docker-compose up
# → Frontend: http://localhost:3000
# → Backend:  http://localhost:3001
```

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret for JWT signing (32+ chars) | ✅ |
| `NEXT_PUBLIC_API_URL` | Backend URL for frontend | ✅ |
| `NODE_ENV` | `development` / `production` | ✅ |
| `SUPABASE_URL` | Supabase project URL | Optional |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Optional |
| `SUPABASE_SERVICE_KEY` | Supabase service role key | Optional |
| `PHONEPE_MID` | PhonePe Merchant ID | `TODO` |
| `PHONEPE_SECRET` | PhonePe API Secret | `TODO` |
| `PHONEPE_WEBHOOK_SECRET` | Webhook signature key | `TODO` |

> 🔒 **Security**: Never commit real secrets. All merchant keys are marked with `TODO` comments in the codebase.

---

## 🧪 Testing

```bash
# Backend tests (Jest)
cd backend && npm test

# Frontend tests (React Testing Library)
cd frontend && npm test

# Flutter tests
cd mobile && flutter test
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Login (JWT / Supabase) |
| `GET` | `/vendors` | List all vendors |
| `GET` | `/vendors/:id/menu` | Get vendor menu |
| `POST` | `/orders/create` | Create order (multi-vendor) |
| `POST` | `/payments/phonepe/webhook` | PhonePe callback |
| `POST` | `/pickup/scan` | Verify pickup code |
| `POST` | `/settlements/run` | Trigger settlement |
| `GET` | `/nutrition/user/:id?date=...` | Daily macro summary |
| `GET` | `/menu/top-selling?days=7` | Top 5 items analytics |

### Sample cURL Commands

```bash
# Create an order
curl -X POST http://localhost:3001/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "11111111-1111-1111-1111-111111111111",
    "items": [
      {"menuItemId": "a0000001-0000-0000-0000-000000000001", "quantity": 2},
      {"menuItemId": "b0000002-0000-0000-0000-000000000002", "quantity": 1}
    ]
  }'

# Simulate PhonePe webhook (mark order as paid)
curl -X POST http://localhost:3001/api/payments/phonepe/webhook \
  -H "Content-Type: application/json" \
  -d '{"order_ref": "<ORDER_ID>", "status": "PAID"}'

# Verify pickup
curl -X POST http://localhost:3001/api/pickup/scan \
  -H "Content-Type: application/json" \
  -d '{"orderId": "<ORDER_ID>", "pickupCode": "<PICKUP_CODE>"}'

# Run settlements
curl -X POST http://localhost:3001/api/settlements/run \
  -H "Content-Type: application/json" \
  -d '{"periodStart": "2026-02-01", "periodEnd": "2026-02-28"}'

# Get nutrition
curl http://localhost:3001/api/nutrition/user/11111111-1111-1111-1111-111111111111?date=2026-02-22
```

---

## 🏗️ CI/CD

- **GitHub Actions**: `.github/workflows/ci-cd.yml` — Lint, test, build, Docker image, deploy placeholder
- **Jenkins**: `Jenkinsfile.example` — Same pipeline stages

---

## 📱 Supabase (Optional)

If using Supabase instead of raw Prisma + PostgreSQL:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL Editor
3. Deploy Edge Functions: `supabase functions deploy create_order phonepe_webhook settlement_job`
4. Set env vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`

> **Auth swap**: Replace JWT-based auth in `backend/src/modules/auth/` with Supabase Auth. See comments in `auth.service.ts` for instructions.

---

## ✅ Developer Checklist (PR)

- [ ] Run migrations: `cd backend && npx prisma migrate dev`
- [ ] Seed database: `bash scripts/seed_dev_db.sh`
- [ ] Start services: `cd infra && docker-compose up`
- [ ] Run backend tests: `cd backend && npm test`
- [ ] Run frontend tests: `cd frontend && npm test`
- [ ] Verify seeded items at `http://localhost:3000`
- [ ] Test order flow: create order → webhook → pickup scan
- [ ] Check CI passes locally

---

## 📊 DB Schema

```
users ─────────┐
               ├── orders ──── order_items ──── menu_items ──── vendors
               │                                   │
               ├── food_log ───────────────────────┘
               │
           settlements ── vendors
```

**Tables**: `users`, `vendors`, `menu_items`, `orders`, `order_items`, `settlements`, `food_log`

See `backend/prisma/schema.prisma` for full schema.

---

## 📝 TODO / PhonePe Integration

All payment integration points are marked with `TODO` comments:

1. `backend/src/modules/payments/` — PhonePe API calls
2. `supabase/functions/phonepe_webhook/` — Signature verification
3. PhonePe docs: [developer.phonepe.com](https://developer.phonepe.com/docs/payment-gateway/)

---

**Built with** ❤️ **for campus dining** | Next.js • NestJS • Flutter • Prisma • PostgreSQL
