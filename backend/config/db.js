// connect to the database
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'ec2-3-145-79-112.us-east-2.compute.amazonaws.com',
    user: 'wustl_inst',
    password: 'wustl_pass',
    database: 'orderonline',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function createConnection() {
    const connection = await pool.promise().getConnection();
    return connection;
}

module.exports = createConnection;