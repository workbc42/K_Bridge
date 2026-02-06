-- Add messenger customers and recommendation signals (safe for repeated runs)

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  messenger_platform TEXT NOT NULL CHECK (messenger_platform IN ('instagram', 'facebook', 'other')),
  messenger_user_id TEXT NOT NULL,
  display_name TEXT,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (messenger_platform, messenger_user_id)
);

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS customer_id INTEGER REFERENCES customers(id);

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS request_note TEXT;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS order_detail_text TEXT;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS source_channel TEXT CHECK (source_channel IN ('manychat', 'beeper'));

CREATE TABLE IF NOT EXISTS menu_signals (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  order_count INTEGER NOT NULL DEFAULT 0,
  last_ordered_at TIMESTAMPTZ,
  UNIQUE (customer_id, item_name)
);

CREATE TABLE IF NOT EXISTS request_signals (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  request_text TEXT NOT NULL,
  use_count INTEGER NOT NULL DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  UNIQUE (customer_id, request_text)
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_created_at ON orders(customer_id, created_at);
CREATE INDEX IF NOT EXISTS idx_menu_signals_customer_order_count ON menu_signals(customer_id, order_count DESC);
CREATE INDEX IF NOT EXISTS idx_request_signals_customer_use_count ON request_signals(customer_id, use_count DESC);
