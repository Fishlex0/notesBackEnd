const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

function insertCategory(category) {
    //TODO: add checks

    return db('categories')
        .insert(category)
        .then(ids => ({ id: ids[0] }));
}

module.exports = {
    insertCategory,
}