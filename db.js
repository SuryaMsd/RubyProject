const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ruby',
    password: 'root',
    port: 5432, // Your PostgreSQL port
});


module.exports = pool;
