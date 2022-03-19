const { send } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next)=>{
    const authHeader =  req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({error: 'Token nao informado.'});
    }
    const parts = authHeader.split(' ');
    
    if(!(parts.length === 2)){
        return res.status(401).send({error: 'Erro no token.'})
    }
    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Erro na formatação do token.'});
    }
    jwt.verify(token, config.secret, (err, decode)=>{
        if(err) return res.status(401).send({erro: 'Token inválido.'});
        req.userId = decode.id;
        return next();
    })
    next();
}