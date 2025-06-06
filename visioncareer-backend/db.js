const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL, // ✅ ใช้ค่าจาก .env
});

module.exports = db;