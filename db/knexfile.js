module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.POSTGRES_USER || "user",
      database: process.env.POSTGRES_DB || "comics",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
