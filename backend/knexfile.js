// knexfile.js

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './data/db.sqlite3'  // Path to your SQLite file
  },
  useNullAsDefault: true,  // Required for SQLite
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};