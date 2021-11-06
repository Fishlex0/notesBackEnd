
exports.up = function(knex) {
  return knex.schema.alterTable('notes', (table) => {
    table.dropForeign('category_id');

    table.foreign('category_id')
      .references('categories.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('notes', (table) => {
    table.dropForeign('category_id');
  });
};
