
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          username: 'bursucu',     
          password: '$2b$10$cOjyPPctN9sfDM3LxeBxfO7VLE2ASJlWPYCyoVeQFTDeGM6BM/iwW'
        },
      ]);
    });
};
