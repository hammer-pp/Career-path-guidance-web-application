require("dotenv").config();
const knex = require("knex");

// ตั้งค่าการเชื่อมต่อ PostgreSQL
const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "phop123",
    database: process.env.DB_NAME || "visioncareer",
    charset: "utf8",
  },
});

module.exports = db;
