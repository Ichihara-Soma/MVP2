/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comic", (table) => {
    table.increments("id").primary();
    table.string("comic_name");
    table.integer("comic_volume");
    table.integer("id_store");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comic");
};
