const db = require('../data/db-config');
const DEFAULT_ERROR_MESSAGE = 'Ops, something when wrong';

exports.categories = async (req, res) => {
  try {
    const categories = await db.getCategories();

    res.status(200).json(categories);
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
}

exports.insertCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || typeof categoryName !== 'string') {
      return res.status(400).send({ error: 'Category name is not right' });
    }
    // check if there is an existing category with that name
    const category = await db.getCategoryByName(categoryName);

    if (category.length > 0) {
      return res.status(400).send({ error: "Category name is already used...sugi" });
    }

    const saved = await db.insertCategory(categoryName);

    return res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId || typeof categoryId !== 'number') {
      return res.status(400).send({ error: 'Category id is required' });
    }

    // will return the number of deleted items
    const deletedCategory = await db.deleteCategory(categoryId);

    if (deletedCategory !== 1) {
      return res.status(404).send({ error: 'Category not found' });
    }

    return res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
}