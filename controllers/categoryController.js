const db = require('../data/db-config');
const DEFAULT_ERROR_MESSAGE = 'Ops, something when wrong';
const getUserFromSession = require('../helpers/getUserFromSession');

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

    const user = await getUserFromSession(req);
    if (user === null) {
      throw new Error('User not found');
    }

    await db.insertCategory({ name: categoryName, userId: user.user_id });

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
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).send({ error: 'Category id is required' });
    }

    // will return the number of deleted items
    await db.deleteCategory(categoryId);

    return res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryName = req.body.categoryName;

    if (!categoryId || !categoryName) {
      return res.status(400).send({ error: 'Category id and name are required' });
    }

    // will return the number of deleted items
    await db.updateCategory(categoryId, categoryName);

    return res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
}
