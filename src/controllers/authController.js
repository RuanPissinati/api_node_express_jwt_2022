const express = require('express');

const User = require('../models/UserModel');

const router = express.Router();

router.post('/register',async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.send({ user });
        
    } catch (error) {
        res.status(400).send({ error, msgerror: 'Erro ao tentar registrar' })
    }
});