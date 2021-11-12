/**
 * adds user_id on request if there is a cookie present
 * else returns 401
 */
const db = require('../data/db-config');

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies && req.cookies.s_cookie) {
    const session = await db.getSession(req.cookies.s_cookie);

    if (session.length === 0) {
      return res.status(401).send({status: 401});
    }

    req.user = {
      user_id: session[0].user_id,
    };
  } else {
    return res.status(401).send(status: 401);
  }
  next();
};