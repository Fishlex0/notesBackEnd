
exports.up = function (knex) {
  return knex.schema.createTable('sessions', tbl => {
    tbl.increments('id');
    tbl.string('token');
    tbl.unique('token');
    tbl.integer('user_id');
    tbl.foreign('user_id').references('users.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('sessions');
};
