const express = require('express');

exports.isLoggedIn = (req, res, next) => {
  console.dir(req.cookies, []);
  next();
};