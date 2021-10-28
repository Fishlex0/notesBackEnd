
exports.up = function (knex) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments('id');
    tbl.string('title');
    tbl.text('content');
    tbl.integer('category_id').unsigned();
    tbl.foreign('category_id').references('categories.id');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notes');
};
