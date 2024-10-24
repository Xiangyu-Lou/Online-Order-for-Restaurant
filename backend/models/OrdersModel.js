const createConnection = require('../config/db');

class OrdersModel {

    // user cart page
    async getOrdersByUsernameAndStatus(username, status) {
        const connection = await createConnection();
        try {
            const sql = `
                SELECT Orders.*, MenuItems.price 
                FROM Orders 
                INNER JOIN MenuItems ON Orders.items = MenuItems.name 
                WHERE Orders.username = ? AND Orders.status = ?
            `;
            const [rows] = await connection.query(sql, [username, status]);
            return rows;
        } finally {
            connection.release();
        }
    }

    // user order page
    async getOrdersByUsernameAndStatus2(username, status) {
        const connection = await createConnection();
        try {
            const sql = `
                SELECT Orders.*, MenuItems.price 
                FROM Orders 
                INNER JOIN MenuItems ON Orders.items = MenuItems.name 
                WHERE Orders.username = ? AND Orders.status != ?
            `;
            const [rows] = await connection.query(sql, [username, status]);
            return rows;
        } finally {
            connection.release();
        }
    }

    // items add function
    async addOrder(username, items, status) {
        const connection = await createConnection();
        try {
            const sql = 'INSERT INTO Orders (username, items, status) VALUES (?, ?, ?)';
            const [result] = await connection.query(sql, [username, items, status]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }

    // order submit function
    async updateOrdersStatusByUsername(username, status) {
        const connection = await createConnection();
        try {
            const sql = 'UPDATE Orders SET status = ? WHERE username = ?';
            const [result] = await connection.query(sql, [status, username]);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    // remove item from cart function
    async deleteOrdersByItems(items) {
        const connection = await createConnection();
        try {
            const sql = 'DELETE FROM Orders WHERE items = ?';
            const [result] = await connection.query(sql, [items]);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    // cancel order function
    async deleteOrdersByUsername(username, status) {
        const connection = await createConnection();
        try {
            console.log(username);
            console.log(status);
            const sql = 'DELETE FROM Orders WHERE username = ? AND status != ?';
            const [result] = await connection.query(sql, [username, status]);
            console.log(result);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    // admin order list
    async getConfirmedOrdersGroupedByUser(status) {
        const connection = await createConnection();
        try {
            const sql = `
          SELECT username, GROUP_CONCAT(items) AS items_list
          FROM Orders
          WHERE status = ?
          GROUP BY username;
          `;
            const [rows] = await connection.query(sql, [status]);
            return rows;
        } finally {
            connection.release();
        }
    }

    // admin change order status
    async updateOrdersStatusByUsernameAndStatus(username, status, newStatus) {
        const connection = await createConnection();
        try {
            const sql = 'UPDATE Orders SET status = ? WHERE username = ? AND status = ?';
            const [result] = await connection.query(sql, [newStatus, username, status]);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    // admin process order list
    async getProcessedOrdersGroupedByUser(status1, status2) {
        const connection = await createConnection();
        try {
            const sql = `
            SELECT username,status, GROUP_CONCAT(items) AS items_list
            FROM Orders
            WHERE status IN (?, ?)
            GROUP BY username;
          `;
            const [rows] = await connection.query(sql, [status1, status2]);
            return rows;
        } finally {
            connection.release();
        }
    }
}

module.exports = new OrdersModel();