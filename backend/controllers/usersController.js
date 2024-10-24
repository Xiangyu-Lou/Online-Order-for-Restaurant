const usersService = require('../services/usersService');
const jwt = require('jsonwebtoken');

const userController = {
    // register a new user
    async register(req, res) {
        try {
            const { username, password, email, type } = req.body;
            await usersService.register(username, password, email, type);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // user login and return username and jwt token
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await usersService.login(username, password);
            // JWT token
            const token = jwt.sign({ id: user.id, type: user.type }, 'your_jwt_secret');
            res.status(200).json({
                message: 'User logged in successfully',
                token: token
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },

    // admin login and return username and jwt token
    async adminLogin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await usersService.adminLogin(username, password);
            // JWT token
            const token = jwt.sign({ id: user.id, type: user.type }, 'your_jwt_secret');
            res.status(200).json({
                message: 'User logged in successfully',
                token: token
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
};

module.exports = userController;
