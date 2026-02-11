# Backend

Express.js backend API for K-Meal Bridge.

## Setup
1. Copy env template:
   - `cp .env.example .env` (Windows: duplicate file manually)
2. Set PostgreSQL connection in `.env`

## Commands
- Dev server: `npm run dev`
- Start: `npm start`
- Migrate DB: `npm run migrate`

## API
- Base path: `/api`
- Health: `GET /api/health`
- Orders:
  - `GET /api/orders`
  - `POST /api/orders`
  - `GET /api/orders/:id`
  - `PATCH /api/orders/:id/status`
