const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "green",
    host: "localhost",
    port: "5432",
    database: "welbex"
});

module.exports = pool;