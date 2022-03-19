const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // Entenda quando enviar parametros em json
app.use(bodyParser.urlencoded({extended: false})) // Entenda quando enviar parametro via url e decodar esses parametros

app.get('/', (req, res)=>{
    // req serve como parametro para receber um objetos de uma requisiçao.
    // rep é o objeto usado para enviar resposta referentes a requisição.
    res.send('OK')

});
require('./controllers/authController')(app);


app.listen(3000);