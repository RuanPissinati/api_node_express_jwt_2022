const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // Entenda quando enviar parametros em json
app.use(bodyParser.urlencoded({})) // Entenda quando enviar parametro via url e decodar esses parametros

app.listen(3000);

