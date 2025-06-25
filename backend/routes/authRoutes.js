const express = require('express');
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/authController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');


//Auth Routes
router.post('/register', registerUser); // Register user
router.post('/login', loginUser); // Login user
router.get('/profile', protect, getProfile); // Get user profile
router.put('/profile', protect, updateProfile); // Update user profile

module.exports = router;
