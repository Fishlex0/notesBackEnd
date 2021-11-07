const db = require('../data/db-config');

module.exports = async (req) => {
  const session = await db.getSession(req.cookies.s_cookie);

  return session.length > 0 ? session[0] : null;
};