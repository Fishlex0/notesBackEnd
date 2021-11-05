const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const notesController = require('../controllers/notesController');
const usersController = require('../controllers/usersController');

// TODO: maybe move notes and categories in separate files
/**
 * CATEGORIES
 */
router.get('/categories', categoryController.categories);
router.post('/categories', categoryController.insertCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.patch('/categories/:id', categoryController.updateCategory);

/**
 * NOTES
 */
router.get('/notes/:categoryId', notesController.notes);
router.post('/notes', notesController.saveNote);
router.delete('/notes/:id', notesController.deleteNote);

/**
 * USERS
 */
router.post('/register', usersController.insertUser);
router.post('/login', usersController.login);

module.exports = router;