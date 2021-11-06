
exports.up = function(knex) {
  return knex.schema.alterTable('categories', (table) => {
    table.integer('user_id');

    table.foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('categories', (table) => {
    table.dropColumn('user_id');
    table.dropForeign('user_id');
  });
};
