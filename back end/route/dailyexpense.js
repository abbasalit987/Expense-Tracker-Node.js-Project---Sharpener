const path = require('path');

const express = require('express');

const dailyexpenseController = require('../controller/dailyexpense');

const userAuthentication = require('../middleware/auth')

const router = express.Router();

router.post('/add-expenses', userAuthentication.verifyToken, dailyexpenseController.addExpenses);

router.get('/get-expenses', userAuthentication.verifyToken ,dailyexpenseController.getExpenses);

router.delete('/delete-expense/:id', userAuthentication.verifyToken, dailyexpenseController.deleteExpenses);

// router.delete('/user/delete-user/:id', adminController.deleteUser);

module.exports = router;