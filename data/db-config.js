const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

// this enables foreign key functionality for sqlite
const enableForeignKeys = async () => {
    await db.raw('PRAGMA foreign_keys = ON');
}
enableForeignKeys();

// TODO: maybe move categories and notes in separate files or too lazy

/**
 * CATEGORIES
 */
function getCategories() {
    return db('categories');
}

// TODO: maybe remove this function
function getCategoryByName(categoryName) {
    return db('categories').where({ name: categoryName });
}

function getCategoryById(id) {
    return db('categories').where({ id: id })
}

function deleteCategory(id) {
    return db('categories').where({ id: id }).del();
}

function insertCategory(category) {
    return db('categories').insert({name: category.name, user_id: category.userId});
}

function updateCategory(id, name) {
    return db('categories').where({ id: id }).update({ name: name });
}

/**
 * NOTES
 */
function getNotes(id) {
    return db('notes').where({ category_id: Number(id) });
}

function insertNote(note) {
    return db('notes').insert(note);
}

function updateNote(note) {
    return db('notes')
        .where({ id: note.noteId })
        .update({ title: note.title, content: note.content, category_id: note.category_id, updated_at: (new Date()).toISOString() });
}

function deleteNote(id) {
    return db('notes').where({ id: id }).del();
}

/**
 * USERS
 */
function getUser(name) {
    return db('users').where({ username: name });
}

function insertUser(user) {
    return db('users').insert(user);
}

/**
 * SESSION
 */
function insertSession(session) {
    return db('sessions').insert(session);
}

function deleteSession(userId) {
    return db('sessions').where({user_id: userId}).del();
}

function getSession(token) {
    return db('sessions').where({token});
}

module.exports = {
    getCategories,
    getCategoryByName,
    getCategoryById,
    deleteCategory,
    insertCategory,
    updateCategory,
    getNotes,
    insertNote,
    updateNote,
    deleteNote,
    getUser,
    insertUser,
    insertSession,
    deleteSession,
    getSession
}