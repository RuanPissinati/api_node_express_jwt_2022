'use strict';
// Variaveis de configuracao
const config = require('../config');
// Aplicacao Mongoose
const mongoose = require('mongoose');
// Mongosse Prommises use bluebird
mongoose.Promise = require('bluebird');

// Configurando connection.on('connected') para msg de sucesso apos conexao com MongoDB.
mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});

// Configurando connection.on('error') para msg de erro apos falha na conexao com MongoDB.
mongoose.connection.on('error', err => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(1);
});

// Usando mongoose.set(debbug) para validar depuracao do banco.
mongoose.set('debug', true);

// Apos configurar o app mongoose devemos exportar uma conexão para ser usada
exports.connect = () => {

  mongoose.connect(config.mongo.uri, {
    keepAlive: true, // keepAliveé true por padrão desde o mangusto 5.2.0.
    keepAliveInitialDelay: 300000,// keepAliveInitialDelayé o número de milissegundos de espera antes de iniciar keepAlive no soquete.
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  mongoose.set('useCreateIndex', true);

  return mongoose.connection;
};