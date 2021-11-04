const db = require('../data/db-config');
const DEFAULT_ERROR_MESSAGE = 'Ops, something when wrong';

exports.notes = async (req, res) => {
  try {
    const notes = await db.getNotes(req.params.categoryId);

    if (notes.length > 0) {
      return res.status(200).json(notes)
    }
    res.status(200).json([]);
  } catch (error) {
    console.log('Error: ', error);
    
    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
};

// this function is used for inserting / updating a new note
exports.saveNote = async (req, res) => {
  try {
    const { categoryId, title, content, noteId } = req.body;
    
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

    // based on noteId value, insert or update the note
    let note = null;
    if (!noteId) {
      note = await db.insertNote({category_id: categoryId, title, content});
    } else {
      note = await db.updateNote({category_id: categoryId, title, content, noteId});
    }

    // check if the operation was successfull
    if (note.length === 0) {
      throw new Error('Failed to save the note');
    }

    return res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);
    
    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
};