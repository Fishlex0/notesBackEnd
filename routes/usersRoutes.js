const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


const usersController = require('../controllers/usersController');

router.post('/register', usersController.insertUser);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/isLoggedIn', authMiddleware.isLoggedIn, usersController.isLoggedIn);

module.exports = router;