const path = require('path');

const express = require('express');

const signupController = require('../controller/signup');

const router = express.Router();

router.post('/signup', signupController.userSignUp);

// router.delete('/user/delete-user/:id', adminController.deleteUser);

module.exports = router;
