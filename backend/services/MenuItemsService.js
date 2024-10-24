const MenuItemsModel = require('../models/MenuItemsModel');

const MenuItemsService = {
    // get all menu items (for home page)
    async getAllMenuItems() {
        try {
            const menuItems = await MenuItemsModel.getAllMenuItems();
            return menuItems;
        } catch (error) {
            throw error;
        }
    },
    
    // get menu item by classification (for menu page)
    async getMenuItemsByClassification(classification) {
        try {
            const menuItems = await MenuItemsModel.getMenuItemsByClassification(classification);
            return menuItems;
        } catch (error) {
            throw error;
        }
    },

    // search menu item by name (for search bar)
    async getMenuItemsByName(name) {
        try {
            const menuItems = await MenuItemsModel.getMenuItemsByName(name);
            return menuItems;
        } catch (error) {
            throw error;
        }
    },

    // delete menu item (for admin page)
    async deleteMenuItem(name) {
        try {
            const result = await MenuItemsModel.deleteMenuItem(name);
            return result;
        } catch (error) {
            throw error;
        }
    },

    // update menu item (for admin page)
    async updateMenuItem(name, description, price, classification) {
        try {
            const result = await MenuItemsModel.updateMenuItem(name, description, price, classification);
            return result;
        } catch (error) {
            throw error;
        }
    },

    // add new menu item (for admin page)
    async addMenuItem(name, description, price, classification) {
        try {
            const result = await MenuItemsModel.addMenuItem(name, description, price, classification);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = MenuItemsService;