const express = require('express');

const authRoutes = require('./auth');
const restaurantRoutes = require('./restaurants');
const orderRoutes = require('./orders');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'K-Meal Bridge API is running!' });
});

router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
