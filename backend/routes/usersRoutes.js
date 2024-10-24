const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

// user registration
router.post('/register', userController.register);

// user login
router.post('/login', userController.login);

// admin login
router.post('/adminlogin', userController.adminLogin);

module.exports = router;
