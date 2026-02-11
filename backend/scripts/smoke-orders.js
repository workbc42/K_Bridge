require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

const fail = (message, payload) => {
  console.error(`[smoke-orders] FAIL: ${message}`);
  if (payload) {
    console.error(JSON.stringify(payload, null, 2));
  }
  process.exit(1);
};

const assert = (condition, message, payload) => {
  if (!condition) fail(message, payload);
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  return {
    ok: response.ok,
    status: response.status,
    body,
  };
};

const run = async () => {
  console.log(`[smoke-orders] API_BASE_URL=${API_BASE_URL}`);

  const health = await request('/health', { method: 'GET' });
  assert(health.ok, 'health endpoint failed', health);
  assert(health.body?.db === 'UP', 'database is not UP', health);
  console.log('[smoke-orders] health check passed');

  const createPayload = {
    restaurantName: 'Seoul Kitchen',
    deliveryAddress: 'Seoul, Korea',
    menuItems: [{ name: 'Bibimbap', quantity: 1, unitPrice: 12000 }],
    totalPrice: 12000,
    notes: 'Leave at door',
  };

  const created = await request('/orders', {
    method: 'POST',
    body: JSON.stringify(createPayload),
  });
  assert(created.ok, 'order creation failed', created);
  const orderId = created.body?.order?.id;
  assert(orderId, 'order id missing after creation', created);
  console.log(`[smoke-orders] order created id=${orderId}`);

  const listed = await request('/orders', { method: 'GET' });
  assert(listed.ok, 'order listing failed', listed);
  assert(Array.isArray(listed.body?.orders), 'orders list shape invalid', listed);
  const found = listed.body.orders.find((order) => String(order.id) === String(orderId));
  assert(found, 'created order not found in list', listed);
  console.log('[smoke-orders] order listing passed');

  const updated = await request(`/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'processing' }),
  });
  assert(updated.ok, 'order status update failed', updated);
  assert(updated.body?.order?.status === 'processing', 'status was not updated', updated);
  console.log('[smoke-orders] order status update passed');

  const fetched = await request(`/orders/${orderId}`, { method: 'GET' });
  assert(fetched.ok, 'order by id failed', fetched);
  assert(String(fetched.body?.order?.id) === String(orderId), 'order id mismatch', fetched);
  assert(fetched.body?.order?.status === 'processing', 'order status mismatch after update', fetched);
  console.log('[smoke-orders] order by id passed');

  console.log('[smoke-orders] SUCCESS');
};

run().catch((error) => {
  fail(error.message);
});
