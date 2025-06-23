const express = require('express');

const router = express.Router();

//Auth Routes
router.post('/register', registerUser); // Register user
