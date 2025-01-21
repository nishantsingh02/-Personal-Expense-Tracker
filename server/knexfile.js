const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "database/dev.sqlite3"),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "database/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "database/seeds"),
    },
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "database/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "database/seeds"),
    },
  },
};
