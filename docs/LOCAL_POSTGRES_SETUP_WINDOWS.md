# Local PostgreSQL Setup (Windows)

Last updated: 2026-02-11

## 1. Install PostgreSQL
Choose one method.

### Option A: Installer (recommended)
1. Download PostgreSQL installer from official site.
2. Install with default port `5432`.
3. Set superuser password (remember this).

### Option B: Package manager (if available)
- If `winget` is available in your environment, you can install PostgreSQL from winget catalog.

## 2. Create database
After install, create DB:

```sql
CREATE DATABASE k_meal_bridge;
```

## 3. Configure env
Create `backend/.env` using `backend/.env.example`.

Minimum local values:

```env
PGHOST=127.0.0.1
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=k_meal_bridge
```

## 4. Verify connection
From repo root:

```bash
npm --prefix backend run db:doctor
```

Expected output contains:

```text
[db-doctor] OK: connected to PostgreSQL
```

## 5. Run migrations

```bash
npm run migrate:backend
```

## 6. Start API

```bash
npm run dev:backend
```

Then check:

```text
GET http://localhost:5000/api/health
```

Expected:

```json
{ "status": "OK", "db": "UP", ... }
```
