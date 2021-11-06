const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/:categoryId', notesController.notes);
router.post('/', notesController.saveNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;