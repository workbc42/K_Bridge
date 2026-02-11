# Development Branch Log

## 2026-02-11 - Branch Point 1: Core Stack Baseline

### Decision
- Lock the frontend MVP baseline stack before expanding features.

### Applied Changes
- Frontend dependencies installed:
  - `i18next`, `react-i18next`, `next-i18next`
  - `zustand`
  - `@tanstack/react-query`
  - `axios`
  - `zod`
  - `react-hook-form`
  - `date-fns`
- Root dev tools installed:
  - `eslint`, `prettier`, `husky`, `lint-staged`
- Backend dependencies normalized:
  - `express`, `cors`, `dotenv`, `nodemon`

### Why this branch
- The project had UI-first scaffolding and stubs; shared foundations were needed first to avoid duplicated rewrites.

## 2026-02-11 - Branch Point 2: Working Order Flow (MVP)

### Decision
- Replace stub-only order endpoints with a working in-memory flow and connect a frontend create-order path.

### Applied Changes
- Backend `orders` endpoints:
  - `GET /api/orders`
  - `POST /api/orders`
  - `GET /api/orders/:id`
  - `PATCH /api/orders/:id/status`
- Frontend foundational files:
  - Query client + app provider
  - Axios API client + order API helpers
  - Zustand cart store
  - Zod order schema
- New screen:
  - `frontend/app/[locale]/order/page.js`

### Why this branch
- Securing a real request/response path lowers risk before DB/auth/payment integration.

## 2026-02-11 - Branch Point 3: External Design Handoff (Stitch)

### Decision
- Delegate dashboard visual/UX direction to Stitch with strict implementation constraints documented from current code.

### Applied Changes
- Created handoff spec:
  - `docs/STITCH_DASHBOARD_HANDOFF.md`
- Included:
  - Route/IA map
  - Component inventory
  - Data model fields
  - Token and responsive constraints
  - Accessibility and state requirements
  - Ready-to-paste Stitch prompt

### Why this branch
- This is the lowest-cost point to lock design direction before deeper feature development.

## 2026-02-11 - Branch Point 4: PostgreSQL Persistence for Orders

### Decision
- Move `orders` APIs from in-memory storage to PostgreSQL-backed persistence.

### Applied Changes
- Added PostgreSQL connection and transaction layer:
  - `backend/db/pool.js`
- Added migration runner:
  - `backend/scripts/migrate.js`
- Added DB connectivity checker:
  - `backend/scripts/db-doctor.js`
- Added order API smoke test:
  - `backend/scripts/smoke-orders.js`
- Added backend migration script:
  - `backend/package.json` -> `npm run migrate`
  - `backend/package.json` -> `npm run db:doctor`
  - `backend/package.json` -> `npm run smoke:orders`
  - root `package.json` -> `npm run migrate:backend`
  - root `package.json` -> `npm run doctor:backend-db`
  - root `package.json` -> `npm run smoke:orders`
- Replaced order controller with DB-backed implementation:
  - `backend/controllers/orderController.js`
- Health endpoint now verifies DB connectivity:
  - `backend/routes/index.js` (`db: UP|DOWN`)
- Added backend env template:
  - `backend/.env.example`
- Added runbook:
  - `docs/POSTGRES_PERSISTENCE.md`
- Added local setup guide:
  - `docs/LOCAL_POSTGRES_SETUP_WINDOWS.md`

### Why this branch
- Orders are the operational core; persistence is required before auth/payment production hardening.

## 2026-02-11 - Branch Point 4.1: CI Stabilization (Test/Build)

### Decision
- Align GitHub Actions workflows with current repository structure and remove non-applicable steps.

### Applied Changes
- Fixed workflow mismatch:
  - `.github/workflows/ci.yml`
  - removed `npm test` and Python test steps
- Fixed build artifact path:
  - `.github/workflows/build-deploy.yml`
  - `dist/` -> `frontend/.next/`
- Fixed UTF-8 parsing failures for frontend build:
  - `frontend/app/[locale]/order/page.js`
  - `frontend/lib/schemas/order.js`
- Added dedicated fix report:
  - `docs/CI_BUILD_TEST_FIX_2026-02-11.md`

### Why this branch
- CI signal must be reliable before moving to Branch Point 5 (Auth).

## Next planned branch points
- Branch Point 5: Auth (JWT + Google/Kakao OAuth)
- Branch Point 6: Payment (Toss) integration skeleton
