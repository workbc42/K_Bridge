const express = require('express');
const { pool } = require('../db/pool');

const authRoutes = require('./auth');
const restaurantRoutes = require('./restaurants');
const orderRoutes = require('./orders');
const menuRoutes = require('./menu');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'K-Meal Bridge API is running!' });
});

router.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'OK', db: 'UP', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      db: 'DOWN',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);
router.use('/menu', menuRoutes);

module.exports = router;
