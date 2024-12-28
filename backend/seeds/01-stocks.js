// seeds/001_stocks.js

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('stocks').del();

  // Inserts seed entries
  await knex('stocks').insert([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.00, volume: 100000, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.00, volume: 150000, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3400.00, volume: 200000, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 650.00, volume: 250000, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 299.00, volume: 180000, created_at: knex.fn.now(), updated_at: knex.fn.now() }
  ]);
};
