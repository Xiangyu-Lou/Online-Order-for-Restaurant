const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');

// user cart page
router.get('/orders/:username', OrdersController.getOrdersByUsernameAndStatus);

// user order page
router.get('/orders2/:username', OrdersController.getOrdersByUsernameAndStatus2);

// items add function
router.post('/orders', OrdersController.addOrder);

// order submit function
router.put('/orders/:username', OrdersController.updateOrdersStatusByUsername);

// remove item from cart function
router.delete('/orders', OrdersController.deleteOrdersByItems);

// cancel order function
router.post('/order/:username', OrdersController.deleteOrdersByUsername);

// admin order list
router.get('/manage/orders/:status', OrdersController.getConfirmedOrdersGroupedByUser);

// admin change order status
router.put('/orders2/:username', OrdersController.updateOrdersStatusByUsernameAndStatus);

// admin process order list
router.get('/processedorders', OrdersController.getProcessedOrdersGroupedByUser);

module.exports = router;