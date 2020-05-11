const knex = require('knex');
const configuration = require('../../knexfile');

//Criando a conexão com o Banco de Dados
const connection = knex(configuration.development);

module.exports = connection;