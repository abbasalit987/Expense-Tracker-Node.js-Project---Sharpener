const path = require('path');

const express = require('express');

const dailyexpenseController = require('../controller/dailyexpense');

const router = express.Router();

router.post('/add-expenses', dailyexpenseController.addExpenses);

router.get('/get-expenses', dailyexpenseController.getExpenses);

router.delete('/delete-expense/:id', dailyexpenseController.deleteExpenses);

// router.delete('/user/delete-user/:id', adminController.deleteUser);

module.exports = router;