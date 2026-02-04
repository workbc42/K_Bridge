const create = (req, res) => {
  const { restaurantName, menuItems, totalPrice, deliveryAddress } = req.body || {};

  res.status(201).json({
    success: true,
    order: {
      id: 1001,
      restaurantName: restaurantName || 'Seoul Kitchen',
      menuItems: menuItems || [{ name: 'Bibimbap', quantity: 1 }],
      totalPrice: totalPrice || 12000,
      status: 'pending',
      deliveryAddress: deliveryAddress || 'Seoul, Korea',
      createdAt: new Date().toISOString(),
    },
    message: 'Order endpoint is stubbed. Replace with DB-backed implementation.',
  });
};

const getById = (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    order: {
      id,
      restaurantName: 'Seoul Kitchen',
      menuItems: [{ name: 'Bibimbap', quantity: 1 }],
      totalPrice: 12000,
      status: 'processing',
      deliveryAddress: 'Seoul, Korea',
      createdAt: new Date().toISOString(),
    },
  });
};

module.exports = {
  create,
  getById,
};
