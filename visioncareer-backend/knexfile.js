require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL, // ✅ ใช้ค่าจาก .env
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000
    }
  }
};