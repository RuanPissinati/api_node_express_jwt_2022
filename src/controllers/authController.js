const express = require('express');
const bcrypt = require("bcryptjs");
const User = require('../models/UserModel');

const router = express.Router();

router.post('/register' ,async (req, res) => {
    const { email } = req.body;
    try {
        // Busca user antes de registrar para enviar uma msg mais amigavel.
        if(await User.findOne({email}) )
            return res.status(400).send({ error: 'Usuario já foi registrado.' })
        
        // Schema cria o usaurio no banco de dados
        const user = await User.create(req.body);
        
        // Apagar password da resposta
        user.password = undefined;

        // Envia resposta para usuario com objeto cadastro menos a senha
        return res.send({ user });
        
    } catch (error) {
        res.status(400).send({ error, msgerror: 'Erro ao tentar registrar' })
    }
});
router.post('/authenticate',async (req, res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return res.status(400).send({error: 'Usuário não encontrado'});
    }
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Senha errada.'});
    }
    user.password = undefined;
    res.send({user})

})

// Modulo exportado recebe aplicacao e usa rota auth para agregar outras rotas do aplicativo.
module.exports = app => app.use('/auth', router)