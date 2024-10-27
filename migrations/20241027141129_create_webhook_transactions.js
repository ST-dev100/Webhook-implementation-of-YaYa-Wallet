/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('webhook_transactions', (table) => {
      table.uuid('id').primary();
      table.integer('amount').notNullable();
      table.string('currency', 3).notNullable(); // Assuming a 3-character currency code
      table.timestamp('created_at_time').notNullable();
      table.timestamp('timestamp').notNullable();
      table.string('cause').notNullable();
      table.string('full_name').notNullable();
      table.string('account_name').notNullable();
      table.string('invoice_url').notNullable();
      table.timestamp('received_at').defaultTo(knex.fn.now());
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
