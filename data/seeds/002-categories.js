
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          id: 1,
          name: 'My first category',
          user_id: 1
        },
      ]);
    });
};
