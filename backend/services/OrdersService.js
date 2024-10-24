const OrdersModel = require('../models/OrdersModel');

const OrdersService = {
    // user cart page 
    async getOrdersByUsernameAndStatus(username, status) {
        try {
            const orders = await OrdersModel.getOrdersByUsernameAndStatus(username, status);
            return orders;
        } catch (error) {
            throw error;
        }
    },

    // user order page
    async getOrdersByUsernameAndStatus2(username, status) {
        try {
            const orders = await OrdersModel.getOrdersByUsernameAndStatus2(username, status);
            return orders;
        } catch (error) {
            throw error;
        }
    },

    // items add function
    async addOrder(username, items, status) {
        try {
            const orderId = await OrdersModel.addOrder(username, items, status);
            return orderId;
        } catch (error) {
            throw error;
        }
    },

    // order submit function
    async updateOrdersStatusByUsername(username, status) {
        try {
            const affectedRows = await OrdersModel.updateOrdersStatusByUsername(username, status);
            return affectedRows;
        } catch (error) {
            throw error;
        }
    },

    // remove item from cart function
    async deleteOrdersByItems(items) {
        try {
            const affectedRows = await OrdersModel.deleteOrdersByItems(items);
            return affectedRows;
        } catch (error) {
            throw error;
        }
    },

    // cancel order function
    async deleteOrdersByUsername(username, status) {
        try {
            const affectedRows = await OrdersModel.deleteOrdersByUsername(username, status);
            return affectedRows;
        } catch (error) {
            throw error;
        }
    },

    // admin order list
    async getConfirmedOrdersGroupedByUser(status) {
        try {
            const orders = await OrdersModel.getConfirmedOrdersGroupedByUser(status);
            return orders;
        } catch (error) {
            throw error;
        }
    },

    // admin change order status
    async updateOrdersStatusByUsernameAndStatus(username, status, newStatus) {
        try {
            const affectedRows = await OrdersModel.updateOrdersStatusByUsernameAndStatus(username, status, newStatus);
            return affectedRows;
        } catch (error) {
            throw error;
        }
    },

    // admin process order list
    async getProcessedOrdersGroupedByUser(status, status2) {
        try {
            const orders = await OrdersModel.getProcessedOrdersGroupedByUser(status, status2);
            return orders;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrdersService;