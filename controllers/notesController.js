const db = require('../data/db-config');
const DEFAULT_ERROR_MESSAGE = 'Ops, something when wrong';

exports.notes = async (req, res) => {
  try {
    const notes = await db.getNotes(req.params.categoryId);

    res.status(200).json(notes);
  } catch (error) {
    console.log('Error: ', error);
    
    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
}