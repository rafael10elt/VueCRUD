const express = require('express');
/**
 * Importando o controller
 */
const pessoaController = require('./controllers/pessoaController');


const routes = express.Router();

//Definindo as todas das páginas
routes.get('/pessoa', pessoaController.index);
routes.post('/pessoa', pessoaController.create);
routes.put('/pessoa/:id', pessoaController.update);
routes.delete('/pessoa/:id', pessoaController.delete);

module.exports = routes;