const path = require('path');

const express = require('express');

const purchaseController = require('../controller/purchase');

const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/purchase/premiummembership', userAuthentication.verifyToken, purchaseController.purchasePremium);

router.post('/purchase/updatetxnstatus', userAuthentication.verifyToken, purchaseController.updateTxnStatus);

// router.delete('/user/delete-user/:id', adminController.deleteUser);

module.exports = router;