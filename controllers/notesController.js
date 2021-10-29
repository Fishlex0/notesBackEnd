const db = require('../data/db-config');
const DEFAULT_ERROR_MESSAGE = 'Ops, something when wrong';

exports.notes = async (req, res) => {
  try {
    const notes = await db.getNotes(req.params.categoryId);

    if (notes.length > 0) {
      return res.status(200).json(notes)
    }
    res.status(404).json({error: 'No data found'});
  } catch (error) {
    console.log('Error: ', error);
    
    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
};

exports.insertNote = async (req, res) => {
  try {
    const { categoryId, title, content } = req.body;
    
    // check that all fields are completed
    if (typeof categoryId !== 'number' || typeof title !== 'string' || typeof content !== 'string') {
      console.log('Data is in a wrong format', typeof categoryId, typeof title, typeof content);
      return res.status(400).send({error: 'The note does not contain the proper data.'})
    }

    // check if the required category exists
    const foundCategory = await db.getCategoryById(categoryId);

    if (foundCategory.length === 0) {
     return res.status(404).send({'error': 'Category not found'});
    }
    
    // save the note
    const insertedNote = await db.insertNote({category_id: categoryId, title, content});
    // TODO: check if this condition is ok
    if (insertedNote.length === 0) {
      throw new Error('Failed inserting note');
    }

    return res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);
    
    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
};