exports.up = async function(knex) {
    await knex.schema.createTable('stocks', function(table) {
      table.increments('id').primary();  // Primary key
      table.string('symbol').notNullable();  // Stock symbol, e.g., AAPL
      table.string('name').notNullable();  // Full name of the company
      table.decimal('price', 10, 2).notNullable();  // Current price of the stock
      table.integer('volume').notNullable();  // Number of shares traded
      table.timestamp('created_at').defaultTo(knex.fn.now());  // Timestamp of creation
      table.timestamp('updated_at').defaultTo(knex.fn.now());  // Timestamp of the last update
    });
  
    // Ensure IDs are unique and not repeated (SQLite supports auto-increment)
    await knex.raw('PRAGMA foreign_keys = ON;'); // Ensure foreign keys are enabled in SQLite
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTable('stocks');
  };
  