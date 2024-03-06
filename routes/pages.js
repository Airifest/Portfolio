const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Page CRUD routes
router.get('/about', pageController.getAboutPage);
router.post('/about', pageController.createAboutPage);
router.put('/about', pageController.updateAboutPage);
router.delete('/about', pageController.deleteAboutPage);

// Similarly, define routes for Resume, Portfolio, Blog, Contact pages

module.exports = router;