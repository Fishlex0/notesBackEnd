
exports.up = function(knex) {
  return knex.schema.createTable('categories', tbl => {
    tbl.increments('id');
    tbl.string('name').notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories');
};
