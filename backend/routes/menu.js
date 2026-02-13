const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getAllMenuItems);
router.post('/', menuController.createMenuItem);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);
router.post('/reset', menuController.resetMenu);

module.exports = router;
