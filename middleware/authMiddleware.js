const express = require('express');
const db = require('../data/db-config');

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies && req.cookies.s_cookie) {
    const session = await db.getSession(req.cookies.s_cookie);

    if (session.length === 0) {
      return res.status(401).send({error: 'You must be authenticated to access this feature'});
    }
  } else {
    return res.status(401).send({error: 'You must be authenticated to access this feature'});
  }
  next();
};