const UsersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

const usersService = {
    // register a new user
    async register(username, password, email, type) {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        await UsersModel.register(username, hashedPassword, email, type);
    },

    // user login
    async login(username, password) {
        const user = await UsersModel.findByUsername(username);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        // Compare hashed password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid username or password');
        }
        return user;
    },

    // admin login
    async adminLogin(username, password) {
        const user = await UsersModel.findAdminByUsername(username);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        // Compare hashed password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid username or password');
        }
        return user;
    }
};

module.exports = usersService;
