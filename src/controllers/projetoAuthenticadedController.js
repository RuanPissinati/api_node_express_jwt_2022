const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);
router.post('/', (req, res)=>{
    res.send({msng: 'OK', user: req.userId});
});

module.exports = app => app.use('/protectedlist', router);