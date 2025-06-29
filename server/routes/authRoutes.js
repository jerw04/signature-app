const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Verify token route
router.post('/verify-token', authController.verifyToken); // ✅ This must be outside of login()

module.exports = router;
