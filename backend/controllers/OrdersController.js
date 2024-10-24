const OrdersService = require('../services/OrdersService');

const OrdersController = {
    // user cart page
    async getOrdersByUsernameAndStatus(req, res) {
        try {
            const orders = await OrdersService.getOrdersByUsernameAndStatus(req.params.username, req.query.status);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // user order page
    async getOrdersByUsernameAndStatus2(req, res) {
        try {
            const orders = await OrdersService.getOrdersByUsernameAndStatus2(req.params.username, req.query.status);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // items add function
    async addOrder(req, res) {
        try {
            const orderId = await OrdersService.addOrder(req.body.username, req.body.items, req.body.status);
            res.status(201).json({ orderId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // order submit function
    async updateOrdersStatusByUsername(req, res) {
        try {
            const affectedRows = await OrdersService.updateOrdersStatusByUsername(req.params.username, req.body.status);
            res.status(200).json({ affectedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // remove item from cart function
    async deleteOrdersByItems(req, res) {
        try {
            const affectedRows = await OrdersService.deleteOrdersByItems(req.body.items);
            res.status(200).json({ affectedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // cancel order function
    async deleteOrdersByUsername(req, res) {
        try {
            const affectedRows = await OrdersService.deleteOrdersByUsername(req.params.username, req.body.status);
            res.status(200).json({ affectedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // admin order list
    async getConfirmedOrdersGroupedByUser(req, res) {
        try {
            const orders = await OrdersService.getConfirmedOrdersGroupedByUser(req.params.status);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // admin change order status
    async updateOrdersStatusByUsernameAndStatus(req, res) {
        try {
            const affectedRows = await OrdersService.updateOrdersStatusByUsernameAndStatus(req.params.username, req.body.status, req.body.newStatus);
            res.status(200).json({ affectedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // admin process order list
    async getProcessedOrdersGroupedByUser(req, res) {
        try {
            const orders = await OrdersService.getProcessedOrdersGroupedByUser(req.query.status1, req.query.status2);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrdersController;