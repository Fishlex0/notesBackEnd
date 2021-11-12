const db = require('../data/db-config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const DEFAULT_ERROR_MESSAGE = 'Ops, something when wrong';
const SALT_ROUNDS = 10;

exports.insertUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ status: 400, error: 'Username and password are required' });
    }

    // check if the username already exists
    const user = await db.getUser(username.toLowerCase());

    if (user.length !== 0) {
      res.status(400).send({ status: 400, error: 'Username is already used' });
    }

    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    await db.insertUser({ username: username.toLowerCase(), password: hashedPass });

    res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ status: 400 });
    }

    // check if the username already exists
    const user = await db.getUser(username.toLowerCase());

    const passwordMatch = await bcrypt.compare(password, user[0].password)
    if (passwordMatch !== true) {
      return res.status(400).send({ status: 400 });
    }

    const token = crypto.randomBytes(64).toString('hex');

    // TTL 15 minutes
    res.cookie('s_cookie', token, {maxAge: 5 * 60000});
    // delete any previous sessions for this user
    await db.deleteSession(user[0].id);
    // insert a new session
    await db.insertSession({token, user_id: user[0].id});

    res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    if (req.cookies && req.cookies.s_cookie) {
      res.clearCookie('s_cookie');
    }

    res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
};

exports.isLoggedIn = async (req, res) => {
  try {
    res.status(200).send();
  } catch (error) {
    console.log('Error: ', error);

    res.status(500).json({
      error: DEFAULT_ERROR_MESSAGE,
    });
  }
}
