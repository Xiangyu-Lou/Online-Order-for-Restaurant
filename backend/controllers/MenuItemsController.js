const MenuItemsService = require('../services/MenuItemsService');

const MenuItemsController = {
    // get all menu items (for home page)
    async getAllMenuItems(req, res) {
        try {
            const menuItems = await MenuItemsService.getAllMenuItems();
            console.log('Request body:', menuItems);
            res.status(200).json(menuItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // get menu item by classification (for menu page)
    async getMenuItemsByClassification(req, res) {
        try {
            const menuItems = await MenuItemsService.getMenuItemsByClassification(req.params.classification);
            console.log('Request body:', menuItems);
            res.status(200).json(menuItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // search menu item by name (for search bar)
    async getMenuItemsByName(req, res) {
        try {
            const menuItems = await MenuItemsService.getMenuItemsByName(req.params.name);
            console.log('Request body:', menuItems);
            res.status(200).json(menuItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // delete menu item (for admin page)
    async deleteMenuItem(req, res) {
        try {
            const result = await MenuItemsService.deleteMenuItem(req.params.name);
            console.log('Request body:', result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // update menu item (for admin page)
    async updateMenuItem(req, res) {
        try {
            const menuItem = {
                name: req.params.name,
                description: req.body.description,
                price: req.body.price,
                classification: req.body.classification
            };
            const result = await MenuItemsService.updateMenuItem(menuItem);
            console.log('Request body:', result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // add new menu item (for admin page)
    async addMenuItem(req, res) {
        try {
            const menuItem = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                classification: req.body.classification
            };
            const result = await MenuItemsService.addMenuItem(menuItem);
            console.log('Request body:', result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = MenuItemsController;