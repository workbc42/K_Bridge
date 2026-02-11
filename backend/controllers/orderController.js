const { withTransaction, pool } = require('../db/pool');

const ORDER_STATUSES = ['pending', 'processing', 'completed', 'cancelled'];
const SYSTEM_USER_EMAIL = process.env.SYSTEM_USER_EMAIL || 'system@kmealbridge.local';
const SYSTEM_USER_NAME = process.env.SYSTEM_USER_NAME || 'System Operator';

const ensureSystemUser = async (client) => {
  const query = `
    INSERT INTO users (email, password_hash, name, language)
    VALUES ($1, $2, $3, 'en')
    ON CONFLICT (email)
    DO UPDATE SET updated_at = NOW()
    RETURNING id
  `;
  const values = [SYSTEM_USER_EMAIL, 'not-for-login', SYSTEM_USER_NAME];
  const result = await client.query(query, values);
  return result.rows[0].id;
};

const mapOrderRow = (row) => ({
  id: row.id,
  userId: row.user_id,
  restaurantName: row.restaurant_name,
  totalPrice: row.total_price,
  status: row.status,
  deliveryAddress: row.delivery_address,
  notes: row.notes || '',
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  menuItems: row.menu_items || [],
});

const list = async (req, res) => {
  try {
    const { status } = req.query || {};
    const whereSql = status ? 'WHERE o.status = $1' : '';
    const values = status ? [status] : [];

    const query = `
      SELECT
        o.id,
        o.user_id,
        o.restaurant_name,
        o.total_price,
        o.status,
        o.delivery_address,
        o.notes,
        o.created_at,
        o.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'name', oi.name,
              'quantity', oi.quantity,
              'unitPrice', oi.unit_price,
              'options', oi.options
            )
            ORDER BY oi.id
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) AS menu_items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      ${whereSql}
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    const result = await pool.query(query, values);

    return res.json({
      success: true,
      orders: result.rows.map(mapOrderRow),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to list orders.',
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  const { restaurantName, menuItems, totalPrice, deliveryAddress, notes } = req.body || {};

  if (!restaurantName || !deliveryAddress) {
    return res.status(400).json({
      success: false,
      message: 'restaurantName and deliveryAddress are required.',
    });
  }

  if (!Array.isArray(menuItems) || menuItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'menuItems must be a non-empty array.',
    });
  }

  try {
    const order = await withTransaction(async (client) => {
      const userId = await ensureSystemUser(client);

      const insertOrderQuery = `
        INSERT INTO orders (
          user_id,
          restaurant_name,
          total_price,
          status,
          delivery_address,
          notes
        )
        VALUES ($1, $2, $3, 'pending', $4, $5)
        RETURNING id, user_id, restaurant_name, total_price, status, delivery_address, notes, created_at, updated_at
      `;

      const insertOrderValues = [
        userId,
        restaurantName,
        Number.isFinite(totalPrice) ? totalPrice : Number(totalPrice) || 0,
        deliveryAddress,
        notes || '',
      ];

      const orderResult = await client.query(insertOrderQuery, insertOrderValues);
      const created = orderResult.rows[0];

      for (const item of menuItems) {
        if (!item || !item.name) continue;

        const quantity = Number.isFinite(item.quantity) ? item.quantity : Number(item.quantity) || 1;
        const unitPrice = Number.isFinite(item.unitPrice)
          ? item.unitPrice
          : Number(item.unitPrice || item.price) || 0;

        await client.query(
          `
            INSERT INTO order_items (order_id, name, quantity, unit_price, options)
            VALUES ($1, $2, $3, $4, $5)
          `,
          [created.id, item.name, Math.max(1, quantity), Math.max(0, unitPrice), item.options || null],
        );
      }

      const itemsResult = await client.query(
        `
          SELECT name, quantity, unit_price AS "unitPrice", options
          FROM order_items
          WHERE order_id = $1
          ORDER BY id
        `,
        [created.id],
      );

      return {
        ...mapOrderRow({ ...created, menu_items: itemsResult.rows }),
      };
    });

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create order.',
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT
        o.id,
        o.user_id,
        o.restaurant_name,
        o.total_price,
        o.status,
        o.delivery_address,
        o.notes,
        o.created_at,
        o.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'name', oi.name,
              'quantity', oi.quantity,
              'unitPrice', oi.unit_price,
              'options', oi.options
            )
            ORDER BY oi.id
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) AS menu_items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.id = $1
      GROUP BY o.id
      LIMIT 1
    `;

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    return res.json({
      success: true,
      order: mapOrderRow(result.rows[0]),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order.',
      error: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!ORDER_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `status must be one of: ${ORDER_STATUSES.join(', ')}`,
    });
  }

  try {
    const result = await pool.query(
      `
        UPDATE orders
        SET status = $1, updated_at = NOW()
        WHERE id = $2
        RETURNING id, user_id, restaurant_name, total_price, status, delivery_address, notes, created_at, updated_at
      `,
      [status, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    const itemResult = await pool.query(
      `
        SELECT name, quantity, unit_price AS "unitPrice", options
        FROM order_items
        WHERE order_id = $1
        ORDER BY id
      `,
      [id],
    );

    return res.json({
      success: true,
      order: mapOrderRow({ ...result.rows[0], menu_items: itemResult.rows }),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update status.',
      error: error.message,
    });
  }
};

module.exports = {
  list,
  create,
  getById,
  updateStatus,
};
