exports.up = function (knex) {
  return (
    knex.schema
      // First create categories table
      .createTable("categories", function (table) {
        table.increments("id").primary();
        table.string("name").notNullable().unique();
        table.string("type").notNullable(); // 'income' or 'expense'
        table.timestamps(true, true);
      })
      // Then create transactions table with foreign key reference
      .createTable("transactions", function (table) {
        table.increments("id").primary();
        table.decimal("amount", 10, 2).notNullable();
        table.string("category").notNullable();
        table.string("description");
        table.string("type").notNullable(); // 'income', 'expense', or 'refund'
        table.string("status").defaultTo("completed");
        table.datetime("date").defaultTo(knex.fn.now());
        table.timestamps(true, true);

        // Add foreign key reference to categories
        table
          .foreign("category")
          .references("name")
          .inTable("categories")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("transactions")
    .dropTableIfExists("categories");
};
