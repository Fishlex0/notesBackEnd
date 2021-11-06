
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { 
          title: 'My first note',
          content: "This is your first note. You can modify it and save it. You can also create new one " +
          "using the 'Create note' button.",
          category_id: 1,          
        },
      ]);
    });
};
