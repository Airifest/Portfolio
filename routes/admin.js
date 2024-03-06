const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/login', adminController.login);

// Other admin routes like logout, dashboard, etc.

module.exports = router;