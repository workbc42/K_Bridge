# PostgreSQL Persistence Runbook

Last updated: 2026-02-11
Scope: Backend orders persistence (`/api/orders`) with PostgreSQL

## 1. What changed
- `orders` API no longer uses in-memory storage.
- Data is stored in PostgreSQL tables:
  - `orders`
  - `order_items`
- API health endpoint now checks DB connectivity:
  - `GET /api/health` returns `db: UP|DOWN`

## 2. Required environment
Set backend env vars (`backend/.env`):

- `DATABASE_URL` (recommended), or all of:
  - `PGHOST`
  - `PGPORT`
  - `PGUSER`
  - `PGPASSWORD`
  - `PGDATABASE`
- Optional:
  - `PGSSLMODE=require` (if SSL required)
  - `SYSTEM_USER_EMAIL`
  - `SYSTEM_USER_NAME`

Reference template: `backend/.env.example`

## 3. Migrate schema
From repo root:

```bash
npm run migrate:backend
```

Or direct:

```bash
npm --prefix backend run migrate
```

This applies SQL files in `database/migrations` in filename order.

## 3.1 Check DB connectivity first (recommended)
From repo root:

```bash
npm run doctor:backend-db
```

If this fails, see:
- `docs/LOCAL_POSTGRES_SETUP_WINDOWS.md`

## 4. Start backend
```bash
npm run dev:backend
```

## 5. Smoke test API

### 5.1 Health
```bash
GET http://localhost:5000/api/health
```

Expected example:
```json
{
  "status": "OK",
  "db": "UP",
  "timestamp": "..."
}
```

### 5.2 Create order
```bash
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "restaurantName": "Seoul Kitchen",
  "deliveryAddress": "Seoul, Korea",
  "menuItems": [
    { "name": "Bibimbap", "quantity": 1, "unitPrice": 12000 }
  ],
  "totalPrice": 12000,
  "notes": "Leave at door"
}
```

### 5.3 List orders
```bash
GET http://localhost:5000/api/orders
```

### 5.4 Update status
```bash
PATCH http://localhost:5000/api/orders/{id}/status
Content-Type: application/json

{ "status": "processing" }
```

Allowed statuses:
- `pending`
- `processing`
- `completed`
- `cancelled`

## 5.5 One-command smoke test (recommended)
From repo root:

```bash
npm run smoke:orders
```

This validates:
- health (`db: UP`)
- order create
- order list
- order status update
- order fetch by id

## 6. Implementation files
- DB pool and transaction helper:
  - `backend/db/pool.js`
- Migration runner:
  - `backend/scripts/migrate.js`
- Orders controller (DB-backed):
  - `backend/controllers/orderController.js`
- Health route (DB check):
  - `backend/routes/index.js`

## 7. Notes
- `orders.user_id` is NOT NULL in schema. Controller auto-creates/reuses a system user for MVP ingestion.
- Auth integration phase should replace system user assignment with real authenticated user context.
