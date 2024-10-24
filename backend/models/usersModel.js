const createConnection = require('../config/db');

class UsersModel {
    // find a user by username (for login)
    static async findByUsername(username) {
        const connection = await createConnection();
        try {
            const sql = `SELECT * FROM Users WHERE username = ?`;
            const [rows] = await connection.query(sql, [username]);
            return rows[0];
        } finally {
            connection.release();
        }
    }

    // find a admin by username (for adminlogin)
    static async findAdminByUsername(username) {
        const connection = await createConnection();
        try {
            const sql = `SELECT * FROM Administrators WHERE username = ?`;
            const [rows] = await connection.query(sql, [username]);
            return rows[0];
        } finally {
            connection.release();
        }
    }

    // register a new user
    static async register(username, password, email, type) {
        const connection = await createConnection();
        try {
            const sql = `INSERT INTO Users (username, password, email, type) VALUES (?, ?, ?, ?)`;
            const [result] = await connection.query(sql, [username, password, email, type]);
            return result;
        } finally {
            connection.release();
        }
    }

    // validate user login
    static async validateLogin(username, password) {
        const user = await this.findByUsername(username);
        if (!user) {
            return null;
        }
        // compare the hashed password
        if (user.password !== password) {
            return null;
        }
        
        return user;
    }

    // validate adminlogin
    static async validateAdminLogin(username, password) {
        const user = await this.findAdminByUsername(username);
        if (!user) {
            return null;
        }
        // compare the hashed password
        if (user.password !== password) {
            return null;
        }

        return user;
    }
}

module.exports = UsersModel;