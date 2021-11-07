const db = require('../data/db-config');
const DEFAULT_ERROR_MESSAGE = 'Ops, something when wrong';

exports.notes = async (req, res) => {
  try {
    // check if user owns that category
    const category = await db.getCategoryById(req.params.categoryId, req.user.user_id);
    if (category.length === 0) {
      return res.status(404).send({ error: 'Category not found' });
    }
    const notes = await db.getNotesByCategoryId(req.params.categoryId);

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
      return res.status(400).send({ error: 'The note does not contain the proper data.' })
    }

    // check if user owns that category
    const category = await db.getCategoryById(categoryId, req.user.user_id);
    if (category.length === 0) {
      return res.status(404).send({ 'error': 'Category not found' });
    }

    // based on noteId value, insert or update the note
    let note = null;
    if (!noteId) {
      note = await db.insertNote({ category_id: categoryId, title, content });
    } else {
      note = await db.updateNote({ category_id: categoryId, title, content, noteId });
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

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      return res.status(400).send({ error: 'Note id is required' });
    }

    const note = await db.getNoteById(noteId);

    // TODO: maybe refactor this to use a query JOIN
    // check if user owns the category for that note
    const category = await db.getCategoryById(note[0].category_id, req.user.user_id);
    if (category.length === 0) {
      return res.status(404).send({ 'error': 'Category not found' });
    }

    await db.deleteNote(noteId);

    res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
};