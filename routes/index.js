const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const notesController = require('../controllers/notesController');

// TODO: maybe move notes and categories in separate files
router.get('/categories', categoryController.categories);
router.post('/categories', categoryController.insertCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.patch('/categories/:id', categoryController.updateCategory);

router.get('/notes/:categoryId', notesController.notes);
router.post('/notes', notesController.saveNote);
router.delete('/notes/:id', notesController.deleteNote);

module.exports = router;