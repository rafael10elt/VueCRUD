const connection = require('../database/connection');

module.exports = {
    //Definindo o método para listar todas as pessoas
    async index(req, res) {
        const pessoas = await connection('pessoas').select('*');

        return res.json(pessoas);
    },
    //Definindo o método criar para registrar uma nova pessoa
    async create(req, res) {
        const { nome, telefone, email } = req.body;

        const { id } = await connection('pessoas').insert({
            nome,
            telefone,
            email,
        });
        return res.json({ id });
    },
    //Definindo o método delete para apagar o registro de uma pessoa específica
    async delete(req, res) {
        const { id } = req.params;

        const pessoas = await connection('pessoas')
            .where('id', id)
            .select('id')
            .first();


        await connection('pessoas').where('id', id).delete();

        return res.status(204).send();
    },
    //Definindo o método update para editar as informações de uma pessoa específica
    async update(req, res) {
        const { id } = req.params;
        const pessoas = await connection('pessoas')
            .where('id', id)
            .select('id')
            .first();


        await connection('pessoas').where('id', id).update({
            nome: req.body.nome,
            telefone: req.body.telefone,
            email: req.body.email,
        });
        return res.status(204).send();
    }
};