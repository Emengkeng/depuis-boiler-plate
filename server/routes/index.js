const express = require('express');
const userRoute = require('./user.route');
const walletRoute = require('./wallet.route');
const transactionRoute = require('./transaction.route');
const router = express.Router();

router.use('/api/v1', userRoute);
router.use('/api/v1', walletRoute);
router.use('/api/v1', transactionRoute);

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'You are Not Allowed Here' });
});

module.exports = router;