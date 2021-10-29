const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

// TODO: maybe move categories and notes in separate files

function insertCategory(category) {
    return db('categories')
        .insert(category)
        .then(ids => ({ id: ids[0] }));
}

function getCategories() {
    return db('categories');
}

function getCategoryById(id) {
    return db('categories').where({id: id})
}

function getNotes(id) {
    return db('notes').where({ category_id: Number(id) });
}

function insertNote(note) {
    return db('notes').insert(note);
}

module.exports = {
    getCategories,
    getCategoryById,
    insertCategory,
    getNotes,
    insertNote,
}