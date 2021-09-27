const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "indhu@99",
  port: 8080,
  database: "appoinment"
});

module.exports = pool;
