const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Inicializando o servidor e definindo a porta.
const porta = 3333;

app.listen(porta, function () {
    console.log('servidor rodando na porta ' + porta);
});