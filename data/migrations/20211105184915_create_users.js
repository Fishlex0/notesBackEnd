
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl.string('username').notNullable().unique;
    tbl.unique('username');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
