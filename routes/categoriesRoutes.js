const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.categories);
router.post('/', categoryController.insertCategory);
router.delete('/:id', categoryController.deleteCategory);
router.patch('/:id', categoryController.updateCategory);

module.exports = router;
