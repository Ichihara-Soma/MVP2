/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comic", function (table) {
    table.increments("id").primary();
    table.string("comicName");
    table.integer("comicVolume");
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
