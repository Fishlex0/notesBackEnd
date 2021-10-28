const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const notesController = require('../controllers/notesController');

// TODO: maybe move notes and categories in separate files
router.get('/categories', categoryController.categories);

router.get('/notes/:categoryId', notesController.notes);

module.exports = router;