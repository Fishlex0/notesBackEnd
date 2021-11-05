const db = require('../data/db-config');
const bcrypt = require('bcrypt');

const DEFAULT_ERROR_MESSAGE = 'Ops, something when wrong';
const SALT_ROUNDS = 10;

exports.insertUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: 'Username and password are required' });
    }

    // check if the username already exists
    const users = await db.getUsers(username.toLowerCase());

    if (users.length !== 0) {
      res.status(400).send({ error: 'Username is already used' });
    }

    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    await db.insertUser({username: username.toLowerCase(), password: hashedPass});

    res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
}