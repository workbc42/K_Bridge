const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', orderController.list);
router.post('/', orderController.create);
router.get('/:id', orderController.getById);
router.patch('/:id/status', orderController.updateStatus);

module.exports = router;
