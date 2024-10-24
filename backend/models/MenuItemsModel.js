const createConnection = require('../config/db');

class MenuItemsModel {
    // get all menu items (for home page)
    async getAllMenuItems() {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM MenuItems');
            return rows;
        } finally {
            connection.release();
        }
    }

    // get menu item by classification (for menu page)
    async getMenuItemsByClassification(classification) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM MenuItems WHERE classification = ?', [classification]);
            return rows;
        } finally {
            connection.release();
        }
    }

    // search menu item by name (for search bar)
    async getMenuItemsByName(name) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM MenuItems WHERE name LIKE ?', [`%${name}%`]);
            return rows;
        } finally {
            connection.release();
        }
    }

    // delete menu item (for admin page)
    async deleteMenuItem(name) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query('DELETE FROM MenuItems WHERE name = ?', [name]);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    // update menu item (for admin page)
    async updateMenuItem(menuItem) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query('UPDATE MenuItems SET description = ?, price = ?, classification = ? WHERE name = ?', [menuItem.description, menuItem.price, menuItem.classification, menuItem.name]);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    // add new menu item (for admin page)
    async addMenuItem(menuItem) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query('INSERT INTO MenuItems (name, description, price, classification) VALUES (?, ?, ?, ?)', [menuItem.name, menuItem.description, menuItem.price, menuItem.classification]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }
}

module.exports = new MenuItemsModel();