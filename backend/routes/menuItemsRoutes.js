const express = require('express');
const router = express.Router();
const MenuItemsController = require('../controllers/MenuItemsController');

// get all menu items (for home page)
router.get('/items', MenuItemsController.getAllMenuItems);

// get menu item by classification (for menu page)
router.get('/itemsclassification/:classification', MenuItemsController.getMenuItemsByClassification);

// search menu item by name (for search bar)
router.get('/search/:name', MenuItemsController.getMenuItemsByName);

// delete menu item (for admin page)
router.delete('/delete/:name', MenuItemsController.deleteMenuItem);

// update menu item (for admin page)
router.put('/update/:name', MenuItemsController.updateMenuItem);

// add new menu item (for admin page)
router.post('/add', MenuItemsController.addMenuItem);

module.exports = router;