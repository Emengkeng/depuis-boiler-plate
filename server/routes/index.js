const express = require('express');
const userRoute = require('./user.route');
const router = express.Router();

router.use('/api/v1', userRoute);


router.get('/', (req, res) => {
    return res.status(200).json({ message: 'You are Not Allowed Here' });
});

module.exports = router;