const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', orderController.create);
router.get('/:id', orderController.getById);

module.exports = router;
